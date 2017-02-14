const express = require('express')
const router = express.Router()

const appData = require('../testData.json')
const menuData = appData.menuData
const goodListData = appData.goodListData
router.get('/getMenuData',(req,res) => {
  res.json({
    noerro: 0,
    data: menuData
  })
})
router.get('/getGoodListData',(req,res) => {
  res.json({
    noerro: 0,
    data: goodListData
  })
})
router.post('/searchGoodListData',(req,res) => {
  console.log(req.body)
  res.json({
    noerro: 0
  })
})
module.exports = router
