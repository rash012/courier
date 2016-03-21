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
  name: 'adminUserPageOrdersList',
  controller: OrdersListController.extend({
    data: function () {
      return {
        orders: Orders.find({ownerName: this.params.username}, this.findOptions()),
        username: this.params.username
      };
    }
  })
});

Router.route('/admin-userpage/:username', {
  name: 'adminUserPage',
  data: function () {
    return Meteor.users.findOne({username: this.params.username})
  }
});

Router.route('/submit', {
  name: 'orderSubmit',
  waitOn: function () {
    return Meteor.subscribe('orders')
  }
});

Router.route('/account-create', {name: 'accountCreate'});

Router.route('/accepted-orders/:ordersLimit?', {
  name: 'acceptedOrdersList',
  controller: OrdersListController.extend({
    data: function () {
      return {orders: Orders.find({ownerId: Meteor.userId(), status: orderStatusAccepted}, this.findOptions())};
    }
  })
});

Router.route('/admin-orders/:ordersLimit?', {
  name: 'adminOrdersList',
  controller: OrdersListController
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
      return {orders: Orders.find({ownerId: Meteor.userId(), status: orderStatusDone}, this.findOptions())};
    }
  })
});

Router.route('/users', {
  name: 'usersList'
});

Router.route('/chat', {
  name: 'messagesList',
});

Router.route('/:ordersLimit?', {
  name: 'ordersList',
  controller: OrdersListController.extend({
    data: function () {
      return {orders: Orders.find({ownerId: {$exists: false}, status: orderStatusFree}, this.findOptions())};
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
  only: ['orderSubmit', 'orderEdit', 'accountCreate', 'usersList', 'userPage', 'adminOrdersList', 'adminDoneOrdersList', 'adminUserPageOrdersList']
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