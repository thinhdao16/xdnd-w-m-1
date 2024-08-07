let slideIndex = 1;

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'https://f-home-be.vercel.app/getXdndProject';
  const bodyData = {
    type: "design"
  };

  fetch(apiUrl, {
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
      const slideshowContainer = document.querySelector('.slideshow-container');
      const dotContainer = document.querySelector('.dot-container');
      const apiDataDiv = document.getElementById('add-project');
      let slidesContent = '';
      let dotsContent = '';
      let content = '';

      if (data?.data && Array.isArray(data?.data?.postings)) {
        data?.data?.postings.forEach((item, index) => {
          // Slideshow content
          slidesContent += `
            <div class="mySlides fade project_images" >
            <a data-item='${JSON.stringify(item)}' style="background-image: url('${item?.img?.[0]}'); width:100%; height:500px; object-fit: cover; border-radius:15px; display:block">
            </a>
            </div>`;
          dotsContent += `<span class="dot" onclick="currentSlide(${index + 1})"></span>`;

          // Additional content
          content += `
            <li class="column is-full">
              <div class="columns is-variable is-3">
                <div class="column is-5">
                  <ul class="columns is-variable is-1 project_images">
                    <li class="column is-two-thirds">
                      <a class="image is-4by5 is_cover is_radius" 
                         data-item='${JSON.stringify(item)}'
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
                      <a data-item='${JSON.stringify(item)}'>${item?.title}</a>
                    </h3>
                    <div class="text_3_line mb-2">
                      ${item?.description}
                    </div>
                    <div class="columns is-multiline is-variable is-0 project_attr" data-type="attributes"
                         data-source="post">
                      <p class="column is-half">
                        <span class="is_title">Diện tích đất</span>
                        <span class="is_value">${item?.landArea}</span>
                      </p>
                      <p class="column is-half">
                        <span class="is_title">Địa điểm</span>
                        <span class="is_value">${item?.location}</span>
                      </p>
                      <p class="column is-half">
                        <span class="is_title">Tổng diện tích sàn</span>
                        <span class="is_value">${item?.totalArea}</span>
                      </p>
                      <p class="column is-half">
                        <span class="is_title">Loại công trình</span>
                        <span class="is_value">${item?.typeConstruction}</span>
                      </p>
                      <p class="column is-half">
                        <span class="is_title">Năm thiết kế</span>
                        <span class="is_value">${item?.year}</span>
                      </p>
                      <p class="column is-half">
                        <span class="is_title">Chi phí thi công</span>
                        <span class="is_value">${item?.costConstruction}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>`;
        });

        slideshowContainer.innerHTML = slidesContent;
        dotContainer.innerHTML = dotsContent;
        apiDataDiv.innerHTML = content;

        showSlides(slideIndex);

        const links = document.querySelectorAll('.project_images a ');
        links.forEach(link => {
          link.addEventListener('click', function (event) {
            event.preventDefault();
            const itemData = this.getAttribute('data-item');
            localStorage.setItem('selected_item_project', itemData);
            window.location.href = 'du-an-item.html';
          });
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
