//// check that the userId specified owns the documents
//ownsDocument = function(userId, doc) {
//  return doc && doc.userId === userId;
//}
isAdmin = function () {
  return !!Meteor.user() && Meteor.user().username === 'admin';
};