function SuperType() {
    this.property = true;
}

SuperType.prototype.getSuperValue = function () {
    return this.property;
};

function SubType() {
    this.subproperty = false;
}
//继承SuperType
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function () {
    return this.subproperty;
};

let instance = new SubType();// 通过instance.__proto__.__proto__可以找到getSuperValue方法

console.log(instance.getSuperValue()); //结果为true

// 表明了SubType有通过原型链和SuperType形成关系

console.log(instance.__proto__.__proto__);// 指到了SuperType的原型上 输出{ getSuperValue: [Function (anonymous)] }

console.log(instance.__proto__.__proto__.__proto__);//输出[Object: null prototype] {} 普通实例的默认原型的prototype对象是object的原型

console.log(instance.__proto__.__proto__.__proto__.__proto__); // 输出null  说明object的原型的原型是终点，为null了