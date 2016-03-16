Template.acceptedOrdersList.helpers({
  orders: function () {
    return Orders.find({ownerId: Meteor.userId(), status: 'accepted'}, {sort: {submitted: -1}});
  },
  username: function () {
    if (Meteor.user()) return Meteor.user().username
  }
});