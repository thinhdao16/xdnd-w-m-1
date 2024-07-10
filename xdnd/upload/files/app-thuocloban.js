let dataLoban;
let myScroll;
const lobanMax = 1001;
const lobanSpace = isMobile ? 200 : 600;

function getAppData(token) {
  $('.loban-scroller').css('opacity', '0');
  $.ajax({
    type: "GET",
    url: "/apiv1/files/get",
    data: { token, name: 'loban' }
  }).done(function (res) {
    try {
      dataLoban = JSON.parse(res);
      
      const strRuler = $(`.loban_ruler`);
      for (let cm = 0; cm <= lobanMax; cm++) {
        strRuler.append(`<li class="is_cm" data-title="${cm} cm"></li>`);
      }
      
      renderLoban(652.5, 130.5, 'lb52');
      renderLoban(536.25, 134.0625, 'lb42');
      renderLoban(388, 97, 'lb38');

      $('.loban-scroller').css('opacity', '1');
      $('.loban-scroller').css('width', lobanMax + '01px');
      
      myScroll = new IScroll('#thuocloban', {
        scrollX: true,
        scrollY: false,
        mouseWheel: true,
        scrollbars: true,
        probeType: 2
      });
      myScroll.on('scroll', function () {
        getMeasure(parseInt(this.x));
      });
      myScroll.on('scrollEnd', function () {
        getMeasure(parseInt(this.x));
      });

    } catch (error) {
      showNotify('Không thể lấy dữ liệu ứng dựng !', false);
      console.log('Không thể lấy dữ liệu ứng dựng !');
    }
  });

  document.getElementById("measure")
    .addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      const x = parseInt(this.value) * -10 + lobanSpace;
      myScroll.scrollTo(x, 0);
    }
  });
}

function getMeasure(x) {
  const measure = parseInt(((x * -1) + lobanSpace) / 10);
  $('#measure').val(measure);
}

function renderLoban(khoan, cung, type) {
  let data;
  if (type === 'lb52')
    data = dataLoban.lb52;
  else if (type === 'lb42')
    data = dataLoban.lb42;
  else if (type === 'lb38')
    data = dataLoban.lb38;

  let khoanWidth = 0;
  const strKhoan = $(`#${type} .loban_khoan`);
  const strCung = $(`#${type} .loban_cung`);
  for (let k = 0; k <= data.length; k++) {
    if (k === data.length) {
      k = 0;
    }
    const item = data[k];
    strKhoan.append(`<li style="width: ${khoan}px;" data-good="${item.tot}">${item.khoan}</li>`);
    item.cung.forEach(child => {
      strCung.append(`<li style="width: ${cung}px;" data-good="${item.tot}">${child}</li>`);
    });

    khoanWidth += khoan;
    if (khoanWidth >= lobanMax * 100)
      break;
  }
}