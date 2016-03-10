Template.usersList.helpers({
  users: function() {
    return Meteor.users.find({username:{$ne:'admin'}},{sort:{username:1}});
  }
});