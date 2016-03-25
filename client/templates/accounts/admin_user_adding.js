Template.adminUserAdding.events({
  'submit form': function (e) {
    e.preventDefault();

    if (!isAdmin()) return {};

    var account = {
      username: $(e.target).find('[name=login]').val(),
      password: $(e.target).find('[name=password]').val(),
      name: $(e.target).find('[name=name]').val(),
      surname: $(e.target).find('[name=surname]').val(),
      tel: $(e.target).find('[name=tel]').val(),
    };

    Meteor.call('addUser', account, function(error, result){
      if (error){
        return throwError(error.reason);
      }
      if (result){
        if(result.accountExists) alert('Пользователь с таким логином уже существует');
        else {
          alert('Пользователь успешно добавлен');
          $('form').trigger('reset');
        }
      }
    });
  }
});