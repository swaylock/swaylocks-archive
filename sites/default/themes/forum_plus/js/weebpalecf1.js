(function ($) {

Drupal.WeebPal = Drupal.WeebPal || {};
Drupal.WeebPal.currentWidth = -1;
Drupal.WeebPal.currentType = -1;
Drupal.WeebPal.screens = [0, 767.5, 991.5, 989.5];
Drupal.WeebPal.mobileThreadHold = 991.5;
Drupal.WeebPal.clearMinHeight = function(element) {
  $(element).css('min-height', '0px');
}

Drupal.WeebPal.equalHeight = function() {
}

Drupal.WeebPal.equalHeightActions = function() {
  Drupal.WeebPal.equalHeight();
}

Drupal.WeebPal.onClickResetDefaultSettings = function() {
  var answer = confirm(Drupal.t('Are you sure you want to reset your theme settings to default theme settings?'))
  if (answer){
    $("input:hidden[name = light_use_default_settings]").attr("value", 1);
    return true;
  }

  return false;
}

Drupal.WeebPal.eventStopPropagation = function(event) {
  if (event.stopPropagation) {
    event.stopPropagation();
  }
  else if (window.event) {
    window.event.cancelBubble = true;
  }
}

Drupal.behaviors.actionWeebPal = {
  attach: function (context) {
    $(".change-skin-button").click(function() {
      parts = this.href.split("/");
      style = parts[parts.length - 1];
      $.cookie("weebpal_skin", style, {path: '/'});
      window.location.reload();
      return false;
    });
    jQuery(".change-background-button").on("click", function() {
      $('.background .change-background li').removeClass('active');
      $(this).parent('li').addClass('active');
      parts = this.href.split("/");
      style = parts[parts.length - 1];
      var current_background = jQuery.cookie("weebpal_background");
      jQuery.cookie("weebpal_background", style, {path: "/"});
      jQuery("body").removeClass(current_background);
      jQuery("body").addClass(style);
      return false;
    });
    $(window).scroll(function() {
      if($(window).scrollTop() > 200) {
        $('.btn-btt').show();
      }
      else {
        $('.btn-btt').hide();
      }
    });

    $('#change-skin').once('load').on('click', function(){
      $('#change-skin i').toggleClass('fa-spin');
      $('#change_skin_menu_wrapper').toggleClass('fly-out');
    });
    $(window).load(function() {
      Drupal.WeebPal.equalHeightActions();
    });
    $("#block-search-form > .content").prepend('<span class="search-icon"> </span>');

    $("#block-search-form .search-icon").click(function() {
      if($(this).closest('#block-search-form').hasClass('hover')) {
        $(this).closest('#block-search-form').removeClass('hover');
      }
      else {
        $(this).closest('#block-search-form').addClass('hover');
      }
    });

    $("#block-search-form").click(function(e) {
      Drupal.WeebPal.eventStopPropagation(e);
    });
    $('body').click(function() {
      if($('#block-search-form').hasClass('hover')) {
        $('#block-search-form').removeClass('hover');
      }
    });
    $(window).scroll(function() {
      if($(window).scrollTop() > 200) {
        $('.btn-btt').show();
      }
      else {
        $('.btn-btt').hide();
      }
    }).resize(function(){
      if($(window).scrollTop() > 200) {
        $('.btn-btt').show();
      }
      else {
        $('.btn-btt').hide();
      }
    });          
  }
};
})(jQuery);
