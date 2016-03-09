Template.orderSubmit.events({
  'submit form': function (e) {
    e.preventDefault();

    var order = {
      from: $(e.target).find('[name=from]').val(),
      to: $(e.target).find('[name=to]').val()
    };

    Meteor.call('orderInsert', order, function (error, result) {
      // display the error to the user and abort
      if (error) return throwError(error.reason);

      Router.go('ordersList', {_id: result._id});
    });
  }
});