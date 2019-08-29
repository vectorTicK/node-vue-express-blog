# Node.js + Vue.js 开发简易博客

> 学习node.js、vue.js、MongoDB

## 一、入门

1. 介绍

- 个人博客网站
  - 注册、登录
  - 看文章
  - 写文章
  - 编辑、删除文章
  
- 技术栈：
  - 服务端：Nodejs，框架Express3
  - 前端和后台模板：Vue.js
  - 数据库：MongoDB
  - 完整包含技术：Node.js, Express, MongoDB, Vue.js, JWT.

2. 开发工具和环境（Node.js、npm、MongoDB、Vue.js）
2. 初始化项目

- 初始化后端：新建server文件夹，初始化项目：`npm init`
- 初始化前段：`vue create web`

## 二、后台
1. 必需模块

- Express、 mongoose、 cors（跨域请求）

  ```js
    npm i express@next mongoose cors
  ```

  ```js
    express 基本使用方法:
    const express = require('express')
    const app = express()
    app.listen(3000, (req,res) => {
    console.log('app is running on 3000')
    })
  ```
  
2. 路由
- 路由的基本使用方法:
    ```js
    // 路由文件
    module.exports = app => {
    const express = require('express')
    const router = express.Router()
    router.get('/', async (req, res) => {
        res.send('hello')
    })
    app.use('/blog', router)
    }
    ```
    ```js
    // 使用路由
    require('./routes/index')(app)
    ```
3. 使用*mogodb*数据库
- 引用数据库
    ```js
    // 创建db.js, 在主文件中使用引用数据库
    require('./plugins/db')(app)
    ```
    ```js
    //db.js写法 使用mongoose
    module.exports = app => {
    const mongoose = require('mongoose') // 引用mongoose
    mongoose.connect('mongodb://localhost/blog_db', {useNewUrlParser:true})
    } 
    ```
- 数据模型
    ```js
    // 定义数据模型，创建Article.js模型文件
    const mongoose = require('mongoose')
    const schema = new mongoose.Schema({
        title: {type: String},
        body: {type: String}
    })
    module.exports = mongoose.model('Article', schema)
    ```
    ```js
    // 使用数据模型，Article.js
    // 引用模型
    const Article = require('../models/Article')
    // 增
    router.post('/Article', async (req, res) => {
        let model = await Article.create(req.body) //req.body，app需使用中间件express.json
    })
    ```    
- CRUD通用接口

  需引用模块：`inflection`
  
  *通用接口中间件*
  ```js
  module.exports = option =>{
    return async (req, res, next)=> {
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../models/${modelName}`)
        await next()
    }
  }
  ```
  路由中使用中间件：
  ```js
  app.use('/blog/api/rest/:model', modelMiddleware()  ,router)
  ```
## 三、前端

1. 使用element ui 
    ```
    vue add element
    ```
1. 使用axios,用于http请求

1. 用户管理
- 加密处理：在数据模型密码字段添加`set`,使用bcrypt进行加密
    ```js
        password: {
        type: String,
        set(val){
            return require('bcrypt').hashSync(val, 10)
        }
    }
    ```
- 密码比对
    ```js
    const isValid = require('bcrypt').compareSync(password, user.password)
    ```

- 捕获全局错误，在http中添加`interceptors`拦截器
    ```js
    
    ``` 

4. 权限管理
- 使用token（`jsonwebtoken`） 
    ```js
    // 服务器返回token
    const token = jwt.sign({_id: user._id,}, app.get('secret'))
    res.send({token})
    ``` 
    客户端保存token
    ```
    localStorage.token = res.data.token
    ```

     
- 客户端添加带token请求头
    ```js
    http.interceptors.request.use(config => {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
    }
    return config
    })
    ``` 
- 验证token
    新建auth.js token验证中间件

    ```js
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const User = require('../models/User')
    module.exports = option => {
    return async (req, res, next) => {
        assert(req.headers.authorization, 401, '请登录')
        const token = (String(req.headers.authorization) || '').split(' ').pop()
        const {
            _id
        } = jwt.verify(token, req.app.get('secret'))
        assert(_id, 401, '请登录')
        req.user = await User.findById(_id)
        assert(req.user, 401, '请登录')
        await next()
    }
    }
    ``` 
    在需要权限验证的路由使用auth中间件：
    ```js
    app.use('/blog/api/rest/:model',authMiddleware(), modelMiddleware(), router)
    ````         

5. 工具样式 

- `npm i sass sass-loader`
- 使用scss变量
    ```scss
    // 变量文件：_variables.scss
    $base-font-size: 1rem;
    $font-sizes: (xxs: 0.6154, // 8px
        xs: 0.7692, // 10px
        sm: 0.9231, // 12px
        md: 1, //13x
        lg: 1.0769, //14px
        xl: 1.2308, //16px
    );
    // style.scss文件
    @import './variables'; //  引用变量文件
    @each $key,$size in $font-sizes {
        .fs-#{$key} {
            font-size: $size * $base-font-size !important;
        }
    }
    ```


6. 富文本编辑器

- `vue2-editor`

7. 日期处理包`dayjs`

## 四、部署

1. 生产环境
- 编译
`npm run build`

- vuejs怎么在服务器上发布部署
    https://blog.csdn.net/yusirxiaer/article/details/77162931

nginx

mongodb-server

git

ssh-keygen

node npm 
使用淘宝镜像
npm config set registry https://registry.npm.taobao.org

nrm use taobao
