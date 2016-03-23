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
//todo: спросить про код
var date = new ReactiveVar();
var intervalId = Meteor.setInterval(function(){
  date.set(new Date());
},1000*60);
Template.acceptedOrderItem.helpers({
  remainingTime: function () {
    date.set(new Date());
    var remainingMinutes = Math.round((+this.accepted + orderExecutionLimit - date.get()) / (1000*60));
    return  remainingMinutes + ' минут' + wordEnding(remainingMinutes);
  }
});


