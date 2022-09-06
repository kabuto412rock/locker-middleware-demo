// @ts-check
class LockerPool {
    #locks = new Set();
    // 取得鎖定池的名為name的lock
    get(name) {
        return {
            hasLocked: this.#hasLocked.bind(this, name),
            setLocked: this.#setLocked.bind(this, name),
            cancelLocked: this.#cancelLocked.bind(this, name),
        };
    }

    // 判斷name是否上鎖(已上鎖=true, 未鎖=false)
    #hasLocked(name) {
        return this.#locks.has(name);
    }

    // 設定name上鎖
    #setLocked(name) {
        this.#locks.add(name);
    }

    // 取消name上鎖
    #cancelLocked(name) {
        return this.#locks.delete(name);
    }
}

const aLockerPool = new LockerPool();

module.exports = {
    lock1: aLockerPool.get('lock1'),
    lock2: aLockerPool.get('lock2')
}
