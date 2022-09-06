const express = require('express');
const lockerGuard = require('../middlewares/locker-guard');
const {lock1, lock2} = require('../module/loceker-pool');
const router = express.Router();

router.get('/lock1', (req, res) => {
    
    const last_status = lock1.hasLocked()
    if(last_status) {
        lock1.cancelLocked() 
    } else {
        lock1.setLocked()
    } 
    const now_status = lock1.hasLocked()
    res.json({
        last_status,
        now_status
    })
})
router.get('/lock2', (req, res) => {
    const last_status = lock2.hasLocked()
    if(last_status) {
        lock2.cancelLocked() 
    } else {
        lock2.setLocked()
    } 
    const now_status = lock2.hasLocked()
    res.json({
        last_status,
        now_status
    })
})

router.get('/locks', (req, res) => {
    
    res.json({
        lock1: lock1.hasLocked(),
        lock2: lock2.hasLocked(),
    })
})

router.get('/lock-route', lockerGuard,  (req, res) => {
    res.json({
        msg: '你看得到這個訊息，代表lock1、lock2都還沒被上鎖'
    })
})
module.exports = router;