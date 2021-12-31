// 改进版 使用闭包把weakMap包装起来，就可以把弱映射与外界隔离开来
const User=(()=>{
    const wm=new WeakMap();
    class User {
        constructor(id){
            this.idProperty=Symbol('id');
            this.setId(id);
        }
        setPrivate(property,value){
            const privateMembers=wm.get(this)||{};
            privateMembers[property]=value;
            wm.set(this,privateMembers);
        }
        getPrivate(property){
            return wm.get(this)[property];
        }
        setId(id){
            this.setPrivate(this.idProperty,id);
        }
        getId(){
            return this.getPrivate(this.idProperty);
        }
    }
    return User;
})();

//测试
const user = new User(123);
console.log(user.getId()); //123
user.setId(456);
console.log(user.getId()); //456

console.log(wm.get(user)[user.idProperty]);//报错  wm is not defined