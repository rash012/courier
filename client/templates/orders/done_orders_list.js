Template.doneOrdersList.helpers({
  orders: function () {
    return Orders.find({status: 'исполнена'});
  }
});