import { load } from '/web/utils/LoadView.js'

load('topbar-news') // 加载topbar

let listGroup = document.querySelector('.list-group')
let list = []
search.oninput = async function () {
  if (!search.value) {
    listGroup.style.display = 'none'
    return
  }
  // json-server支持模糊查询！url?title_like=1
  list = await fetch(
    `http://localhost:3000/news?title_like=${search.value}`
  ).then((res) => res.json())
  listGroup.innerHTML = list
    .map(
      (item) => `
      <li class="list-group-item">
        <a href="/web/views/detail/index.html?id=${item.id}">${item.title}</a>
      </li>
      `
    )
    .join('')
  listGroup.style.display = 'block'
}

search.onblur = function () {
  listGroup.style.display = 'none'
}

async function render() {
  await renderList()
  await renderTab()
}
render()

async function renderList() {
  list = await fetch(`http://localhost:3000/news`).then((res) => res.json())
  list.reverse()
  let cardContainer = document.querySelector('.cardContainer')
  cardContainer.innerHTML = list
    .slice(0, 4)
    .map(
      (item) => `
        <div class="card" data-id="${item.id}">
          <div class="card-img-top" style="background-image:url(${item.cover})"></div>
          <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.author}</p>
          </div>
      </div>
      `
    )
    .join('')

  let card = document.querySelectorAll('.card')
  // for-of循环
  for (let item of card) {
    item.onclick = function () {
      location.href = `/web/views/detail/index.html?id=${item.dataset.id}`
    }
  }
}

function renderTab() {
  let categoryObj = _.groupBy(list, (item) => item.category)
  // console.log(categoryObj) // {0: Array(2), 1: Array(4), 2: Array(2)}
  // console.log(categoryObj['0']) // (2) [{…}, {…}]
  let tabs = [tab0, tab1, tab2] // 按照分类映射到不同的tab
  tabs.forEach((item, index) => {
    // 需要考虑某分类下没有新闻的情况
    item.innerHTML =
      categoryObj[index]
        ?.map(
          // ? 前面为假就不继续链式调用
          (item) =>
            `
              <div class="listItem" data-id="${item.id}">
                <img src="${item.cover}" data-id="${item.id}">
                <div data-id="${item.id}">${item.title}</div>
                <p data-id="${item.id}">${item.author}</p>
              </div>
            `
        )
        .join('') || '' // ||  undefined -> 空

    // 跳转详情页面 dataset需要绑定到每个元素
    item.onclick = function (e) {
      location.href = `/web/views/detail/index.html?id=${e.target.dataset.id}`
    }
  })
}
