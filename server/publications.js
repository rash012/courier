Meteor.publish('orders', function () {
  return Orders.find();
});

Meteor.publish('users', function () {
  if (this.userId === Meteor.users.findOne({username: 'admin'})._id) return Meteor.users.find();
  else return Meteor.users.find({_id: this.userId});
});
