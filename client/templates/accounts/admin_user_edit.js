Template.adminUserEdit.events({
  'submit form': function (e, template) {
    e.preventDefault();

    if (!isAdmin()) return throwError('нет доступа');

    var account = {
      username: $(e.target).find('[name=login]').val(),
      password: $(e.target).find('[name=password]').val(),
      name: $(e.target).find('[name=name]').val(),
      surname: $(e.target).find('[name=surname]').val(),
      tel: $(e.target).find('[name=tel]').val(),
    };

    Meteor.call('updateAccount', template.data._id, account, function (error, result) {
      if (error) {
        return throwError(error.reason);
      }
      if (result) {
        alert('Пользователь успешно изменен');
        Router.go('adminUserPage',{username:template.data.username});
      }
    });
  },
  'click .delete': function (e) {
    e.preventDefault();

    if (confirm("Удалить пользователя?")) {
      Meteor.users.remove(this._id);
      Router.go('usersList');
    }
  }
});
//Template.adminUserEdit.helpers({
//  name:function(){
//    return this.profile.name;
//  }
//});