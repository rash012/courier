var status= ReactiveVar('all');

Template.adminUserOrdersList.events({
  'change select': function () {
    status.set($('select option:selected').val());
  }
});

Template.adminUserOrdersList.helpers({
  orders: function () {
    switch (status.get()) {
      case 'all':
        return this.orders;
      case 'accepted':
        return this.acceptedOrders;
      case 'done':
        return this.doneOrders;
      default:
        return this.orders;
    }
  }
});
Template.adminUserOrdersList.destroyed = function(){
  status.set('all');
};