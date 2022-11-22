import { load } from '/web/utils/LoadView.js'

load('topbar-news') // 加载topbar

let listGroup = document.querySelector('.list-group')

search.oninput = async function () {
  if (!search.value) {
    listGroup.style.display = 'none'
    return
  }
  // json-server支持模糊查询！url?title_like=1
  let list = await fetch(
    `http://localhost:3000/news?title_like=${search.value}`
  ).then((res) => res.json())
  listGroup.innerHTML = list
    .map(
      (item) => `
      <li class="list-group-item">
        <a href="/web/views/detail/index.html?${item.id}">${item.title}</a>
      </li>
      `
    )
    .join('')
  listGroup.style.display = 'block'
}

search.onblur = function () {
  listGroup.style.display = 'none'
}
