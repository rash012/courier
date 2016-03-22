Template.orderItem.events({
  'click #take-order': function (e) {

    var currentOrderId = this._id;

    Meteor.call('orderAccept', currentOrderId, function (error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        //Meteor.call('setOrderTimer', currentOrderId);
      }
    });
  }
});


