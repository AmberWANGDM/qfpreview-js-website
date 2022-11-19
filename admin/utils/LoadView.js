/**
 * 用户鉴权
 * 复用组件
 */

// token鉴权
function isLogin() {
  return localStorage.getItem('token')
}

// 根据localStorage存储的 用户信息 动态渲染topBar
// 退出登录功能实现
function topBarRender(user) {
  const { username, photo } = user
  document.querySelector('#currentUserName').innerHTML = username
  document.getElementById('avatar').setAttribute('src', photo)

  document.getElementById('exit').onclick = function () {
    localStorage.removeItem('token')
    location.href = '/admin/views/login/index.html'
  }
}

// 根据用户角色实现动态渲染侧边栏
function sideMenuRender(user) {
  // 权限管理
  if (JSON.parse(user).role !== 'admin') {
    // 非管理员无权限管理用户
    document.querySelector('.user-manage-item').remove()
  }
}

// 加载topbar和sidebar
async function load(id) {
  let user = isLogin()
  if (user) {
    // 鉴权通过
    // 复用组件topbar
    let topbarText = await fetch(
      '/admin/views/components/topbar/index.html'
    ).then((response) => response.text())
    document.querySelector('.topbar').innerHTML = topbarText
    topBarRender(JSON.parse(user)) // mark 这里记得把字符串转为变量，方便解构赋值

    //复用组件sidemenu
    let sidemenuText = await fetch(
      '/admin/views/components/sidemenu/index.html'
    ).then((response) => response.text())
    document.querySelector('.sidemenu').innerHTML = sidemenuText
    // DONE 实现sidemenu选中高亮
    document.getElementById(id).style.color = '#0d6efd'
    sideMenuRender(user)
  } else {
    // 退出登录，跳转到登录界面
    location.href = '/admin/views/login/index.html'
  }
}

export { isLogin, load }
