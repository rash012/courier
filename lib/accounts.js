Meteor.methods({
  createAccount: function (accountAttributes) {
    check(Meteor.userId(), String);
    check(accountAttributes, {
      username: String,
      password: String
    });

    var sameAccount = Meteor.users.findOne({username: accountAttributes.username});
    if (sameAccount) {
      return {
        accountExists: true,
        _id: sameAccount._id
      }
    }

    var accountId = Accounts.createUser({
        username: accountAttributes.username,
        password: accountAttributes.password,
      }
    );

    return {
      _id: accountId
    }
  }
})
;
