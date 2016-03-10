Template.userPage.helpers({
  orders: function () {
    return Orders.find({ownerId: this._id}, {sort: {submitted: -1}});
  }
});