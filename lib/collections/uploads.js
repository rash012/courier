Uploads = new Mongo.Collection('uploads');

Uploads.allow({
  insert: function () {
    return isAdmin();
  },
  update: function () {
    return isAdmin();
  },
});

Meteor.methods({
  uploadRemove: function (username, filename) {
    check(username, String);
    check(filename, String);
    if (Meteor.isServer) {
      if (!isAdmin()) throw new Meteor.Error('access denied');
      Uploads.remove({filename:filename},function(error){
        if(error) throw new Meteor.Error(error.reason);
        else{
          UploadServer.delete('user-'+username + "/" + filename);
        }
      });
    }
  }
});