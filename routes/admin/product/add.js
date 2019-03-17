var express = require('express');
var router = express.Router();
var pathLib = require('path')
var uploadUrl = require('../../../config/global').upload.product
var fs = require('fs');
var mgdb = require('../../../common/mgdb')

router.get('/', function(req, res, next) {
  let dataName = req.query.dataName;
  if(!dataName){
    res.redirect('/admin/error?msg=dataName为必传参数')
    return;
  }
  let common_data={
    ...res.user_session,
    dataName,
    page_header:dataName+'添加',
    active:dataName
  }
  res.render('product/add',common_data);
});

router.post('/submit', function(req, res, next) {

  let dataName = req.body.dataName;
  if(!dataName){
    res.send('/admin/error?msg=dataName为必传参数')
    return;
  }
  
  let {content,title,des,auth} = req.body;
  let time = Date.now();
  let auth_icon = req.files.length ? uploadUrl + req.files[0].filename + pathLib.parse(req.files[0].originalname).ext : '';
  if(auth_icon){
    fs.renameSync(
      req.files[0].path,
      req.files[0].path+pathLib.parse(req.files[0].originalname).ext
    )
  }else{
    auth_icon = '/upload/noimage.png';
  }

  mgdb({
    collection:dataName
  },({collection,client})=>{
    collection.insertOne({
      title,des,time,detail:{auth,content,auth_icon}
    },(err,result)=>{
      if(!err && result.result.n){
        res.send('/admin/product?dataName='+dataName+'&start=1')
      }else{
        res.send('/admin/error?msg=集合操作错误')
      }
      client.close();
    })
  })



});

module.exports = router;
