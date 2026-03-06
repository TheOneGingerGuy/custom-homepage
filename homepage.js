$(document).ready(function () {

  $('#dropdown-btn').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if ($('#dropdown-content1').is(':visible')) {
      $('#dropdown-content1').slideToggle(200);
      $('#arrow').removeClass('open');
    } else {
      $('#dropdown-content1').slideToggle(200);
      $('#arrow').addClass('open');
    }
  });

  $(document).on('click', function () {
    $('#dropdown-content1').slideUp(200);
    $('#arrow').removeClass('open');
  });

});
$(document).ready(function () {

  $('#dropdown-btn2').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if ($('#dropdown-content2').is(':visible')) {
      $('#dropdown-content2').slideToggle(200);
      $('#arrow2').removeClass('open');
    } else {
      $('#dropdown-content2').slideToggle(200);
      $('#arrow2').addClass('open');
    }
  });

  $(document).on('click', function () {
    $('#dropdown-content2').slideUp(200);
    $('#arrow2').removeClass('open');
  });

});
$(document).ready(function () {

  $('#dropdown-btn3').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if ($('#dropdown-content3').is(':visible')) {
      $('#dropdown-content3').slideToggle(200);
      $('#arrow3').removeClass('open');
    } else {
      $('#dropdown-content3').slideToggle(200);
      $('#arrow3').addClass('open');
    }
  });

  $(document).on('click', function () {
    $('#dropdown-content3').slideUp(200);
    $('#arrow3').removeClass('open');
  });

});
$(document).ready(function () {

  $('#dropdown-btn4').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if ($('#dropdown-content4').is(':visible')) {
      $('#dropdown-content4').slideToggle(200);
      $('#arrow4').removeClass('open');
    } else {
      $('#dropdown-content4').slideToggle(200);
      $('#arrow4').addClass('open');
    }
  });

  $(document).on('click', function () {
    $('#dropdown-content4').slideUp(200);
    $('#arrow4').removeClass('open');
  });

});

function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString();
  document.getElementById('date').textContent = now.toDateString();
}
setInterval(updateClock, 1000);
updateClock();
document.getElementById('themeButton1').addEventListener('click', function () {
  document.body.style.backgroundImage = 'url(./images/darkmode.jpg)';
});

document.getElementById('themeButton2').addEventListener('click', function () {
  document.body.style.backgroundImage = 'url(./images/lightmode.png)';
});
