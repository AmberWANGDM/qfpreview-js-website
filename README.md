# qfpreview-js-website
## 项目描述
- 基于原生JavaScript，公司网站展示及后台管理
- 使用bootstrap, json-server, lodash, echarts，富文本编辑器wangEditor等组件库
- 后台：实现用户登录，用户角色及权限管理，新闻发布、预览和编辑
- TODO：前台页面
## 项目结构
```
|-- 项目
    |-- admin 后台
    |   |-- lib     库文件
    |   |-- utils   
    |   |   |-- LoadView.js 
    |   |-- views 页面
    |       |-- components 公用组件
    |       |   |-- sidemenu    侧边栏
    |       |   |-- topbar      顶部导航栏
    |       |-- home    首页
    |       |-- login   登录页
    |       |-- news-manage  新闻管理
    |       |   |-- addNews
    |       |   |-- editNews
    |       |   |-- newsList
    |       |-- user-manage  用户管理
    |           |-- .DS_Store
    |           |-- addUsers
    |           |-- userList
    |-- db   json-server
    |   |-- db.json
    |-- web 前台
```
