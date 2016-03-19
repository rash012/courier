Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () {
    return [Meteor.subscribe('orders'), Meteor.subscribe('users'), Meteor.subscribe('messages')];
  }
});

Router.route('/', {name: 'ordersList'});

Router.route('/orders/:_id', {
  name: 'orderPage',
  data: function () {
    return Orders.findOne(this.params._id);
  }
});

Router.route('/orders/:_id/edit', {
  name: 'orderEdit',
  data: function () {
    return Orders.findOne(this.params._id);
  }
});

Router.route('/submit', {name: 'orderSubmit'});

Router.route('/account-create', {name: 'accountCreate'});

Router.route('/accepted-orders', {name: 'acceptedOrdersList'});

Router.route('/admin-orders-list', {name: 'adminOrdersList'});

Router.route('/done-orders', {name: 'doneOrdersList'});

Router.route('/users', {name: 'usersList'});

Router.route('/users/:username', {
  name: 'userPage',
  data: function () {
    return Meteor.users.findOne({username: this.params.username})
  }
});

Router.route('/chat', {
  name: 'messagesList',
  //waitOn: function () {
  //  return Meteor.subscribe('messages');
  //},
  data: function () {
    Messages.find();
  }
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

var requireLogin = function () {
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

Router.onBeforeAction('dataNotFound', {only: ['orderPage', 'userPage']});

Router.onBeforeAction(requireAdmin, {
  only: ['orderSubmit', 'orderEdit', 'accountCreate', 'usersList', 'userPage', 'adminOrdersList']
});

Router.onBeforeAction(requireLogin, {only: ['acceptedOrdersList', 'doneOrdersList']});

Router.onBeforeAction(function () {
  Orders.update(this.params._id, {$set: {status: 'редактируется'}}, function (error) {
    if (error) {
      // display the error to the user
      throwError(error.reason);
    }
  });
  this.next();
}, {only: 'orderEdit'});