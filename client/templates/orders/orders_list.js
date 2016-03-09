Template.ordersList.helpers({
  orders: function () {
    return Orders.find({ownerId: {$exists: false}}, {sort: {submitted: -1}});
  }
});