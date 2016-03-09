Template.orderEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentOrderId = this._id;

    var orderProperties = {
      from: $(e.target).find('[name=from]').val(),
      to: $(e.target).find('[name=to]').val()
    };

    Orders.update(currentOrderId, {$set: orderProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('orderPage', {_id: currentOrderId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Удалить эту заявку?")) {
      var currentOrderId = this._id;
      Orders.remove(currentOrderId);
      Router.go('ordersList');
    }
  }
});