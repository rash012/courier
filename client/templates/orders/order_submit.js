Template.orderSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var order = {
      from: $(e.target).find('[name=from]').val(),
      to: $(e.target).find('[name=to]').val()
    };

    order._id = Orders.insert(order);
    Router.go('orderPage', order);
  }
});