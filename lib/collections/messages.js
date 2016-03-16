Messages = new Mongo.Collection('messages');

Messages.allow({
  update: function (userId, message, fields, modifier) {
    return userId === message.userId;
  },
  remove: function (userId, message) {
    return userId === message.userId;
  }
});

Meteor.methods({
  messageInsert: function (messageAttributes) {
    var NonEmptyString = Match.Where(function (x) {
      check(x, String);
      return x.length > 0;
    });

    check(Meteor.userId(), String);
    check(messageAttributes, {
      text: NonEmptyString
    });

    var user = Meteor.user();
    var message = _.extend(messageAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    var messageId = Messages.insert(message);

    return {
      _id: messageId
    };
  }
});