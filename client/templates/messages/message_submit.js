Template.messageSubmit.events({
  'submit form': function (e) {
    e.preventDefault();

    var text = $(e.target).find('[name=text]').val();
    if(!text) return throwError('Сообщение не может быть пустым');

    var message = {
      text: text
    };

    Meteor.call('messageInsert', message, function (error, result) {
      // display the error to the user and abort
      if (error) return throwError(error.reason);

      $('form').trigger('reset');
    })
  }
});