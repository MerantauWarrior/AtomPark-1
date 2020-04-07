$(document).ready(function () {
  console.log('Work!');
//  Tabs
  $('.js-tab').click(function (e) {
    e.preventDefault();
    var tab = $(this).attr('href');
    $('.js-tab').removeClass('tab-link_active');
    $(this).addClass('tab-link_active');
    $('.tab').removeClass('tab_active');
    $('.tab'+tab).addClass('tab_active');
  });
});