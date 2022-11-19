// 以模块化的方式引入
import { load, isLogin } from '/admin/utils/LoadView.js'

load('sidemenu-home') // 加载topbar，sidemenu
// 传入id，便于sidemenu高亮显示“首页”

let user = JSON.parse(isLogin())
document.querySelector('.userprofile').innerHTML = `
  <img src="${user.photo}" style="width:100px;"/>
  <div>
    <div>${user.username}</div>
    <div><pre>${user.introduction || '这个人很懒'}</pre></div>
  </div>
`
// pre标签可以保留格式
