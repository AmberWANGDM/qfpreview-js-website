import { load } from '/web/utils/LoadView.js'

load('') // 加载topbar

async function render() {
  let id = new URL(location.href).searchParams.get('id')
  let { title, content, author } = await fetch(
    `http://localhost:3000/news/${id}`
  ).then((res) => res.json())

  document.querySelector('.title').innerHTML = title
  document.querySelector('.author').innerHTML = author
  document.querySelector('.news-content').innerHTML = content
}
render()
