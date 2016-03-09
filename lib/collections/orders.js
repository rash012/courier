Orders = new Mongo.Collection('orders');

Orders.allow({
  update: function(userId, order) { return isAdmin() },
  remove: function(userId, order) { return isAdmin() },
});

Meteor.methods({
  orderInsert: function (orderAttributes) {
    check(Meteor.userId(), String);
    check(orderAttributes, {
      from: String,
      to: String
    });

    if(!isAdmin()){
      return {};
    }

    var user = Meteor.user();
    var order = _.extend(orderAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    var orderId = Orders.insert(order);

    return {
      _id: orderId
    };
  }
});