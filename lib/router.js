Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () {
    return Meteor.subscribe('orders');
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
  data: function() { return Orders.findOne(this.params._id); }
});

Router.route('/submit', {name: 'orderSubmit'});

Router.route('/account-create',{name: 'accountCreate'});

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

Router.onBeforeAction('dataNotFound', {only: 'orderPage'});

Router.onBeforeAction(requireAdmin, {only: ['orderSubmit','orderEdit']});
