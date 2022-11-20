// 以模块化的方式引入
import { load, isLogin } from '/admin/utils/LoadView.js'
let categoryList = ['最新动态', '典型案例', '通知公告']
let data = []
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

// 获取当前用户文章列表
async function getArticleList() {
  let articleList = await fetch(
    `http://localhost:3000/news?author=${user.username}`
  ).then((response) => response.json())
  // console.log(articleList)
  let res = _.groupBy(articleList, (item) => item.category)
  // console.log(res)
  for (let i in res) {
    data.push({
      value: res[i].length,
      name: categoryList[i],
    })
  }
  render(data)
}
getArticleList()

function render(data) {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('main'))
  // 指定图表的配置项和数据
  var option = {
    title: {
      text: '当前用户发布新闻',
      subtext: '不同类别占比',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        // 拿到后端数据
        data /* : [
        { value: 735, name: '最新动态' },
        { value: 580, name: '典型案例' },
        { value: 1048, name: '通知公告' },
      ] */,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}
