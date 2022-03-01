 function SuperType() {
     this.colors = ['res', 'blue', 'green'];
 }

 function SubType() {
     // 继承了SuperType
     SuperType.call(this);// 原理就执行了SuperType这个函数，而不是给其创造实例
 }

 let instance1 = new SubType();
 instance1.colors.push('black');
 console.log(instance1.colors);// [ 'res', 'blue', 'green', 'black' ]
// 这样属性就不会共享了
 let instance2 = new SubType();
 console.log(instance2.colors);// [ 'res', 'blue', 'green' ]