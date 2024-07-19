function checkLocalStorage() {
    // Lấy dữ liệu từ localStorage
    const itemData = localStorage.getItem('selected_item_project');

    // Kiểm tra xem dữ liệu có tồn tại không
    if (itemData) {
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
                 <div class="columns">
                        <div class="column is-two-thirds">
                            <figure class="image is-2by1 is_radius is_cover"
                                style="background-image: url('${dataParse?.img?.[0]}');">
                            </figure>
                        </div>
                        <div class="column is-one-third font_14">
                            <h1 class="title is-4 is-size-5-mobile mb-1 color_main">
                            ${dataParse?.title}
                            </h1>
                            <hr class="mt-1 mb-3">
                            <div class="columns is-multiline is-variable is-0 project_attr" data-bind="true"
                                data-type="attributes" data-source="637610411834012529">
                                <p class="column is-full">
                                    <span class="is_title">Diện tích đất</span>
                                    <span class="is_value">${dataParse?.landArea}</span>
                                </p>

                                <p class="column is-full">
                                    <span class="is_title">Chi phí thi công</span>
                                    <span class="is_value">${dataParse?.costConstruction}</span>
                                </p>

                                <p class="column is-full">
                                    <span class="is_title">Địa điểm</span>
                                    <span class="is_value">${dataParse?.location}</span>
                                </p>

                                <p class="column is-full">
                                    <span class="is_title">Tổng diện tích sàn</span>
                                    <span class="is_value">${dataParse?.totalArea}</span>
                                </p>

                                <p class="column is-full">
                                    <span class="is_title">Loại công trình</span>
                                    <span class="is_value">${dataParse?.typeConstruction}</span>
                                </p>

                                <p class="column is-full">
                                    <span class="is_title">Năm thiết kế</span>
                                    <span class="is_value">${dataParse?.year}</span>
                                </p>
                            </div>
                            <article class="mt-3">
                                ${dataParse?.description}  
                                </article>
                            </div>
                        </div>

                        <hr>

                        <ul class="columns is-centered is-multiline" data-bind="true" data-type="images"
                            data-source="637610411834012529">
                            ${dataParse?.img?.map((item) => `
                                 <li class="column is-four-fifths has-text-centered">
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
            window.location.href = 'index.html';
        }
    } else {
        // Chuyển hướng nếu không có dữ liệu
        window.location.href = 'index.html';
    }
}

// Gọi hàm khi trang được tải
document.addEventListener('DOMContentLoaded', checkLocalStorage);