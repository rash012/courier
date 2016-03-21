Template.registerHelper('isAdmin',function(){
  return isAdmin();
});

Template.registerHelper('submitted',function(){
  return formatDateTime(this.submitted);
});
Template.registerHelper('accepted',function(){
  if(!this.accepted) return null;
  return formatDateTime(this.accepted);
});
Template.registerHelper('done',function(){
  if(!this.done) return null;
  return formatDateTime(this.done);
});

