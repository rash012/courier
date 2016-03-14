Template.adminOrdersList.helpers({
  orders: function () {
    return Orders.find({}, {sort: {submitted: -1}});
  }
});