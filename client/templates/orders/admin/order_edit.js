Template.orderEdit.events({
  'submit form': function (e) {
    e.preventDefault();

    var currentOrderId = this._id;

    var orderProperties = {
      from: $(e.target).find('[name=from]').val(),
      to: $(e.target).find('[name=to]').val(),
      type: $(e.target).find('[name=type]').val()
    };

    Orders.update(currentOrderId, {$set: orderProperties}, function (error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('adminOrdersList');
      }
    });
  },

  'click .delete': function (e) {
    e.preventDefault();

    if (confirm("Удалить эту заявку?")) {
      var currentOrderId = this._id;
      Orders.remove(currentOrderId);
      Router.go('ordersList');
    }
  }

});

Template.orderEdit.destroyed = function () {
  if (!this.data) return;
  if (Orders.findOne({_id: this.data._id}).status !== orderStatusEdit)return;

  Orders.update(this.data._id, {$set: {status: orderStatusFree}}, function (error) {
    if (error) {
      // display the error to the user
      throwError(error.reason);
    }
  });
};