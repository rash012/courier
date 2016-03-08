Orders = new Mongo.Collection('orders');

Orders.allow({
  insert: function(userId, doc) {
    // разрешить постить только если пользователь - админ
    var adminId = Meteor.users.findOne({username: "admin"})._id;
    return userId === adminId;
  }
});