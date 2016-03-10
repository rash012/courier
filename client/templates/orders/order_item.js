Template.orderItem.events({
  'click #take-order': function (e) {

    var currentOrderId = this._id;

    Orders.update(currentOrderId, {$set: {ownerId: Meteor.userId()}}, function (error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      }
    });
  }
});

