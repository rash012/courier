Meteor.publish('orders', function (options) {
  if (options) {
    check(options, {
      sort: Object,
      limit: Number
    });
  }
  if (this.userId === adminId) {
    return Orders.find({}, options);
  }
  else return Orders.find({
    $or: [{ownerId: this.userId}, {ownerId: {$exists: false}}],
    status: {$in: [orderStatusFree, orderStatusAccepted, orderStatusDone]}
  }, options);
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
