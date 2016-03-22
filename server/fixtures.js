Meteor.startup(function () {
  //if (Orders.find().count() === 0) {
  //  Orders.insert({
  //    from: '"Трио-пицца", Московская, 0 ',
  //    to: 'Московская, 19',
  //    status: 'free'
  //  });
  //
  //  Orders.insert({
  //    from: '"Трио-пицца", Московская, 0 ',
  //    to: 'Московская, 100',
  //    status: 'free'
  //  });
  //
  //  Orders.insert({
  //    from: '"Трио-пицца", Московская, 0 ',
  //    to: 'Володарского, 5',
  //    status: 'free'
  //  });
  //  Orders.insert({
  //    from: '"Трио-пицца", Московская, 0 ',
  //    to: 'Володарского, 5',
  //    status: 'free'
  //  });
  //  Orders.insert({
  //    from: '"Трио-пицца", Московская, 0 ',
  //    to: 'Володарского, 5',
  //    status: 'free'
  //  });
  //}

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


  //проверяем нет ли истекших заявок среди свободных и делаем их истекшими
  (function () {
    var freeOrders = Orders.find({status: {$in: [orderStatusFree, orderStatusEdit]}}).fetch();
    var expiredOrders = _.filter(freeOrders, function (el) {
      return (new Date - el.submitted) > orderFreeLimitTime;
    });
    _.each(expiredOrders, function (el) {
      Orders.update(el._id, {$set: {status: orderStatusExpired}});
    });
  })();
});

