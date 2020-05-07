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
    $('.video__movies-slider').each(function () {
      var slider = $(this);
      slider.slick({
        dots: false,
        infinite: false,
        slidesToShow: 1,
        prevArrow: slider.parent().find('.video__arrow-prev'),
        nextArrow: slider.parent().find('.video__arrow-next')
      });
      slider.parent().find('.video__arrow-prev').hide();
      slider.on('afterChange', function (event, slick, currentSlide) {
        var count = slick.slideCount;
        if (currentSlide > 0) {
          slider.parent().find('.video__arrow-prev').show();
        } else {
          slider.parent().find('.video__arrow-prev').hide();
        }
        if (currentSlide + 1 >= count) {
          slider.parent().find('.video__arrow-next').hide();
        } else {
          slider.parent().find('.video__arrow-next').show();
        }
      });
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
      $('.faqs-item__question').not($(this)).siblings('.faqs-item__content').slideUp(500);
      $(this).toggleClass('faqs-item__question_opened');
      $(this).siblings('.faqs-item__content').slideToggle(500);
    });
    $('.faqs-item-answer__title').click(function () {
      $(this).siblings('.faqs-item-answer__content').slideToggle(500);
    });
  }
//  Contacts
  if ($('.contacts__ask-text').length > 0) {
    $('.contacts__ask-text').click(function () {
      $(this).toggleClass('contacts__ask-text_opened');
      $('.contacts__form').slideToggle(250);
    });
  }
//  Story
  $('.js-story-show-more').click(function (e) {
    e.preventDefault();
    $('.js-story-show-more-content').toggle();
    if($('.js-story-show-more-content').is(':visible')){
      $(this).text('Свернуть');
    }else{
      $(this).text('Читать весь отзыв');
    }
  });
//  Why
  if ($('.why-feedbacks__slider').length > 0) {
    $('.why-feedbacks__slider').slick({
      dots: true,
      infinite: false,
      slidesToShow: 1,
      prevArrow: $('.why__arrow-prev-feedback'),
      nextArrow: $('.why__arrow-next-feedback'),
      responsive: [
        {
          breakpoint: 600,
          settings: {
            dots: false
          }
        }
      ]
    });
    $('.why__arrow-prev-feedback').hide();
    $('.why-feedbacks__slider').on('afterChange', function (event, slick, currentSlide) {
      var count = slick.slideCount;
      if (currentSlide > 0) {
        $('.why__arrow-prev-feedback').show();
      } else {
        $('.why__arrow-prev-feedback').hide();
      }
      if (currentSlide + 1 >= count) {
        $('.why__arrow-next-feedback').hide();
      } else {
        $('.why__arrow-next-feedback').show();
      }
    });
  }
  if ($('.why-clients__slider').length > 0) {
    $('.why-clients__slider').slick({
      dots: false,
      infinite: false,
      slidesToShow: 5,
      prevArrow: $('.why__arrow-prev-clients'),
      nextArrow: $('.why__arrow-next-clients'),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
    $('.why__arrow-prev-clients').hide();
    $('.why-clients__slider').on('afterChange', function (event, slick, currentSlide) {
      var count = slick.slideCount;
      if (currentSlide > 0) {
        $('.why__arrow-prev-clients').show();
      } else {
        $('.why__arrow-prev-clients').hide();
      }
      if (currentSlide + 1 >= count) {
        $('.why__arrow-next-clients').hide();
      } else {
        $('.why__arrow-next-clients').show();
      }
    });
  }

});