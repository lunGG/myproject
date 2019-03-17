var express = require('express');
var router = express.Router();
var mgdb = require('../../common/mgdb')

router.post('/', function (req, res, next) {
  //1.必传参数
  let {goods,_id} = req.body;
  console.log(req.body)
  if (!goods || !_id) {
    res.send({error:1,msg:'good和_id为必传参数'})
    return;
  }

  //找到这条数据
  mgdb({
    collection: 'detail'
  }, ({ collection, client, ObjectId }) => {
    collection.find({
      _id: ObjectId(_id)
    }).toArray((err, result) => {
      console.log(result)
      if (!err && result.length>0) {
        res.send(result);
      }else{
        res.send({error:1,msg:'查无数据'});
      }
      client.close();
    })
  })
});
module.exports = router;
