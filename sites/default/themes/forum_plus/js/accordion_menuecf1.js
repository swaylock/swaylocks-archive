(function ($) {

  "use strict";

  $.fn.accordionMenu = function() {

    this.find('.content > ul.menu > li.expanded > ul.menu').each(function() {
      var $ele = $(this);
      var $link = $ele.prev();
      if ($link.hasClass('active') || $link.hasClass('active-trail')) {
        $ele.parent().addClass('open');
        $link.addClass('active');
        $ele.wrap('<div class="submenu-wrap" style="overflow:hidden;height:auto;position:relative;"></div>');
      }
      else {
        $ele.wrap('<div class="submenu-wrap" style="overflow:hidden;height:0;position:relative;"></div>');
      }
    });

    this.find('.content > ul.menu > li.expanded > a').on('click', function (e) {
      var $li = $(this).parent();

      if (!$li.hasClass('open')) {
        collapse($(this));
        expand($(this));
        e.preventDefault();
      }
      e.stopPropagation();
    });

    return this;
  };

  function expand(ele) {
    var $li = ele.parent();
    var menuHeight = getMenuHeight($li.find('ul.menu'));

    ele.addClass('active');
    $li.find('a.active-trail').addClass('active');
    $li.toggleClass('open');
    $li.find('div.submenu-wrap').animate({height: menuHeight});
  }

  function collapse(ele) {
    var $li = ele.parent();
    var $oldLi = $li.parent().find('li.open').removeClass('open');

    $oldLi.find('div.submenu-wrap').animate({height: 0});
    $oldLi.find('a.active').removeClass('active');
  }

  //Helper
  function getMenuHeight(ele) {
    var $ele = $(ele), height = "auto";
    if ($ele.is(":visible")) {
        height = $ele.outerHeight();
    } else {
        var tmp = {
            position: $ele.css("position"),
            visibility: $ele.css("visibility"),
            display: $ele.css("display")
        };

        height = $ele.css({position: 'absolute', visibility: 'hidden', display: 'block'}).outerHeight();

        $ele.css(tmp); // reset element
    }

    return height;
  }

})(jQuery);