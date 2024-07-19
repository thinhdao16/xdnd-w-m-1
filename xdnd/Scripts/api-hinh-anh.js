document.addEventListener('DOMContentLoaded', function () {
    // URL của API, thay thế bằng URL thực tế của bạn
    const apiUrl = 'https://63fc47ff677c41587308cabf.mockapi.io/api/v1/user/user-v1'; // Thay thế bằng URL API thực tế của bạn
    // Gọi API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const galleryDiv = document.getElementById('apiData');
            console.log("ađâs", data)
            // Giả sử data là một mảng các đối tượng hình ảnh
            data.forEach(item => {
                console.log(item)
                const itemElement = document.createElement('div');
                itemElement.innerHTML = `
                    <h2 id="${item.id} ">${item.email}</h2>
                    <p id="${item.id} ">${item.id}</p>
                `;
                galleryDiv.appendChild(itemElement);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const galleryDiv = document.getElementById('gallery');
            galleryDiv.innerHTML = 'Error loading images: ' + error.message;
        });
});

function handleImageClick(imageId) {
    console.log("first")
    // Tạo nội dung cho trang mới với dữ liệu từ API
    const newPageContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>sdfv</title>
                </head>
                <body>
                    <h1>sdfv</h1>
                    <p>sdvf</p>
                   
                </body>
                </html>
            `;

    // Tạo một Blob từ nội dung trang mới
    const blob = new Blob([newPageContent], { type: 'text/html' });

    // Tạo URL từ Blob
    const url = URL.createObjectURL(blob);

    // Chuyển hướng sang trang mới
    window.location.href = url;

}

async function loadWordDocument() {
    const filePath = "../Cách vẽ sơ đồ câu 1.docx"; // Đường dẫn tệp Word cục bộ

    try {
        const file = await readFile(filePath);
        const zip = await JSZip.loadAsync(file);
        const doc = new docxtemplater().loadZip(zip);

        const text = doc.getFullText();
        document.getElementById('content').textContent = text;
    } catch (error) {
        console.error('Error loading document:', error);
        document.getElementById('content').textContent = 'Đã xảy ra lỗi khi tải tệp Word.';
    }
}

function readFile(filePath) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const arrayBuffer = event.target.result;
            resolve(arrayBuffer);
        };
        reader.onerror = function (error) {
            reject(error);
        };
        // Đọc tệp với kiểu dữ liệu ArrayBuffer
        reader.readAsArrayBuffer(new Blob([filePath]));
    });
}
