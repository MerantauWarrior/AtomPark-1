$(document).ready(function () {
//  Tabs
  $('.js-tab').click(function (e) {
    e.preventDefault();
    var tab = $(this).attr('href');
    $('.js-tab').removeClass('tab-link_active');
    $(this).addClass('tab-link_active');
    $('.tab').removeClass('tab_active');
    $('.tab' + tab).addClass('tab_active');
  });
//  VideoPage slider
  if ($('.video__movies-slider').length > 0) {
    $('.video__movies-slider').slick({
      dots: false,
      infinite: false,
      slidesToShow: 1,
      prevArrow: $('.video__arrow-prev'),
      nextArrow: $('.video__arrow-next')
    });
    $('.video__arrow-prev').hide();
    $('.video__movies-slider').on('afterChange', function (event, slick, currentSlide) {
      var count = slick.slideCount;
      if (currentSlide > 0) {
        $('.video__arrow-prev').show();
      } else {
        $('.video__arrow-prev').hide();
      }
      if (currentSlide + 1 >= count) {
        $('.video__arrow-next').hide();
      } else {
        $('.video__arrow-next').show();
      }
    });
  }
//  BlogPost slider
  if ($('.blog-post-slider').length > 0) {
    $('.blog-post-slider').slick({
      dots: true,
      arrows: false,
      infinite: false,
      slidesToShow: 1
    });
  }
  // if($('#sidebar').length > 0){
  //   $('#sidebar').stickySidebar({
  //     topSpacing: 20,
  //     bottomSpacing: 20,
  //     containerSelector: '.main-content',
  //     innerWrapperSelector: '.blog-post__sidebar'
  //   });
  // }

//  Faqs
  if ($('.faqs-item').length > 0) {
    $('.faqs-item__question').click(function () {
      $('.faqs-item__question').not($(this)).removeClass('faqs-item__question_opened');
      $('.faqs-item__question').not($(this)).siblings('.faqs-item__content').slideUp(250);
      // if( $(this).siblings('.faqs-item__content').is())
      $(this).toggleClass('faqs-item__question_opened');
      $(this).siblings('.faqs-item__content').slideToggle(250);
    });
    $('.faqs-item-answer__title').click(function () {
      $(this).siblings('.faqs-item-answer__content').slideToggle(250);
    });
  }
});