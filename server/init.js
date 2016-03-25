Meteor.startup(function () {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      username: 'admin',
      email: 'admin@admin.admin',
      password: ' ',
      permissions: [
        'admin.all'
      ]
    });

    Accounts.createUser({
      username: 'test',
      email: '',
      password: ' ',
      permissions: [
        ''
      ]
    });
  }

  adminId = Meteor.users.findOne({username: 'admin'})._id;

  //todo: изменить пути
  UploadServer.init({
    tmpDir: '/meteor/courier-uploads/userdocs/tmp/',
    uploadDir: '/meteor/courier-uploads/userdocs/',
    checkCreateDirectories: true, //create the directories for you
    getDirectory: function (fileInfo, formData) {
      // create a sub-directory in the uploadDir
      return 'user-' + formData.username + '/';
    },
    finished: function (fileInfo, formFields) {
      // perform a disk operation
      Uploads.insert({ownerId:formFields.id, ownerName:formFields.username, url:fileInfo.url, filename:fileInfo.name});
    },
    maxPostSize:100000000,
    maxFileSize:100000000,
  });
});