Template.registerHelper('isAdmin', function () {
  return isAdmin();
});

Template.registerHelper('submitted', function () {
  return formatDateTime(this.submitted);
});
Template.registerHelper('accepted', function () {
  if (!this.accepted) return null;
  return formatDateTime(this.accepted);
});
Template.registerHelper('done', function () {
  if (!this.done) return null;
  return formatDateTime(this.done);
});
Template.registerHelper('orderExecutionDuration', function () {
  var totalSeconds = Math.round((this.done - this.accepted) / 1000);
  var minutes = Math.round(totalSeconds / 60);

  //var seconds = totalSeconds % 60;
  return minutes + ' минут' + wordEnding(minutes);
});


