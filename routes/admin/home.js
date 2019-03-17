var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    let common_data={
        ...res.user_session,
        // dataName,
        page_header:'首页',
        active:'index'
    }
    res.render('home',common_data);
})

module.exports = router;

