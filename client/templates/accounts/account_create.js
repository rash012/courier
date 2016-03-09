Template.accountCreate.events({
  'submit form': function (e) {
    e.preventDefault();

    if (!isAdmin()) return {};

    var account = {
      username: $(e.target).find('[name=login]').val(),
      password: $(e.target).find('[name=password]').val()
    };

    Meteor.call('createAccount', account, function(error, result){
      if (error){
        return throwError(error.reason);
      }
      if (result){
        if(result.accountExists) alert('Аккаунт с таким логином уже существует');
        else alert('Аккаунт создан')
      }
    });
  }
});