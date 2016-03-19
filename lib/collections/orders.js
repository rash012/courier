Orders = new Mongo.Collection('orders');

orderDuration = 1000 * 60 * 20;

Orders.allow({
  update: function (userId, order, fields, modifier) {
    var userAllowed = userId && !_.contains(fields, '_id') && !_.contains(fields, 'from') &&
      !_.contains(fields, 'to') && (modifier.$set.ownerId === userId || modifier.$set.ownerId === undefined);
    return isAdmin() || userAllowed;
  },
  remove: function (userId, order) {
    return isAdmin()
  }
});

Meteor.methods({
  orderInsert: function (orderAttributes) {
    check(Meteor.userId(), String);
    check(orderAttributes, {
      from: String,
      to: String,
      type: String
    });

    if (!isAdmin()) return {};

    var user = Meteor.user();
    var order = _.extend(orderAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date(),
      status: 'свободна'
    });

    var orderId = Orders.insert(order);

    if (Meteor.isServer) {
      var timerId = Meteor.setTimeout(function () {
        if (Orders.findOne({_id: orderId}).status === 'свободна') {
          Orders.update(orderId, {
            $set: {
              status: 'истекла'
            }
          });
        }
      }, orderDuration);
    }

    return {
      _id: orderId
    };
  }
});

