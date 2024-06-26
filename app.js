const express = require('express')
const exphbs = require('express-handlebars')
// 查詢文件位置
const path = require('path')
const restaurantsData = require('./restaurant.json').results


const app = express()
const port = 3000

const title = 'my restaurant list'
// 預設樣板引擎
app.engine('.hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

// 設定靜態檔案路由
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { title, restaurantsData })
})

app.get('/search', (req, res) => {
  let noData = true
  const keyword = req.query.keyword.toLowerCase();  // 確保關鍵字轉為小寫
  let filteredRestaurantsData = restaurantsData.filter(data => {
    return data.name.toLowerCase().includes(keyword) || data.category.toLowerCase().includes(keyword);
  });

  if (filteredRestaurantsData.length > 0) {
    noData = false
  }

  res.render('index', { title, restaurantsData: filteredRestaurantsData, keyword, noData });
});


app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantId = req.params.restaurant_id
  const data = restaurantsData.find(data => data.id.toString() === restaurantId)
  res.render('show', { data })
})



app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})