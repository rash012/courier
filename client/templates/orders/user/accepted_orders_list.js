Template.acceptedOrdersList.helpers({
  username: function () {
    if (Meteor.user()) return Meteor.user().username;
  }
});