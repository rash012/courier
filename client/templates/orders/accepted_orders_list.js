Template.acceptedOrdersList.helpers({
  orders: function () {
    return Orders.find({ownerId: Meteor.userId()}, {sort: {submitted: -1}});
  }
});