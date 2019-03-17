const MongoClient = require('mongodb').MongoClient;//创建客户端实例
const ObjectId = require('mongodb').ObjectID

module.exports=({url,dbName,collection},callback)=>{

  //可选参数
  url = url || 'mongodb://localhost:27017';
  dbName = dbName || 'aber'
  collection = collection || 'admin'

  MongoClient.connect(url,{ useNewUrlParser: true } ,function(err, client) {
    if(err){
      console.log("库链接错误");
    }else{
      const db = client.db(dbName);
      collection = db.collection(collection);
      callback({collection,client,ObjectId})
      // client.close();
    }
  });

}