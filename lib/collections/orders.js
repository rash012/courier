Orders = new Mongo.Collection('orders');


/**
 * время в миллисекундах, через которое свободная заявка станет истекшей
 *
 * @type {number}
 */
orderFreeLimitTime = 1000 * 60 * 20;

/**
 * время в миллисекундах, за которое курьер должен доставить посылку
 *
 * @type {number}
 */
orderExecutionLimit = 1000 * 60 * 40;

Orders.allow({
  update: function (userId, order, fields, modifier) {
    return isAdmin();
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
      status: orderStatusFree
    });

    var orderId = Orders.insert(order);

    if (Meteor.isServer) {
      var timerId = Meteor.setTimeout(function () {
        var orderStatus = Orders.findOne({_id: orderId}).status;
        if (orderStatus === orderStatusFree || orderStatus === orderStatusEdit) {
          Orders.update(orderId, {
            $set: {
              status: orderStatusExpired
            }
          });
        }
      }, orderFreeLimitTime);
    }

    return {
      _id: orderId
    };
  },
  orderAccept: function (orderId) {
    check(Meteor.userId(), String);
    check(orderId, String);
    Orders.update(orderId, {
      $set: {
        ownerId: Meteor.userId(),
        status: orderStatusAccepted,
        ownerName: Meteor.user().username,
        accepted: new Date()
      }
    });
    return {};
  },
  orderDone: function(orderId){
    check(Meteor.userId(), String);
    check(orderId, String);
    Orders.update(orderId, {
      $set: {
        status: orderStatusDone,
        done: new Date()
      }
    });
    return {};
  }
});

