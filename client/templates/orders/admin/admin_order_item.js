//var remainingTime = ReactiveVar();

Template.adminOrderItem.helpers({
  //remainingTime: function () {
  //  if (this.status !== 'свободна') {
  //    remainingTime.set('0:0');
  //    return remainingTime.get();
  //  }
  //  var submitted;
  //  if (!(submitted = this.submitted)) return;
  //  var secondsRemaining = Math.ceil((submitted.getTime() - new Date + orderDuration) / (1000));
  //  var minutes = Math.floor(secondsRemaining / 60);
  //  var seconds = secondsRemaining % 60;
  //  remainingTime.set(minutes + ':' + seconds);
  //
  //  return remainingTime.get();
  //}

  isPossibleEdit: function () {
    return this.status === orderStatusFree;
  }
});