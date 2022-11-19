// form默认事件——刷新;起一个id，绑定一个提交事件
const loginform = document.querySelector('#loginform')

loginform.onsubmit = async function (e) {
  // 阻止默认行为
  e.preventDefault()
  // 原生js可以直接通过id操作元素，这是因为【如果dom元素的id名称不和js内置属性或全局变量重名的话，该名称自动成为window对象的属性。】
  loginwarning.style.display = 'none' // 隐藏失败警告
  // 提交用户名密码，进行用户身份验证
  const res = await fetch(
    `http://localhost:3000/users?username=${username.value}&password=${password.value}`
  ).then((res) => res.json())
  // .then((res) => console.log(res))
  if (res.length > 0) {
    // 验证成功，跳转到管理后台首页
    localStorage.setItem(
      'token',
      // 用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉
      JSON.stringify({ ...res[0], password: '***' })
    )
    location.href = '/admin/views/home/index.html'
  } else {
    loginwarning.style.display = 'block'
  }
}
