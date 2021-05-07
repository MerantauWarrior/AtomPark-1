$(document).ready(function () {
  //Select
  var x, i, j, selElmnt, a, b, c, img;
  x = document.getElementsByClassName("select");
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    if (selElmnt.options[selElmnt.selectedIndex].getAttribute('data-icon') !== null) {
      a.innerHTML = '<img src="' + selElmnt.options[selElmnt.selectedIndex].getAttribute('data-icon') + '" alt=""><span>' + selElmnt.options[selElmnt.selectedIndex].innerHTML + '</span>';
    } else {
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    }
    if (selElmnt.disabled) {
      x[i].classList.add('select--disabled');
    }
    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
      c = document.createElement("DIV");
      if (selElmnt.options[j].getAttribute('data-icon') !== null) {
        c.innerHTML = '<img src="' + selElmnt.options[j].getAttribute('data-icon') + '" alt=""><span>' + selElmnt.options[j].innerHTML + '</span>';
        c.setAttribute('data-val',selElmnt.options[j].getAttribute('value'));
      } else {
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.setAttribute('data-val',selElmnt.options[j].getAttribute('value'));
      }
      c.addEventListener("click", function (e) {
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.textContent) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            h.setAttribute('data-val',s.options[i].getAttribute('value'));
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    if (selElmnt.disabled) {
      console.log('disabled');
    } else {
      a.addEventListener("click", function (e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }
  }
  function closeAllSelect(elmnt) {
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  document.addEventListener("click", closeAllSelect);

  // Only nambers
  $.fn.inputFilter = function(inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  };
  $(".js-number").inputFilter(function(value) {
    return /^\d*$/.test(value);
  });
  $(".js-email").inputFilter(function(value) {
    return /^[a-zA-Z0-9@+\.]*$/.test(value);
  });
  $('.js-isEmail').on('keyup blur', function(){
    var valid = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,8})?$/.test(this.value) && this.value.length;
    if(valid){
      $(this).removeClass('error');
    }else {
      $(this).addClass('error');
    }
  });
  $('.js-empty').on('keyup blur', function(){
    if($.trim($(this).val()).length === 0){
      $(this).addClass('error');
    }else {
      $(this).removeClass('error');
    }
    var state = $('.js-empty').filter(function () {
      return $.trim($(this).val()).length === 0
    }).length === 0;
    state === false ? $(this).closest('form').find('button').attr('disabled', true) : $(this).closest('form').find('button').attr('disabled', false);
  });
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
//  Product
  if ($('.btn-product--unique').length > 0) {
    $('.btn-product--unique').hover( function () {
      $(this).attr('style', $(this).data('hover'));
    }, function () {
      $(this).attr('style', $(this).data('style'));
    });
  }


});