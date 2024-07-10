let namsinh = 0;
let namxay = 0;
let dulieu, nguhanh;

function getAppData(token) {
  $.ajax({
    type: "GET",
    url: "/apiv1/files/get",
    data: { token, name: 'xemtuoi' }
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
  namxay = $('#input_namxay').val() !== '' ? parseInt($('#input_namxay').val()) : 0;

  if (namsinh > 0 && namxay > 0) {
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

  const xdau = parseInt(namxay * 0.01);
  const xduoi = namxay % 100;
  const xn1 = xdau % 3;
  const xn2 = xduoi % 12 + 2;
  const xcanh = getCanh(namxay % 10);
  const xgiap = getGiap(xn1, xn2);

  const tuoi = namxay - namsinh + 1;
  const tamtai = getTamTai(sgiap, xgiap);
  const kimlau = getKimLau(tuoi);
  const hoangoc = getHoangOc(tuoi);
  const tuoitot = toiTotLamNha(namxay);

  $('#namsinh').html(namsinh);
  $('#tuoiam').html(`${scanh} ${sgiap}`);
  $('#namxay').html(namxay);
  $('#namam').html(xcanh + ' ' + xgiap);
  $('#sotuoi').html(`${tuoi} tuổi`);
  $('#menh').html(getMenh(namsinh));
  $('#tamtai').addClass(tamtai ? 'is-success' : 'is-danger');
  $('#kimlau').addClass(kimlau ? 'is-success' : 'is-danger');
  $('#hoangoc').addClass(hoangoc ? 'is-success' : 'is-danger');
  $('#tuoitot').html(tuoitot);
}

function getCanh(canh) {
  return dulieu.canh[canh];
}

function getGiap(n1, n2) {
  return dulieu.giap[n1].item[n2 - 2];
}

function getMenh(nam) {
  for (let i = 0; i < nguhanh.length; i++) {
    if (nguhanh[i].nam1 === nam || nguhanh[i].nam2 === nam || nguhanh[i].nam3 === nam || nguhanh[i].nam4 === nam)
      return nguhanh[i].menh;
  }
  return '';
}

function getTamTai(sgiap, xgiap) {
  $('#tamtai').removeClass('is-success');
  $('#tamtai').removeClass('is-danger');
  $('#tamtai span').html('KHÔNG PHẠM TAM TAI');
  for (let i = 0; i < dulieu.tamtai.length; i++) {
    const tamtai = dulieu.tamtai[i];
    if (tamtai.tuoi === sgiap) {
      if (tamtai.t1 === xgiap || tamtai.t2 === xgiap || tamtai.t3 === xgiap) {
        $('#tamtai span').html('PHẠM TAM TAI !');
        return false;
      }
    }
  }
  return true;
}

function getKimLau(tuoi) {
  let kl = tuoi % 9;
  //kl = kl === 0 ? 1 : kl;
  const kimlau = dulieu.kimlau[kl];
  $('#kimlau').removeClass('is-success');
  $('#kimlau').removeClass('is-danger');
  $('#kimlau p').html(`Kim lâu: cung ${kimlau.cung}`);
  $('#kimlau span').html(`${kimlau.kl}`);
  return kimlau.kl === 'KHÔNG PHẠM KIM LÂU';
}

function getHoangOc(tuoi) {
  $('#hoangoc').removeClass('is-success');
  $('#hoangoc').removeClass('is-danger');
  for (let i = 0; i < dulieu.hoangoc.length; i++) {
    const hoangoc = dulieu.hoangoc[i];
    if (hoangoc.tuoi === tuoi) {
      for (let j = 0; j < dulieu.cunghoangoc.length; j++) {
        const cung = dulieu.cunghoangoc[j];
        if (cung.name === hoangoc.value) {
          console.log(cung);
          $('#hoangoc p').html(`Hoang ốc: ${hoangoc.value} / ${cung.status}`);
          $('#hoangoc span').html(`${cung.value}`);
          return cung.status === 'Tốt';
        }
      }
    }
  }
  return true;
}

function toiTotLamNha(namxay) {
  for (let i = 0; i < dulieu.tuoitot.length; i++) {
    const tuoitot = dulieu.tuoitot[i];
    if (tuoitot.id === namxay) {
      return `<p class="has-text-weight-semibold">Tuổi tốt mượn làm nhà năm ${namxay}</p>
<span>${tuoitot.value}</span>`;
    }
  }
}