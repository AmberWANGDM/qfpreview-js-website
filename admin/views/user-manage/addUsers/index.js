// 以模块化的方式引入
import { load } from '/admin/utils/LoadView.js'

load('sidemenu-addUsers')
let photo = ''
addUserForm.onsubmit = async function (e) {
  e.preventDefault()

  // 将表单数据提交到数据库
  await fetch('http://localhost:3000/users', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      introduction: introduction.value,
      photo,
    }),
  }).then((response) => response.json())

  location.href = '/admin/views/user-manage/userList/index.html'
}

// 把头像转成base64形式
avatar.onchange = function (e) {
  // 创建FileReader实例
  let reader = new FileReader()
  // e.target.files[0]：File对象，即用户上传的文件
  // readAsDataURL方法：在读取完成后，result属性的值为：读取文件的base64编码形式
  reader.readAsDataURL(e.target.files[0])
  // onload事件在文件读取操作完成时触发
  reader.onload = function (e) {
    // e.target：FileReader对象reader
    photo = e.target.result
  }
}
