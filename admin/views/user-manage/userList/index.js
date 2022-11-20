// 以模块化的方式引入
import { load } from '/admin/utils/LoadView.js'
load('sidemenu-userList') // 加载topbar，sidemenu
// 用户列表
let userList = []
// 编辑用户id
let updateId = -1
// 上传图片：在用户编辑时，可能会不上传图片，需要保存之前的图片
let photoFile = ''
// 获取tbody节点
const listBody = document.getElementById('listBody')
// 获取模态框
let myModal = new bootstrap.Modal(document.getElementById('editModal'))

// 渲染表格
async function render() {
  // 从数据库获取用户列表，返回数组
  userList = await fetch('http://localhost:3000/users').then((response) =>
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
            data-userId="${item.id}">编辑</button>
            <button type="button" class="btn btn-danger btn-del"
            ${item.default ? 'disabled' : ''}
            data-userId="${item.id}">删除</button>
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
    // done 显示模态框编辑用户信息
    myModal.toggle()
    // todo 预填模态框
    // 1. 获取用户id（注意会变为小写）
    updateId = e.target.dataset.userid
    console.log(updateId)
    // 2. 通过updateId获取用户列表对应用户信息
    let editUserInfo = userList.filter((item) => item.id == updateId)[0] // 类型强制转换
    // 3. 将用户信息渲染到模态框
    let { username, password, introduction, photo } = editUserInfo
    document.getElementById('username').value = username
    document.getElementById('password').value = password
    document.getElementById('introduction').value = introduction
    photoFile = photo
  } else if (e.target.className.includes('btn-del')) {
    console.log('del')
  } else {
  }
}
