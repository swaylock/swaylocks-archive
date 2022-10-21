

(function ($) {

  Drupal.ForumPlus = Drupal.ForumPlus || {};

  Drupal.behaviors.actionFlatize = {
    attach: function (context) {
      $('.btn-btt').smoothScroll({speed: 300});
      $('.forum-jump-links a').smoothScroll({speed: 300});
      Drupal.ForumPlus.setInputPlaceHolder('search_block_form', 'Keywords', '#search-block-form');
      $('.bootstrap-slideshow').carousel();
      Drupal.ForumPlus.moveComments();
      Drupal.ForumPlus.moveSearch();
      Drupal.ForumPlus.initFloatPanel();
      Drupal.ForumPlus.extendDefaultMenu();

	  $(window).load(function() {
        $('.two-column .view-content, .three-column .view-content').masonry({
          itemSelector: '.views-row'
        });
	  });
	  
      $('[data-toggle="offcanvas"]').click(function () {
        $('.row-offcanvas').toggleClass('active');
      });
      $(window).resize(function() {
        Drupal.ForumPlus.checkScroll();
      })
      if ($(window).width() <= 991) {
        $('#main-menu-inner .region-main-menu').accordionMenu();
      }
      $(window).resize(function(){
        if ($(window).width() <= 991) {
          $('#main-menu-inner .region-main-menu').accordionMenu();
        }
      });


      $("#menu-toggle, .btn-close").once('load').click(function(e) {

        var wrapper = $("#page");
        if (!wrapper.hasClass('toggled')) {
          wrapper.addClass('toggled');
          if (wrapper.find('.overlay').length == 0) {
            var overlay = $('<div class="overlay"></div>');
            overlay.prependTo(wrapper);
            overlay.click(function() {
              $('#menu-toggle').trigger('click');
            });
            $('body').css('overflow', 'hidden');
          }

        }
        else {
          var overlay = wrapper.find('.overlay');
          wrapper.css('width', '');
          wrapper.removeClass('toggled');

          if (overlay.length > 0) {
            overlay.remove();
            $('body').css('overflow', '');
          }
        }
        e.preventDefault();
        return false;
      });
    }
  };

   /**
   * Support interactions with the utility region.
   *
   * - Support open/close interaction with the utility region blocks on click.
   *   Clicking/touching a block header (h2) toggles the "open" class on the
   *   block, causing its content to show.
   * - Support open/close interaction with the utility region on scroll.
   *   Scrolling up adds the "open" class on the utility region, causing it to
   *   show, while scrolling down removes the class and causes it to hide.
   */
  Drupal.behaviors.mobileSearch = {
    attach: function(context, settings) {
      var $headers = $('#search-block-form h2', context);
      $headers.once('element-invisible').click(function() {
        var $block = $(this).parent();
        if (!$block.hasClass('open')) {
          // Before opening this block, close the others.
          $block.addClass('open');
        }
        else {
          // Block is open, it's h2 was clicked again, so close it.
          $block.removeClass('open');
        }
      });

      // Close the utility menus when something else is clicked/touched.
      $(window).click(function() {
        $('.region-utility > .block', context).removeClass('open');
      });

      $('.region-utility > .block').click(function(event) {
        event.stopPropagation();
      });

      // Hide the utility region on scroll-down / show on scroll-up.
      // Technique adapted from a Stack Overflow post by Josiah Ruddell.
      // @see http://stackoverflow.com/a/4326907
      var lastScrollTop = 0;
      $(window).scroll(function() {
        var st = $(this).scrollTop();
        if (st > lastScrollTop && st > 100) {
          // Scrolling down...
          // Close the utility region.
          $('#utility').removeClass('open');
          // Close any open utility blocks.
          $('.region-utility > .block', context).removeClass('open');
        }
        else {
          // Scrolling up...
          // Show the utility region.
          $('#utility').addClass('open');
        }
        lastScrollTop = st;
      });
    }
  };

  Drupal.ForumPlus.setInputPlaceHolder = function(name, text, selector) {
    selector = selector == undefined ? '' : selector + ' ';

    if ($.support.placeholder) {
      $(selector + 'input[name="' + name + '"]').attr('placeholder', Drupal.t(text));
    } else {
      $(selector + 'input[name="' + name + '"]').val(Drupal.t(text));
      $(selector + 'input[name="' + name + '"]').focus(function(){
        if(this.value == Drupal.t(text)) {
          this.value='';
        }
      }).blur(function(){
        if(this.value == '') {
          this.value=Drupal.t(text);
        }
      });
    }
  }

  Drupal.ForumPlus.moveComments = function() {
    if ($('article').hasClass('node-product')) {
      $('#comments').appendTo('.group-reviews');
      $('.group-reviews').css('height','');
      $('.group-reviews').find('.field-name-field-status').hide();
    }
  }

  Drupal.ForumPlus.moveSearch = function() {
    $('#block-search-form .content').appendTo( $('#forum-search .container') );
    $('#block-search-form').click(function() {
      if ($('#forum-search').hasClass('open')) {
        $('#forum-search').removeClass('open');
      } else {
        $('#forum-search').addClass('open');
      }
    })
  }

  Drupal.ForumPlus.showSidebar = function() {
    this.sidebarButton.removeClass('close');
    this.sidebarFirst.css({'opacity' : '1', 'display' : 'block'});
    this.mainSection.addClass('has-sidebar');
    this.mainArea.removeClass('col-lg-12').addClass('col-lg-9');
    this.mainArea.removeClass('col-md-12').addClass('col-md-9');
  }

  Drupal.ForumPlus.initFloatPanel = function() {
    var self = this;
    if ($('body').hasClass('front')) {
      self.sidebarButton = $('<a class="button-sidebar-link" href=""></a>');
      self.sidebarFirst  = $('#sidebar-first');
      self.mainSection   = $('#main');
      self.mainArea      = $('#main-area');

      self.sidebarFirst.after(self.sidebarButton);
      self.mainSection.addClass('has-sidebar');
      self.sidebarButton.click(function() {
        if (self.mainSection.hasClass('has-sidebar')) {
          self.sidebarButton.addClass('close');
          self.sidebarFirst.css({'opacity' : '0', 'display' : 'none'});
          self.mainSection.removeClass('has-sidebar');
          self.mainArea.removeClass('col-lg-9').addClass('col-lg-12');
          self.mainArea.removeClass('col-md-9').addClass('col-md-12');
        } else {
          self.showSidebar();
        }
        return false;
      })
    }
  }

  Drupal.ForumPlus.checkScroll = function() {
    if ( $('.button-sidebar-link').css('display') == 'none' ) {
      this.showSidebar();
    }
  }

  Drupal.ForumPlus.extendDefaultMenu = function() {
    jQuery(".header .navbar .block .content > ul > li").hover(
      function() {
        jQuery(".header .navbar .block .content > ul > li.active-trail")
        .removeClass('active-trail')
        .addClass('active-trail-off');
      },
      function() {
        jQuery(".header .navbar .block .content > ul > li.active-trail-off")
        .removeClass('active-trail-off')
        .addClass('active-trail');
      }
      );
  }

  $.support.placeholder = (function(){
    var i = document.createElement('input');
    return 'placeholder' in i;
  })();




})(jQuery);
