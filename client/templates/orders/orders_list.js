var ordersData = [
  {
    to: 'Московская, 18',
    url: 'http://sachagreif.com/introducing-telescope/'
  },
  {
    to: 'Московская, 100',
    url: 'http://meteor.com'
  },
  {
    to: 'Володарского, 5',
    url: 'http://themeteorbook.com'
  }
];
Template.ordersList.helpers({
  posts: ordersData
});