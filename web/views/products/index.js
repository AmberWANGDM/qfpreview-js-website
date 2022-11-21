import { load } from '/web/utils/LoadView.js'

load('topbar-products') // 加载topbar

async function render() {
  let list = await fetch('http://localhost:3000/products').then((response) =>
    response.json()
  )
  // 轮播图指示器
  let indicatorHTML = document.querySelector('.carousel-indicators')
  indicatorHTML.innerHTML = list
    .map(
      (item, index) => `
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}" 
        class=${index === 0 ? 'active' : ''}
        aria-current="true" aria-label="${item.title}"></button>
      `
    )
    .join('')

  // 轮播图内容
  let innerCarouselHTML = document.querySelector('.carousel-inner')
  innerCarouselHTML.innerHTML = list
    .map(
      (item, index) => `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <div
          style="background-image: url(${
            item.cover
          });width: 100%;height:calc(100vh - 50px);background-size: cover;">
        </div>
        <div class="carousel-caption d-none d-md-block">
          <h5>${item.title}</h5>
          <p>${item.introduction}</p>
        </div>
      </div>
     `
    )
    .join('')
}
render()
