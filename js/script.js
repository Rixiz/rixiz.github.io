$('#toggle').click(function() {
   $(this).toggleClass('active');
   $('#overlay').toggleClass('open');
  });
  $(document).ready(function () {
   $('#scroll-button').on('click', function () {
     $('html, body').animate({
       scrollTop: $('#introduction').offset().top
     }, 500); // 800ミリ秒（=0.8秒）かけてスクロール
   });
 });
 $(window).on("scroll", function () {
   var aboutTop = $('#introduction').offset().top;
   var scrollPos = $(window).scrollTop();
   var nav = $('.navigation');
 
   if (scrollPos >= aboutTop - 0) {
     nav.addClass('scrolled');
   } else {
     nav.removeClass('scrolled');
   }
 });