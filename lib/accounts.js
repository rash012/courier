Meteor.methods({
  createAccount: function (accountAttributes) {
    check(Meteor.userId(), String);
    check(accountAttributes, {
      username: String,
      password: String,
      name: String,
      surname: String,
      tel: String
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
        profile:{
          name: accountAttributes.name,
          surname: accountAttributes.surname,
          tel: accountAttributes.tel
        }
      }
    );

    return {
      _id: accountId
    }
  }
})
;
