let namsinh = 0;
let gioitinh = 0;
let dulieu;
let nguhanh;

function getAppData(token) {
  $.ajax({
    type: "GET",
    url: "/apiv1/files/get",
    data: { token, name: 'xemhuong' }
  }).done(function (res) {
    try {
      dulieu = JSON.parse(res);
    } catch (error) {
      showNotify('Không thể lấy dữ liệu ứng dựng !', false);
      console.log('Không thể lấy dữ liệu ứng dựng !');
    }
  });

  $.ajax({
    type: "GET",
    url: "/apiv1/files/get",
    data: { token, name: 'nguhanh' }
  }).done(function (res) {
    try {
      nguhanh = JSON.parse(res);
    } catch (error) {
      showNotify('Không thể lấy dữ liệu ứng dựng !', false);
      console.log('Không thể lấy dữ liệu ứng dựng !');
    }
  });
}

function reset() {
  $('#step1').removeClass('is-hidden');
  $('#step2').addClass('is-hidden');
}

function submitStep1() {
  namsinh = $('#input_namsinh').val() !== '' ? parseInt($('#input_namsinh').val()) : 0;
  gioitinh = parseInt($('input[name="gioitinh"]:checked').val());

  if (namsinh > 0 && gioitinh > 0) {
    $('#step1').addClass('is-hidden');
    $('#step2').removeClass('is-hidden');
    submitApp();
  }
  else {
    alert('Bạn chưa nhập thông tin');
  }
}

function submitApp() {

  const sdau = parseInt(namsinh * 0.01);
  const sduoi = namsinh % 100;
  const sn1 = sdau % 3;
  const sn2 = sduoi % 12 + 2;
  const scanh = getCanh(namsinh % 10);
  const sgiap = getGiap(sn1, sn2);
  const nsarray = namsinh.toString().split('');
  const nstong = parseInt(nsarray[0]) + parseInt(nsarray[1]) + parseInt(nsarray[2]) + parseInt(nsarray[3]);
  const nsmenh = nstong % 9;
  const quemenh = getQueMenh(nsmenh);
  const huongtot = getHuongTot(quemenh);
  const hientai = $("#input_huongnha option:selected").text();
  const huongnha = getHientai(quemenh, $('#input_huongnha').val());

  $('#namsinh').html(namsinh);
  $('#tuoiam').html(`${scanh} ${sgiap}`);
  $('#quemenh').html(quemenh);
  $('#cungmenh').html(getCungMenh(namsinh));
  $('#sinhkhi').html(huongtot.sk);
  $('#thieny').html(huongtot.ty);
  $('#diennien').html(huongtot.dn);
  $('#phucvi').html(huongtot.pv);
  $('#phucvi').html(huongtot.pv);
  $('#hientai').html(hientai);
  $('#huongnha').html(huongnha);
  $('#ynghia').html(getYnghia(huongnha));
}

function getCanh(canh) {
  return dulieu.canh[canh];
}

function getGiap(n1, n2) {
  return dulieu.giap[n1].item[n2 - 2];
}

function getCungMenh(nam) {
  for (let i = 0; i < nguhanh.length; i++) {
    if (nguhanh[i].nam1 === nam || nguhanh[i].nam2 === nam || nguhanh[i].nam3 === nam || nguhanh[i].nam4 === nam)
      return nguhanh[i].menh;
  }
  return '';
}

function getQueMenh(index) {
  const item = dulieu.cungmenh[index].item;
  if (gioitinh === 1)
    return item[0];
  else
    return item[1];
}

function getHuongTot(menh) {
  return dulieu.huongtot.find(item => item.menh === menh);
}

function getHientai(menh, huong) {
  const item = dulieu.hientai.find(item => item.menh === menh);
  return item[huong];
}

function getYnghia(huong) {
  if (huong === 'Sinh khí')
    return 'Mang ý nghĩa sinh sôi, phát triển. Hướng nhà tượng trưng cho sự hanh thông, thuận lợi, đạt được nhiều thành công trong cuộc sống.';
  else if (huong === 'Thiên y')
    return 'Biểu trưng cho cát khí, nhận được nhiều tài lộc, may mắn, luôn có sự phù trợ của quý nhân. ';
  else if (huong === 'Diên niên')
    return '(Phước đức)Sự hòa thuận, êm đẹp  trong các mối quan hệ tình cảm, gia đình và công việc. Hoạt động dinh doanh cũng gặp nhiều tiến triển.';
  else if (huong === 'Phục vị')
    return 'Hóa giải những điều không may mắn, giúp cuộc sống luôn được thuận lợi, từ đó gặp nhiều may mắn.';
  else if (huong === 'Tuyệt mệnh')
    return 'Mang nhiều hung khí, có ý nghĩa về sự chia lìa, bệnh tật và trắc trở. Đây là hướng nhà xấu nhất nên tránh.';
  else if (huong === 'Ngũ quỷ')
    return 'Dễ bị quấy rối bởi những điều không đâu, cuộc sống lận đận khó khăn. Cãi vã, thị phi là những điều khó tránh khỏi.';
  else if (huong === 'Lục sát')
    return 'Hướng về sự thiệt hại, mất mát, dễ bị đứt đoạn trong các mối quan hệ, bị trì hoãn công việc làm ăn.';
  else if (huong === 'Họa hại')
    return 'Mưu sự khó thành, dễ hao tài tán lộc, tình duyên trắc trở, dễ đối mặt với những điều không may mắn.';
  else
    return '';
}