function checkLocalStorage() {
    // Lấy dữ liệu từ localStorage
    const itemData = localStorage.getItem('selected_item_project_mobile');

    // Kiểm tra xem dữ liệu có tồn tại không
    if (itemData) {
        console.log(itemData)
        try {
            // Chuyển đổi dữ liệu từ JSON
            const dataParse = JSON.parse(itemData);

            console.log(dataParse); // Kiểm tra dữ liệu trong console

            // Hiển thị dữ liệu nếu có
            const dataContentDiv = document.getElementById('du-an-item-select');
            let content = '';

            // Tạo nội dung cho div dựa trên dữ liệu
            content += `
                <div >
                   <h1 class="title is-5 has-text-weight-medium">${dataParse?.title}</h1>

                    <figure class="image is_radius">
                        <img src="${dataParse?.img?.[0]}"
                            alt="nothing">
                    </figure>

                    <div class="tags mt-3" data-bind="true" data-type="attributes" data-source="638549310536455184">
                        <span class="tag is-info is-light">${dataParse?.landArea}</span>

              <span class="tag is-info is-light">${dataParse?.location}</span>

              <span class="tag is-info is-light">${dataParse?.totalArea}</span>

              <span class="tag is-info is-light">${dataParse?.typeConstruction}</span>

              <span class="tag is-info is-light">${dataParse?.year}</span>
              <span class="tag is-info is-light">${dataParse?.costConstruction}</span>
                    </div>

                    <article class="has-text-grey mb-4 font_14">
                        Thiết kế và cải tạo nội thất nhà ở, công năng 3 phòng ngủ.
                    </article>

                    <ul class="columns is-mobile is-centered is-multiline" data-bind="true" data-type="images"
                        data-source="638549310536455184">
                          ${dataParse?.img?.map((item) => `
                        <li class="column is-full">
                            <figure class="image is_radius">
                                 <img src="${item}">
                            </figure>
                        </li>
                         `)
                }
                    </ul>

                    </div>
                `;

            // Cập nhật nội dung của phần tử
            dataContentDiv.innerHTML = content;
        } catch (error) {
            console.error('Lỗi khi phân tích dữ liệu JSON:', error);
            // Chuyển hướng nếu có lỗi khi phân tích JSON
            // window.location.href = 'index.html';
        }
    } else {
        // Chuyển hướng nếu không có dữ liệu
        // window.location.href = 'index.html'; 
    }
}

// Gọi hàm khi trang được tải
document.addEventListener('DOMContentLoaded', checkLocalStorage);