const express = require('express')
const app = express()
app.set('secret', 'abcd')
app.use(require('cors')())
app.use(express.json())

app.use('/web', express.static(__dirname + '/web'))
// 引用数据库
require('./plugins/db')(app)
// 路由
require('./routes/router')(app)
require('./routes/user-router')(app)



app.listen(3000, (req,res) => {
    console.log('app is running on 3000')
})