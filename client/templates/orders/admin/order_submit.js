Template.orderSubmit.events({
  'submit form': function (e) {
    e.preventDefault();

    var order = {
      from: $(e.target).find('[name=from]').val(),
      to: $(e.target).find('[name=to]').val(),
      type: $(e.target).find('[name=type]').val(),
    };

    Meteor.call('orderInsert', order, function (error, result) {
      // display the error to the user and abort
      if (error) return throwError(error.reason);

      Router.go('adminOrdersList', {_id: result._id});
    });
  }
});