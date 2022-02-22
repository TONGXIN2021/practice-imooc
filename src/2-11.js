//父类
function Animal(name) {
    this.name = name
}

Animal.prototype.showName = function () {
    console.log("名字是：" + this.name);
}
//子类
function Dog(name, color) {
    Animal.call(this, name) //继承属性
    this.color = color
}

//继承方法
Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

let d1 = new Dog('wangcai', 'white')
console.log(d1);
d1.showName();