const {lock1, lock2} = require("../module/loceker-pool");


const lockerGuard = function(req, res, next) {
    console.log('123')
    if(lock1.hasLocked()) {
        res.json({
            status: 'fail',
            msg: 'lock1已被上鎖'
        })
        return
    }
    if(lock2.hasLocked()) {
        res.json({
            status: 'fail',
            msg: 'lock2已被上鎖'
        })
        return
    }

    next()
}

module.exports = lockerGuard