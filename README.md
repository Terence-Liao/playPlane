## 总结:pencil2:

一直觉得javascript里的面向对象编程是一个难点:relaxed:，所以特作写此项目来巩固一下自己这方面的知识。
个人觉得面向对象编程主要难在对原型的理解还有原型链，继承还有构造函数等等，只要逐个将这些知识点理解领悟，面向对象编程这个
就轻易上手了:muscle:!

### 注意

此项目刚开始会点显示慢卡！需要缓存！强烈建议使用chrome、fireFox、UC等浏览器运行
由于vw、vh等暂时不是兼容ios7,8,9的Safari的浏览器，所以不显示！拒绝IE从我做起:muscle:!


### 效果演示
:point_right: [在线预览](https://junephone.github.io/playPlane/index.html "飞机大战")<br>

![](https://github.com/junephone/playPlane/blob/master/images/moblie.png)<br>
![](https://github.com/junephone/playPlane/blob/master/images/pc.png)<br>



### 对于各方面知识点的理解:pushpin:

* 构造函数

 function Person(name,age){
   this.name = name;
   this.age = age;
 }
 ___
 这就是构造函数其中的一种写法也是比较方便(首字母必须大写)！this 是指向Person这个对象的。属性都存这个Person里


* 原型
个人理解就是构造函数才有原型这个概念的,也就是prototype,
一般写面向对象编程的时候公有的属性和方法都写在原型里(要继承)。而私有的就写在构造函数里。。


* 原型链

当我们var p = new Person(); function Person()时，这是在实例化一个构造函数，这样变量p 就可以访问Person里的方法和属性比如p.showName。
这之中是通过一个_proto_这个鬼东东访问的，(p的构造函数就是Person) ,下面来了怎么访问到showName这个方法的呢？就是先从Person(自身)里找！如果没有的再从prototype里找！
如果原型里也找不到！那就从原型(Person.prototype所对应的构造函数的原型)里找！ Person.prototype也是对象哦！有对象就有所对应的构造函数有构造函数就有原型..

var p = new Person(实例化构造函数)=>Person.prtotype(原型)(对象)=>构造函数=>原型=>构造函数=>....object(老大)=>object.prototype这就是所谓的原型链


* 继承

所谓的继承就是
儿子继承爸爸,儿子拥有爸爸所有的东西
而儿子能新增属性和方法！儿子的改变是不能影响爸爸的(很现实吧O(∩_∩)O！)
一种是用clone方式这个不推荐使用比较麻烦。
还有一种就是运用一个中介函数Fn，新建一个函数把爸爸的prototype引用给中介Fn的prtotype再通过实例化给需要继承的函数
__

function Person(name,age){
    this.name = name;
    this.age = age;
}
function Fn(){}
Fn.prototype = Person.prototype;
PersonChild.prototype = new Fn();

function PersonChild(name,age,sex){
    Person.call(this,name,age) 改变this的指向！让PerSonchild可以调用Person的方法...
    this.sex = sex; 新增的私有属性
}
___

这样就互不影响了不信的可以去实践下,这是通过函数中介的原型引用了爸爸的原型，儿子的原型再实例化函数Fn 这样儿子就拥有爸爸所有的东西了
就像通过合同书继承资产一样。。几千万一张纸的事情啊！:flushed:

### 喜欢的话欢迎star和fork哦后续会出很多小项目:wink:!!
![](https://github.com/junephone/playPlane/blob/master/images/star.jpg)<br>




