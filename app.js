const express = require('express')
const exphbs = require('express-handlebars')
// 查詢文件位置
const path = require('path')

const app = express()
const port = 3000

const title = 'my restaurant list'
// 預設樣板引擎
app.engine('.hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

// 設定靜態檔案路由
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { title })
})



app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})