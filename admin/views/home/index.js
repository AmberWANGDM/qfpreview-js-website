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

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'))

// 指定图表的配置项和数据
var option = {
  title: {
    text: 'ECharts 入门示例',
  },
  tooltip: {},
  legend: {
    data: ['销量'],
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
}

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option)
