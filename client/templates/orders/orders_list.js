Template.ordersList.helpers({
  orders: function () {
    return Orders.find({ownerId: {$exists: false},status:'free'}, {sort: {submitted: -1}});
  }
});