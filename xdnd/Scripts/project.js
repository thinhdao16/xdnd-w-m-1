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
          console.log(item)
          content += `
                 <li class="column is-full">
            <div class="columns is-variable is-3">
              <div class="column is-5">
                <ul class="columns is-variable is-1 project_images">
                  <li class="column is-two-thirds">
                    <a class="image is-4by5 is_cover is_radius"  data-item='${JSON.stringify(item)}' 
                      
                      style="background-image: url('${item?.img?.[0]}');"></a>
                  </li>
                   <li class="column is-one-third">
                                                <div class="columns is-variable is-multiline is-1 is-relative" data-rows="3">
                                                    ${item.img.slice(1, 4).map((img) => `
                                                        <p class="column is-full">
                                                            <a class="image is-5by4 is_cover is_radius"
                                                             data-item='${JSON.stringify(item)}' 
                                                               
                                                               style="background-image: url('${img}');"></a>
                                                        </p>
                                                    `).join('')}
                                                </div>
                                            </li>
                </ul>
              </div>
              <div class="column is-7">
                <div class="has-background-white-bis is_radius px-5 py-3 font_14" style="min-height: 100%;">
                  <h3 class="has-text-weight-semibold is-size-5 mb-2 project_images">
                    <a  data-item='${JSON.stringify(item)}' >${item?.title}</a>
                  </h3>
                  <div class="text_3_line mb-2">
                  ${item?.description}
                  </div>
                  <div class="columns is-multiline is-variable is-0 project_attr" data-type="attributes"
                    data-source="post">
                    <p class="column is-half">
                      <span class="is_title">Diện tích đất</span>
                      <span class="is_value">  ${item?.landArea}</span>
                    </p>

                    <p class="column is-half">
                      <span class="is_title">Địa điểm</span>
                      <span class="is_value">  ${item?.location}</span>
                    </p>

                    <p class="column is-half">
                      <span class="is_title">Tổng diện tích sàn</span>
                      <span class="is_value">  ${item?.totalArea}</span>
                    </p>

                    <p class="column is-half">
                      <span class="is_title">Loại công trình</span>
                      <span class="is_value">  ${item?.typeConstruction}</span>
                    </p>

                    <p class="column is-half">
                      <span class="is_title">Năm thiết kế</span>
                      <span class="is_value">  ${item?.year}</span>
                    </p>
                     <p class="column is-half">
                      <span class="is_title">Chi phí thi công</span>
                      <span class="is_value">  ${item?.costConstruction}</span>
                    </p>
                  </div>
                </div>
              </div>
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
            localStorage.setItem('selected_item_project', itemData);
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
