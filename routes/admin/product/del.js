var express = require('express');
var router = express.Router();
var mgdb = require('../../../common/mgdb');

router.get('/', function(req, res, next) {
  //1.必传参数
  let dataName = req.query.dataName;
  let _id = req.query._id;
  if(!dataName || !_id){
    res.redirect('/admin/error?msg=dataName和_id为必传参数')
    return;
  }

  //可选参数
  let start = req.query.start ? req.query.start-0 : require('../../../config/global').page_start
  let count = req.query.count ? req.query.count-0 : require('../../../config/global').page_num
  let q = req.query.q ? req.query.q : require('../../../config/global').q;
  let rule = req.query.rule ? req.query.rule : require('../../../config/global').rule;

  //2.公共数据|库数据
  
  //3. 写库
  mgdb({
    collection:dataName
  },({collection,client,ObjectId})=>{
    collection.deleteOne({
      _id:ObjectId(_id)
    },(err,result)=>{
      //4. 渲染页面|跳转页面
      if(!err && result.result.n){
        res.redirect('/admin/product?dataName='+dataName+'&start='+start+'&count='+count+'&q='+q+'&rule='+rule)
      }else{
        res.redirect('/admin/error?msg='+dataName+'操作错误')
      }
      client.close();
    })
  })
  
});

module.exports = router;
