Template.acceptedOrderItem.events({
  'click #order-done': function (e) {

    var currentOrderId = this._id;

    Orders.update(currentOrderId, {
      $set: {
        status: orderStatusDone,
        done: new Date()
      }
    }, function (error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      }

    });
  }
});



