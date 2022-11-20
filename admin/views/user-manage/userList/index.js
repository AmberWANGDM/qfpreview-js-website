// 以模块化的方式引入
import { load } from '/admin/utils/LoadView.js'
load('sidemenu-userList') // 加载topbar，sidemenu

// 获取tbody节点
const listBody = document.getElementById('listBody')
// 渲染表格
async function render() {
  // 从数据库获取用户列表，返回数组
  let userList = await fetch('http://localhost:3000/users').then((response) =>
    response.json()
  )
  // map映射把用户信息添加到tr元素
  listBody.innerHTML = userList
    .map((item) => {
      return `
          <tr>
            <th scope="row">${item.username}</th>
            <td><img src="${item.photo}" 
            style="width:50px;border-radius:50%">
            </td>
            <td>
            <button type="button" class="btn btn-primary" 
            ${item.default ? 'disabled' : ''}>编辑</button>
            <button type="button" class="btn btn-danger"
            ${item.default ? 'disabled' : ''}>删除</button>
            </td>
          </tr>
        `
    })
    .join('')
}
render()
