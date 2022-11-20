// 以模块化的方式引入
import { load, isLogin } from '/admin/utils/LoadView.js'
// 文章列表
let list = []
// 分类列表
let categoryList = ['最新动态', '典型案例', '通知公告']

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
            <button type="button" class="btn btn-success">预览</button>
            <button type="button" class="btn btn-primary btn-edit">编辑</button>
            <button type="button" class="btn btn-danger btn-del">删除</button>
            </td>
          </tr>
    `
    })
    .join('')
}

render()
