Template.userStatistics.helpers({
  ordersTotalAcceptedCount: function () {
    return Orders.find({ownerId: this._id}).count();
  },
  ordersDoneOrdersCount: function () {
    return Orders.find({ownerId: this._id, status: orderStatusDone}).count();
  },
  ordersExecuteOrdersCount: function () {
    return Orders.find({ownerId: this._id, status: orderStatusAccepted}).count();
  },
  ordersLateCount: function () {
    return Orders.find({ownerId: this._id, isLate: true}).count();
  },
});