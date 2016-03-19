Template.expiredOrdersList.helpers({
  orders: function(){
    Orders.find({status:'истекла'});
  }
});