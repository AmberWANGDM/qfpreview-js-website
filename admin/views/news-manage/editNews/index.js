// 以模块化的方式引入
import { load, isLogin } from '/admin/utils/LoadView.js'

// 新闻内容
let content = ''
// 新闻封面
let cover = ''
// 新闻标题和类别
let title = document.querySelector('#title')
let category = document.querySelector('#category')
// mark 获取id
// console.log(location.search) // ?id=1
// console.log(new URL(location.href).searchParams.get('id')) // 1
let updateId = new URL(location.href).searchParams.get('id')

load('sidemenu-newsList') // 加载topbar，sidemenu

// 富文本编辑器
const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
  placeholder: 'Type here...',
  onChange(editor) {
    const html = editor.getHtml()
    // 收集新闻内容
    content = html
  },
}

const editor = createEditor({
  selector: '#editor-container',
  html: '<p><br></p>',
  config: editorConfig,
  mode: 'default', // or 'simple'
})

const toolbarConfig = {}

const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: toolbarConfig,
  mode: 'default', // or 'simple'
})

// 封面编码base64
coverFile.onchange = function (e) {
  let reader = new FileReader()
  reader.readAsDataURL(e.target.files[0])
  reader.onload = function (e) {
    cover = e.target.result
  }
}

editNewsForm.onsubmit = async function (e) {
  e.preventDefault()

  await fetch(`http://localhost:3000/news/${updateId}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title: title.value,
      content,
      category: category.value,
      cover,
      // 作者
      author: JSON.parse(isLogin()).username,
    }),
  }).then((response) => response.json())

  location.href = '/admin/views/news-manage/newsList/index.html'
}

// done 预填新闻编辑表单
async function render() {
  // 问号id=查询或如下方式
  let obj = await fetch(`http://localhost:3000/news/${updateId}`).then(
    (response) => response.json()
  )

  let { title, category, content: oldContent, cover: oldCover } = obj

  document.querySelector('#title').value = title
  document.querySelector('#category').value = category

  // 设置content
  editor.setHtml(oldContent) // 富文本编辑器API，将内容写入
  content = oldContent // content初始化为空，需要赋值
  // 设置cover
  cover = oldCover // cover初始化为空，需要赋值
}

render()
