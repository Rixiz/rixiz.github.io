$('#toggle').click(function() {
   $(this).toggleClass('active');
   $('#overlay').toggleClass('open');
  });
//arrow scroll
  $(document).ready(function () {
   $('#scroll-button').on('click', function () {
     $('html, body').animate({
       scrollTop: $('#introduction').offset().top
     }, 500); // 800ミリ秒（=0.8秒）かけてスクロール
   });
 });
//navbar transparent control
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
//slide image
$(function(){
  var delay     = 4500; // 各スライド表示時間（ms）
  var fadeSpeed = 600;  // フェード速度（ms）
  var timerId;

  $('#slider').hover(function(){
    var $slider     = $(this);
    var $slides     = $slider.find('#slideList li');
    var $progress   = $slider.find('#progressBar');
    var slideCount  = $slides.length;
    var imgNo       = 0;

    // 初期化＆開始
    $slides.hide().eq(0).show();
    $progress
      .stop(true,true)
      .css('width', 0)
      .show()
      .animate({ width: '100%' }, delay, 'linear'); // 線形補間 :contentReference[oaicite:0]{index=0}

    // 一定間隔でスライド切替＆進捗リセット
    timerId = setInterval(function(){
      $slides.eq(imgNo).fadeOut(fadeSpeed, function(){
        imgNo = (imgNo + 1) % slideCount;
        $slides.eq(imgNo).fadeIn(fadeSpeed);
      });

      // プログレスバーをリセット＆再スタート
      $progress
        .stop(true,true)
        .css('width', 0)
        .animate({ width: '100%' }, delay, 'linear'); // 線形補間 :contentReference[oaicite:1]{index=1}

    }, delay);

  }, function(){
    // ホバー終了で即停止＆リセット
    clearInterval(timerId);
    $('#progressBar')
      .stop(true,true)
      .hide()
      .css('width', 0);
  });
});
