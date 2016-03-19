Template.registerHelper('isAdmin',function(){
  return isAdmin();
});

Template.registerHelper('submitted',function(){
  return formatDateTime(this.submitted);
});

