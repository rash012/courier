Template.acceptedOrderItem.events({
  'click #order-done': function (e) {

    var currentOrderId = this._id;

    Orders.update(currentOrderId, {
      $set: {
        status: 'done'
      }
    }, function (error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      }

    });
  }
});

