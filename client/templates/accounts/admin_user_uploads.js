Template.adminUserUploads.helpers({
  specificFormData: function () {
    return {
      id: this._id,
      username: this.username
    }
  }
});
Template.adminUserUploads.events({
  'click .fancybox': function (e) {
    e.preventDefault();
  },
  'click #remove-image': function (e,template) {
    e.preventDefault();
    var confirm = window.confirm('Вы действительно хотите удалить фото');
    if (confirm) {
      Meteor.call('uploadRemove', template.data.username, $(e.currentTarget).data('name'));
    }
  }
});

Template.adminUserUploads.rendered = function () {
  $('.fancybox').fancybox();
};