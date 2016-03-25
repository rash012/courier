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

