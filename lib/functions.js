formatDateTime = function (date) {

  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  var hh = date.getHours();
  if (hh < 10) hh = '0' + hh;

  var min = date.getMinutes();
  if (min < 10) min = '0' + min;

  return dd + '.' + mm + '.' + yy + ' ' + hh + ':' + min;
};

//getUserId = function(){
//  return (Meteor.isClient) ? Meteor.userId() : this.userId;
//};
