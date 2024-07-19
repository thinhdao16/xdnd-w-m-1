document.addEventListener('DOMContentLoaded', function () {
  // URL của API

  const apiUrl = 'https://f-home-be.vercel.app/getXdndProject'; // Thay thế bằng URL API thực tế của bạn
  const bodyData = {
    type: "design" // Dữ liệu bạn muốn gửi trong yêu cầu POST
  };
  // Gọi API
  fetch(`${apiUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      // Hiển thị dữ liệu nhận được từ API
      const apiDataDiv = document.getElementById('add-project');
      if (data?.data && Array.isArray(data?.data?.postings)) {
        let content = '';
        data?.data?.postings.forEach(item => {
          content += `
     <li class="column is-full project_images ">
            <a class="image is_radius" data-item='${JSON.stringify(item)}' >
              <img src='${item?.img?.[0]}'
                alt="Thiết kế và cải tạo nội thất nhà ở chuyên nghiệp">
            </a>
            <h3 class="title is-6 mt-3 mb-2">
              <a data-item='${JSON.stringify(item)}' >${item?.title}</a>
            </h3>
            <div class="tags mb-0" data-type="attributes" data-source="post">
              <span class="tag is-info is-light">${item?.landArea}</span>

              <span class="tag is-info is-light">${item?.location}</span>

              <span class="tag is-info is-light">${item?.totalArea}</span>

              <span class="tag is-info is-light">${item?.typeConstruction}</span>

              <span class="tag is-info is-light">${item?.year}</span>
              <span class="tag is-info is-light">${item?.costConstruction}</span>

            </div>
            <div class="has-text-grey text_2_line font_13">
              ${item?.description}
            </div>
          </li>
                    `;

        })
        apiDataDiv.innerHTML = content;

        const links = document.querySelectorAll('.project_images a');

        links.forEach(link => {
          link.addEventListener('click', async function (event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết

            // Lưu id vào localStorage
            const itemData = this.getAttribute('data-item');
            console.log(itemData)
            localStorage.setItem('selected_item_project_mobile', itemData);
            window.location.href = 'du-an-item.html';

          })
        })

      }
    })
    .catch(error => {
      // Xử lý lỗi
      const apiDataDiv = document.getElementById('apiData');
      apiDataDiv.innerHTML = 'Error loading data: ' + error.message;
    });
});
