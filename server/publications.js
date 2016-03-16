Meteor.publish('orders', function () {
  if (this.userId === adminId) {
    return Orders.find();
  }
  else return Orders.find({$or: [{ownerId: this.userId}, {ownerId: {$exists: false}}]});
});

Meteor.publish('users', function () {
  if (this.userId === adminId) {
    return Meteor.users.find();
  }
  else return Meteor.users.find({_id: this.userId}, {fields: {username: 1}});
});

Meteor.publish('messages', function () {
  return Messages.find();
});
