Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('orders'); }
});

Router.route('/', {name: 'ordersList'});

Router.route('/orders/:_id', {
  name: 'orderPage',
  data: function() { return Orders.findOne(this.params._id); }
});

Router.route('/submit', {name: 'orderSubmit'});

var requireLogin = function() {
  if (! Meteor.user()) {
    this.render('accessDenied');
  } else {
    this.next();
  }
};

Router.onBeforeAction('dataNotFound', {only: 'orderPage'});

Router.onBeforeAction(requireLogin, {only: 'orderSubmit'});
