Meteor.startup(function () {
  if (Orders.find().count() === 0) {
    Orders.insert({
      from: '"Трио-пицца", Московская, 0 ',
      to: 'Московская, 19'
    });

    Orders.insert({
      from: '"Трио-пицца", Московская, 0 ',
      to: 'Московская, 100'
    });

    Orders.insert({
      from: '"Трио-пицца", Московская, 0 ',
      to: 'Володарского, 5'
    });
  }

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
});
