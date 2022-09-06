var express = require('express');
const { lock1, lock2 } = require('../module/loceker-pool');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { title: 'Express' });
});

router.get('/5slock1', function (req, res, next) {
  if (!lock1.hasLocked()) {
    lock1.setLocked()
    setTimeout(() => {
      lock1.cancelLocked()
    }, 5 * 1000)
    return res.json({
      msg: 'lock1 已被上鎖，於5秒內自動解'
    })
  }

  res.json({
    msg: 'lock1 開始上鎖，5秒後自動解鎖'
  })
})
router.get('/5slock2', function (req, res, next) {
  if (!lock2.hasLocked()) {
    lock2.setLocked()

    setTimeout(() => {
      lock2.cancelLocked()
    }, 5 * 1000)
    
    return res.json({
      msg: 'lock1 已被上鎖，於5秒內自動解'
    })
  }

  res.json({
    msg: 'lock2 開始上鎖，5秒後自動解鎖'
  })
})

module.exports = router;
