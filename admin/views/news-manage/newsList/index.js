// 以模块化的方式引入
import { load, isLogin } from '/admin/utils/LoadView.js'
// 文章列表
let list = []
// 分类列表
let categoryList = ['最新动态', '典型案例', '通知公告']
// 初始化文章预览模态框
let perviewModal = new bootstrap.Modal(document.getElementById('perviewModal'))

load('sidemenu-newsList') // 加载topbar，sidemenu

async function render() {
  list = await fetch(
    `http://localhost:3000/news?author=${JSON.parse(isLogin()).username}`
  ).then((response) => response.json())

  listBody.innerHTML = list
    .map((item) => {
      return `
          <tr>
            <th scope="row">${item.title}</th>
            <td>${categoryList[item.category]}</td>
            <td>
            <button type="button" class="btn btn-success btn-preview" data-id="${
              item.id
            }">预览</button>
            <button type="button" class="btn btn-primary btn-edit" data-id="${
              item.id
            }">编辑</button>
            <button type="button" class="btn btn-danger btn-del" data-id="${
              item.id
            }">删除</button>
            </td>
          </tr>
    `
    })
    .join('')
}

render()

// 事件委托
listBody.onclick = function (e) {
  if (e.target.className.includes('btn-preview')) {
    // done 文章预览模态框
    perviewModal.toggle()
    let newsObj = list.filter((item) => item.id == e.target.dataset.id)[0]
    renderPreviewModal(newsObj)
  } else if (e.target.className.includes('btn-edit')) {
    // todo 编辑新闻
    location.href =
      '/admin/views/news-manage/editNews/index.html?id=' + e.target.dataset.id
  } else if (e.target.className.includes('btn-del')) {
  }
}

function renderPreviewModal(newsObj) {
  perviewModalTitle.innerHTML = newsObj.title
  perviewModalContent.innerHTML = newsObj.content
}
