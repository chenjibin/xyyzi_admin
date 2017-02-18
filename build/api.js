const express = require('express')
const router = express.Router()

const appData = require('../testData.json')
const menuData = appData.menuData
const goodListData = appData.goodListData
const goodCateData = appData.goodCateData
const goodListDataLength = goodListData.tableData.length
router.get('/getMenuData',(req,res) => {
  res.json({
    noerro: 0,
    data: menuData
  })
})
router.get('/getGoodListData',(req,res) => {
  let currentPage = +req.query.currentPage
  let pageSize = +req.query.pageSize
  let newtableData = goodListData.tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  res.json({
    noerro: 0,
    initFormData: goodListData.initFormData,
    tableData: newtableData,
    totalCount: goodListDataLength
  })
})
router.post('/searchGoodListData',(req,res) => {
  console.log(req.body)
  res.json({
    noerro: 0
  })
})

router.get('/getGoodCateData',(req,res) => {
  let newtableData = goodCateData.tableData
  res.json({
    noerro: 0,
    tableData: newtableData
  })
})
module.exports = router
