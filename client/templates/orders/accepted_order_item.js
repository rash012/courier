Template.acceptedOrderItem.events({
  'click #order-done': function (e) {

    var currentOrderId = this._id;

    Meteor.call('orderDone', currentOrderId, function (error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      }
    });
  }
});

Template.acceptedOrderItem.helpers({
  remainingTime: function () {
    return;
  }
});


