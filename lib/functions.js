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

/**
 * @description возвращает окончание слова, в зависимости от числа
 *
 * @param {number} number число
 * @returns {string}
 */
wordEnding = function (number) {
  var lastNumber = Math.abs(number) % 10;
  if (lastNumber == 0 || (lastNumber >= 5 && lastNumber <= 9))return '';
  if (lastNumber == 1)return 'а';
  if (lastNumber >= 2 && lastNumber <= 4)return 'ы';
};


//Meteor.methods({
//  setOrderTimer: function (orderId) {
//    check(orderId, String);
//    var seconds = orderExecutionLimit / 1000;
//    if (Meteor.isClient)Session.set('orderExecutionTimer-' + orderId, seconds);
//    var intervalId = Meteor.setInterval(function () {
//      if (Meteor.isClient)Session.set('orderExecutionTimer-' + orderId, --seconds);
//    }, 1000);
//  }
//});


