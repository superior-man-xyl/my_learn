// 关于weakMap如何实现私有变量
const wm = new WeakMap();

class User {
    constructor(id) {
        this.idProperty = Symbol('id');
        this.setId(id);
    }
    setPrivate(property, value) {
        const privateMembers = wm.get(this) || {};
        privateMembers[property] = value;
        wm.set(this, privateMembers);
    }
    getPrivate(property) {
        return wm.get(this)[property];
    }
    setId(id) {
        this.setPrivate(this.idProperty, id);
    }
    getId() {
        return this.getPrivate(this.idProperty);
    }
}

// 测试功能
const user = new User(123);
console.log(user.getId()); //123
user.setId(456);
console.log(user.getId()); //456

//待优化问题，即 其不是真正私有的
//现象，外部代码只需要获得对象实例的引用user.idProperty和弱映射，就能获得私有变量
console.log(wm.get(user)[user.idProperty]); //456