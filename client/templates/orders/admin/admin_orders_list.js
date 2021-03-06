var status= ReactiveVar('all');

Template.adminOrdersList.events({
  'change select': function () {
    status.set($('select option:selected').val());
  }
});

Template.adminOrdersList.helpers({
  orders: function () {
    switch (status.get()) {
      case 'all':
        return this.orders;
      case 'accepted':
        return this.acceptedOrders;
      case 'done':
        return this.doneOrders;
      case 'expired':
        return this.expiredOrders;
      default:
        return this.orders;
    }
  }
});
Template.adminOrdersList.destroyed = function(){
  status.set('all');
};