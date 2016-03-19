Template.ordersList.helpers({
  orders: function () {
    return Orders.find({ownerId: {$exists: false},status:'свободна'}, {sort: {submitted: -1}});
  }
});