// 以模块化的方式引入
import { load } from '/admin/utils/LoadView.js'
load('sidemenu-userList') // 加载topbar，sidemenu

// 获取tbody节点
const listBody = document.getElementById('listBody')
// 获取模态框
let myModal = new bootstrap.Modal(document.getElementById('editModal'))

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
            <button type="button" class="btn btn-primary btn-edit" 
            ${item.default ? 'disabled' : ''}
            >
            编辑
            </button>
            <button type="button" class="btn btn-danger btn-del"
            ${item.default ? 'disabled' : ''}>删除</button>
            </td>
          </tr>
        `
    })
    .join('')
}
render()

// 编辑用户，事件委托
listBody.onclick = function (e) {
  if (e.target.className.includes('btn-edit')) {
    // todo 显示模态框编辑用户信息
    myModal.toggle()
    // 预填模态框
  } else if (e.target.className.includes('btn-del')) {
    console.log('del')
  } else {
  }
}
