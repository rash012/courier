Meteor.users.deny({
  update: function () {
    return true;
  }
});

Meteor.users.allow({
  remove: function () {
    return isAdmin();
  }
});

Meteor.methods({
  addUser: function (accountAttributes) {
    check(Meteor.userId(), String);
    check(accountAttributes, {
      username: String,
      password: String,
      name: String,
      surname: String,
      tel: String
    });

    if (!isAdmin()) throw new Meteor.Error('access denied');

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
        profile: {
          name: accountAttributes.name,
          surname: accountAttributes.surname,
          tel: accountAttributes.tel
        }
      }
    );

    return {
      _id: accountId
    }
  },

  updateAccount: function (userId, accountAttributes) {
    check(userId, String);
    check(accountAttributes, {
      username: String,
      password: String,
      name: String,
      surname: String,
      tel: String
    });

    if (!isAdmin()) throw new Meteor.Error('access denied');

    Meteor.users.update(userId, {
      $set: {
        username: accountAttributes.username,
        profile: {
          name: accountAttributes.name,
          surname: accountAttributes.surname,
          tel: accountAttributes.tel
        }
      }
    });


    if (accountAttributes.password && Meteor.isServer)Accounts.setPassword(userId, accountAttributes.password);

    return {};
  }
})
;
