Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () {
    return [Meteor.subscribe('users'), Meteor.subscribe('messages')];
  }
});

OrdersListController = RouteController.extend({
  increment: 50,
  ordersLimit: function () {
    return parseInt(this.params.ordersLimit) || this.increment;
  },
  findOptions: function () {
    return {sort: {submitted: -1}, limit: this.ordersLimit()};
  },
  waitOn: function () {
    return Meteor.subscribe('orders', this.findOptions());
  },
  data: function () {
    return {orders: Orders.find({}, this.findOptions())};
  }
});

//var getCustomOrdersListController = function (mongoSelector) {
//  return OrdersListController.extend({
//    data: function () {
//      return {orders: Orders.find(mongoSelector, this.findOptions())};
//    }
//  });
//};

Router.route('/orders/:_id', {
  name: 'orderPage',
  waitOn: function () {
    return Meteor.subscribe('orders')
  },
  data: function () {
    return Orders.findOne(this.params._id);
  }
});

Router.route('/orders/:_id/edit', {
  name: 'orderEdit',
  waitOn: function () {
    return Meteor.subscribe('orders')
  },
  data: function () {
    return Orders.findOne(this.params._id);
  }
});

Router.route('/admin-userpage/:username/orders-list/:ordersLimit?', {
  name: 'adminUserOrdersList',
  controller: OrdersListController.extend({
    data: function () {
      return {
        orders: Orders.find({ownerName: this.params.username}, this.findOptions()),
        acceptedOrders: Orders.find({
          ownerName: this.params.username,
          status: orderStatusAccepted
        }, {sort: {accepted: -1}, limit: this.ordersLimit()}),
        doneOrders: Orders.find({ownerName: this.params.username, status: orderStatusDone}, {
          sort: {done: -1},
          limit: this.ordersLimit()
        }),
        username: this.params.username
      };
    }
  })
});

Router.route('/admin-userpage/:username', {
  name: 'adminUserPage',
  waitOn: function () {
    return Meteor.subscribe('orders')
  },
  data: function () {
    return Meteor.users.findOne({username: this.params.username})
  }
});

Router.route('/admin-userpage/:username/uploads', {
  name: 'adminUserUploads',
  waitOn: function () {
    return Meteor.subscribe('uploads')
  },
  data: function () {
    return {
      uploads: Uploads.find({ownerName: this.params.username}),
      username: this.params.username
    }
  }
});

Router.route('/admin-userpage/:username/edit', {
  name: 'adminUserEdit',
  data: function () {
    return Meteor.users.findOne({username: this.params.username});
  }
});


Router.route('/submit', {
  name: 'orderSubmit',
  waitOn: function () {
    return Meteor.subscribe('orders')
  }
});

Router.route('/users/account-create', {name: 'adminUserAdding'});


Router.route('/accepted-orders/:ordersLimit?', {
  name: 'acceptedOrdersList',
  controller: OrdersListController.extend({
    data: function () {
      return {
        orders: Orders.find({ownerId: Meteor.userId(), status: orderStatusAccepted},
          {sort: {accepted: -1}, limit: this.ordersLimit()})
      };
    }
  })
});

Router.route('/admin-orders/:ordersLimit?', {
  name: 'adminOrdersList',
  controller: OrdersListController.extend({
    data: function () {
      return {
        orders: Orders.find({}, this.findOptions()),
        acceptedOrders: Orders.find({status: orderStatusAccepted}, {sort: {accepted: -1}, limit: this.ordersLimit()}),
        doneOrders: Orders.find({status: orderStatusDone}, {sort: {done: -1}, limit: this.ordersLimit()}),
        expiredOrders: Orders.find({status: orderStatusExpired}, this.findOptions())
      };
    }
  })
});

//Router.route('/admin-done-orders/:ordersLimit?', {
//  name: 'adminDoneOrdersList',
//  controller: OrdersListController.extend({
//    data: function () {
//      return {orders: Orders.find({status: orderStatusDone}, this.findOptions())};
//    }
//  })
//});

Router.route('/done-orders/:ordersLimit?', {
  name: 'doneOrdersList',
  controller: OrdersListController.extend({
    data: function () {
      return {
        orders: Orders.find({ownerId: Meteor.userId(), status: orderStatusDone},
          {sort: {done: -1}, limit: this.ordersLimit()})
      };
    }
  })
});

Router.route('/users', {
  name: 'usersList'
});

Router.route('/chat', {
  name: 'messagesList',
});

Router.route('/', {
  name: 'ordersList',
  controller: OrdersListController.extend({
    data: function () {
      return {orders: Orders.find({ownerId: {$exists: false}, status: orderStatusFree}, {sort: {submitted: -1}})};
    }
  })
});

var requireAdmin = function () {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    if (!isAdmin()) {
      this.render('accessDenied');
    } else {
      this.next();
    }
  }
};

var requireLoginNotAdmin = function () {
  if (isAdmin()) {
    this.render('accessDenied');
    return;
  }
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

Router.onBeforeAction('dataNotFound', {only: ['orderPage', 'adminUserPage']});

Router.onBeforeAction(requireAdmin, {
  only: ['orderSubmit', 'orderEdit', 'adminUserAdding', 'usersList', 'adminOrdersList', 'adminDoneOrdersList',
    'adminUserOrdersList','adminUserUploads','adminUserEdit','adminUserPage']
});

Router.onBeforeAction(requireLoginNotAdmin, {only: ['acceptedOrdersList', 'doneOrdersList']});

Router.onBeforeAction(function () {
  if (Orders.findOne({_id: this.params._id}).status !== orderStatusFree) {
    this.next();
    return;
  }
  Orders.update(this.params._id, {$set: {status: orderStatusEdit}}, function (error) {
    if (error) {
      // display the error to the user
      throwError(error.reason);
    }
  });
  this.next();
}, {only: 'orderEdit'});