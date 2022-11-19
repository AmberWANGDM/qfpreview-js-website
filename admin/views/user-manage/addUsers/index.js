// 以模块化的方式引入
import { load } from '/admin/utils/LoadView.js'

load('sidemenu-addUsers')

let avatarBase = ''
addUserForm.onsubmit = function (e) {
  e.preventDefault()

  console.log(username.value)
  console.log(password.value)
  console.log(introduction.value)
  console.log(avatarBase)
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
    avatarBase = e.target.result
  }
}
