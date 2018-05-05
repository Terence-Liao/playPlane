/**
 * Created by 加瓦斯库瑞普特 on 2018/5/3.
 */
window.requestAnimationFrame = window.requestAnimationFrame || function(a){ return setTimeout(a,1000/60) };
window.cancelAnimationFrame = window.cancelAnimationFrame || function(a){ clearTimeout(a) };
var aBox = document.querySelector('#box'),
    aBody = document.querySelector('body'),
    ifEnd,
    toggle = true,
    enemyBoss,
    enemy,
    score = 0;


//初始化界面
var init = new Init();
function Init(){
    score = 0;
    aBox.innerHTML = '';
    //清空box内容,分数清0,游戏结束开关
    ifEnd = false;
    var title = document.createElement('h2');
    title.innerHTML = '打飞机v2.0';
    aBox.appendChild(title);
    for (var i=0;i<4;i++){
        var aP = document.createElement('p'),
            text = '';
        switch(i){
            case 0:	text='简单难度';break;
            case 1:	text='中等难度';break;
            case 2:	text='困难难度';break;
            case 3: aP.className = 'boss';text='骚年附体';break;
        };
        aP.i = i;
        aP.innerHTML = text;
        aBox.appendChild(aP);
        aP.onclick = function(){
            var selectPalne = new Selectplane(this.i);
            /*var gameStart = new Start(this.i,data);*/
        };
    }
};
//选择你的飞机
function Selectplane(index){
    aBox.innerHTML='';
    var arry=[],
        text= document.createElement('h2'),
        divs = document.createElement('div');
    text.innerHTML = '请选择你的飞机';
    text.className = 'title';
    for(var i=0;i<4;i++){
        var myPlane=document.createElement('img');
        arry.push(myPlane);
    }
    for(var i=0;i<4;i++) {
        switch (i) {
            case 0:
                arry[0].src = 'images/plane/zsPlane.png';
                arry[0].biu = 'images/biu/zhuzai.png';
                arry[0].className = 'myPlane1';
                break;
            case 1:
                arry[1].src = 'images/plane/LXPlane.png';
                arry[1].biu = 'images/biu/blue.png';
                arry[1].className = 'myPlane2';
                break;
            case 2:
                arry[2].src = 'images/plane/RedPlane.png';
                arry[2].biu = 'images/biu/orange.png';
                arry[2].className = 'myPlane3';
                break;
            case 3:
                arry[3].src = 'images/plane/GodPlane.png';
                arry[3].biu = 'images/biu/zi.png';
                arry[3].className = 'myPlane4';
                break;
        }
    }
    arry.find(item=>{
        divs.appendChild(item);
    })
    aBox.appendChild(divs);
    aBox.appendChild(text);
    arry.find(item=>{
        item.onclick = function(e){
            e = e||window.event;
            var data = {     //json存储点击难度时的鼠标坐标
                x: e.clientX,
                y: e.clientY
            };
            var startGame = new Start(index,data,this.src,this.biu)
        }
    })
};
//开始游戏
function Start(index,data,planeSrc,bluSrc){
    aBox.innerHTML = '';//清空选择界面
    //放置计分器
    var aS = document.createElement('span');
    var audio = document.createElement('audio');
    audio.src = 'images/music/game_music.mp3';
    audio.autoplay = true;
    audio.loop = true;
    audio.volume = 0.5;

    aBox.appendChild(audio)
    aBox.appendChild(aS);
    aS.innerHTML = score;
    aS.className = 'score';
    aBox.appendChild( aS );


    var myPalen = new Plane(data,planeSrc,aBox,index,bluSrc);
    myPalen.biu();

    /*enemy(index,plane(index,data),aS);*/
    enemy = new Enemy(index);
    enemy.exe();

    enemyBoss = new Boss(index,'images/plane/boss.png');
    enemyBoss.exe();
};
//生成我军
function Plane(mouse,plaeImg,aBox,index,bluSrc){
    this.aPlane = new Image();
    this.aPlane.src = plaeImg;
    this.aPlane.style.left = mouse.x-this.aPlane.width/2 + 'px';
    this.aPlane.style.top = mouse.y-this.aPlane.height/2 + 'px';
    this.aPlane.className = 'plane';
    this.index = index;
    this.speed = 266;
    this.aBox = aBox;
    this.biuSrc = bluSrc;
    aBox.appendChild(this.aPlane);
    var This = this;
    var flag = false;
    var cur = {x:0,y:0};
    var nx,ny,planeX,planeY,left_,top_,leMin,leMax,tpMin,tpMax;
    function down(){
        flag=true;
        var touch;
        if(event.touches){
            touch = event.touches[0];
        }else {
            touch = event;
        }
        cur.x = touch.clientX;
        cur.y = touch.clientY;
        planeX = This.aPlane.offsetLeft;
        planeY = This.aPlane.offsetTop;
    }
    function move(){
        if(flag){
            var touch;
            if(event.touches){
                touch = event.touches[0];
            }else {
                touch = event;
            }
            nx = touch.clientX - cur.x;
            ny = touch.clientY - cur.y;
            left_ = nx + planeX;
            top_ = ny +  planeY;

            leMin = 0;
            leMax = document.documentElement.clientWidth - (This.aPlane.width);
            tpMin = 0;
            tpMax = document.documentElement.clientHeight - (This.aPlane.height);

            //限制飞机的left,top值
            left_ = Math.min(left_,leMax);
            left_ = Math.max(leMin,left_);
            top_ = Math.min(tpMax,top_);
            top_ = Math.max(top_,tpMin);

            This.aPlane.style.left  = left_ + 'px';
            This.aPlane.style.top = top_ +'px';

        }
    }
    function end(){
        flag = false;
    }
    var aPlane = document.querySelector('.plane');
    aPlane.addEventListener('mousedown',function(){
        down();
    },false)
    aPlane.addEventListener('touchstart',function(){
        down();
    },false)
    aPlane.addEventListener('touchmove',function(){
        move();
    },false)
    aPlane.addEventListener('mousesmove',function(){
        move();
    },false)
    aPlane.addEventListener('mousesup',function(){
        end();
    },false)
    aPlane.addEventListener('touchend',function(){
        end();
    },false)

    stop();
    var mo=function(e){e.preventDefault();};
    function stop(){
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);//禁止页面滑动
    }

}
Plane.prototype = {
    biu: function(){
        this.biuSpeed();
        this.biuSport();
        this.biuUpdate();
    },
    biuSpeed: function(){
        switch(this.index){
            case 0: this.speed = 250;break;
            case 1: this.speed = 200;break;
            case 2: this.speed = 150;break;
            case 3: this.speed = 100;break;
        }
    },
    biuSport: function(){
        var This = this;
        this.aPlane.timer = setInterval(timer(),this.speed);
        function timer(){
            var aBiu = new Image();
            var biuAudio = document.createElement('audio');
            biuAudio.src = 'images/music/bullet.mp3';
            biuAudio.volume = .5;
            biuAudio.autoplay = true;
            aBiu.src = This.biuSrc;
            aBiu.className = 'bullet';
            aBiu.style.left = This.aPlane.offsetLeft + This.aPlane.width/2 - aBiu.width/2 + 'px';
            aBiu.style.top = This.aPlane.offsetTop - aBiu.height + 'px';
            This.aBox.appendChild(aBiu);
            This.aBox.appendChild(biuAudio);
            move();
            function move(){
                if(!ifEnd){
                    if( aBiu.offsetTop <= -aBiu.height ){
                        This.aBox.removeChild(aBiu);
                        This.aBox.removeChild(biuAudio);
                        return;
                    }
                    aBiu.timer = requestAnimationFrame(move);
                    aBiu.style.top = aBiu.offsetTop -5 + 'px';
                }
            };
            return timer;
        };

    },
    biuUpdate: function(){
        var This = this;
        this.aPlane.timer1 = setInterval(function(){
            timer1(100,1)
        },this.speed);
        this.aPlane.timer2 = setInterval(function(){
            timer1(200,-1)
        },this.speed);
        function timer1(fraction,_deviation){
            if(score>=fraction){
                var aBiu1 = new Image();
                aBiu1.src = This.biuSrc;
                aBiu1.className = 'bullet';
                aBiu1.style.left = This.aPlane.offsetLeft + This.aPlane.width/2 - aBiu1.width/2+aBiu1.width*_deviation + 'px';
                aBiu1.style.top = This.aPlane.offsetTop - aBiu1.height + 'px';
                This.aBox.appendChild(aBiu1);
                move1();
                function move1(){
                    if(!ifEnd){
                        if( aBiu1.offsetTop <= -aBiu1.height ){
                            This.aBox.removeChild(aBiu1);
                            return;
                        }
                        aBiu1.timer = requestAnimationFrame(move1);
                        aBiu1.style.top = aBiu1.offsetTop -5 + 'px';
                    }
                };

            }
            return timer1;
        };
    }
};
//生成敌军
function Enemy(index) {
    this.speed = 0;
    this.moveS = 5;
    this.index = index;
    this.S = 0;
}
//敌军的方法
Enemy.prototype = {
    exe: function(){
        this.landSpeed();
        this.bornEnemy();
    },
    //敌军下落速度
    landSpeed: function(){
        switch(this.index){
            case 0: this.speed = 200;this.moveS= 3.7;break;
            case 1: this.speed = 300;this.moveS = 4.6;break;
            case 2: this.speed = 400;this.moveS = 5.5;break;
            case 3: this.speed = 500;this.moveS = 6.5;break;
        }
    },
    //生成敌军
    bornEnemy: function(){
        var This = this;
        this.timer = setInterval( timer(),this.speed );
        function timer(){
            var aEnemy = new Image();
            aEnemy.src = 'images/enemy/enemy1.png';
            aEnemy.className = 'enemy';
            aEnemy.style.left = Math.random() * document.documentElement.clientWidth - aEnemy.width/2 + 'px';
            /*
             [0,1);
             [0,aBox.clientWidth)=>[-aEnemy.width/2 + 'px',aBox.clientWidth - aEnemy.width/2 + 'px'];
             */
            aEnemy.style.top = -aEnemy.height + 'px';
            aBox.appendChild(aEnemy);
            land();
            This.S = This.moveS + Math.random()*2;
            function land(){
                if( !ifEnd ){
                    if ( aEnemy.offsetTop >= document.documentElement.clientHeight ){
                        aBox.removeChild(aEnemy);
                        return;
                    }
                    aEnemy.style.top = aEnemy.offsetTop + This.S + 'px';
                    aEnemy.timer = requestAnimationFrame( land );
                    This.enemyTest(aEnemy);
                    /*testing( aEnemy,aPlane,timers,aS );*/
                }
            };
            return timer;
        };
    },
    //检测方法,检测传进来的东东是否碰撞
    collision: function (obj,obj_){
        var T1 = obj.offsetTop,
            B1 = T1 + obj.clientHeight,
            L1 = obj.offsetLeft,
            R1 = obj.offsetLeft + obj.clientWidth;

        var T2 = obj_.offsetTop,
            B2 = T2 + obj_.clientHeight,
            L2 = obj_.offsetLeft,
            R2 = obj_.offsetLeft + obj_.clientWidth;
        //除了没撞上的情况，其他都是撞上的。
        return !( B1<T2 || R1<L2 || R2<L1 || B2<T1 );
    },
    //每个敌军自带的碰撞检测
    enemyTest: function(aEnemy){
        this.emenyAndplane(aEnemy);
        this.biuAndemeny(aEnemy);
    },
    //敌军和我军飞机的碰撞检测
    emenyAndplane: function (aEnemy) {
        var aPlane = aBox.querySelector('.plane');
        if ( aPlane && aPlane.parentNode && this.collision( aEnemy,aPlane  ) ){
            clearInterval( aPlane.timer1 );//取消子弹的生产
            clearInterval( aPlane.timer2 );//取消子弹的生产
            clearInterval( aPlane.timer );//取消子弹的生产
            clearInterval( this.timer );//取消敌军的生产
            clearInterval(enemyBoss.stopBoss());//取消敌军boss的生产
            var biuAudio = document.createElement('audio');
            biuAudio.src = 'images/music/game_over.mp3';
            biuAudio.volume = .5;
            biuAudio.autoplay = true;
            aBox.appendChild(biuAudio);
            var boom = new Image();
            boom.src = 'images/biu/boom_big.png';
            boom.className = 'Boom';
            boom.style.left = aEnemy.offsetLeft + 'px';
            boom.style.top = aEnemy.offsetTop + 'px';
            var This = this;
            setTimeout(function(){
                aBox.removeChild( boom );
                ifEnd = true;
                This.gameOver();
            },500);

            aBox.appendChild( boom );
            aBox.removeChild( aEnemy );
            aBox.removeChild( aPlane );
        }
    },
    //取消敌军的生产
    stopEnemy(){
        clearInterval(this.timer);
    },
    //敌军和子弹的碰撞检测
    biuAndemeny: function(aEnemy){
        var allBiu = aBox.querySelectorAll('.bullet');
        for ( var i=0,length=allBiu.length;i<length;i++ ){
            //如果撞上了&&为了避免别的敌军在检测时子弹有没有清除
            if( this.collision( aEnemy,allBiu[i] ) && allBiu[i].parentNode ){
                cancelAnimationFrame( allBiu[i].timer );
                cancelAnimationFrame( aEnemy.timer );
                var biuAudio = document.createElement('audio');
                biuAudio.src = 'images/music/game_over.mp3';
                biuAudio.volume = .5;
                biuAudio.autoplay = true;
                var boom = new Image();
                boom.src = 'images/biu/boom_big.png';
                boom.width = 23;
                boom.height = 30;
                boom.className = 'Boom';
                boom.style.left = aEnemy.offsetLeft + 'px';
                boom.style.top = aEnemy.offsetTop + 'px';
                aBox.appendChild( boom );
                aBox.appendChild(biuAudio);
                setTimeout(function(){
                    boom.parentNode && aBox.removeChild( boom );
                },500);
                aBox.removeChild( allBiu[i] );
                aBox.removeChild( aEnemy );
                score += 10;
                var aS = aBox.querySelector('span.score');
                aS.innerHTML = score;
            }
        }
    },
    gameOver:function(){
        aBox.innerHTML = '';//清空界面
        var aDiv = document.createElement('div');
        aSpa = document.createElement('span');
        aH = document.createElement('h2');
        aP = document.createElement('p');
        aP.className='df';
        aSpa.className = 'restart';
        aH.innerHTML = 'Game Over';
        aSpa.innerHTML = '重新开始';
        aP.innerHTML = '您的得分是<span>&nbsp'+score+'</span>';
        aDiv.className = 'gameover';
        aH.className = 'animated rubberBand';
        aDiv.appendChild(aH);
        aDiv.appendChild(aP);
        aDiv.appendChild(aSpa);
        aBox.appendChild(aDiv);
        var restart = document.querySelector('span.restart');
        restart.onclick = function(){
            Init();
        };

    }
}

//继承敌军顺便搞个boss
function Fn(){};
Fn.prototype = Enemy.prototype;
Boss.prototype = new Fn();

//boss的方法
function Boss(index,Bosrc){
    Enemy.call(this,index);
    this.sRc = Bosrc;
    this.timersBB;
    this.blood = 0;
};
Boss.prototype={
    exe:function(){
        this.bornBoss();
        this.bossBlood();
        this.bossShow();
    },
    bornBoss(){
        var This = this;
        this.timerBs = setInterval(timerB(),5000);
        function timerB(){
            if(score >= This.bShow){
                var bigBoss = document.createElement('div');
                var blood = document.createElement('div');
                var enemyBoss = new Image();
                bigBoss.className = 'bigBoss';
                blood.className = 'blood';
                enemyBoss.src =	This.sRc;
                enemyBoss.className	='enemyBoss';
                bigBoss.style.left =  Math.random() * document.documentElement.clientWidth-enemyBoss.width/2+'px';
                bigBoss.style.top = -enemyBoss.height-180+'px';
                bigBoss.biuAmount = 0;
                bigBoss.appendChild(enemyBoss);
                bigBoss.appendChild(blood);
                aBox.appendChild(bigBoss);
                land();
                function land(){
                    if( !ifEnd ){
                        if ( bigBoss.offsetTop >= document.documentElement.clientHeight ){
                            aBox.removeChild(bigBoss);
                            return;
                        }
                        bigBoss.style.top = bigBoss.offsetTop + 1 + 'px';
                        bigBoss.timer = requestAnimationFrame( land );
                        This.enemyTest(bigBoss,blood);
                        /*testing( aEnemy,aPlane,timers,aS );*/
                    }
                };
            }
            return timerB;
        }
    },
    bossBlood(){
        switch (this.index){
            case 0:	this.blood = 30;break;
            case 1:	this.blood = 60;break;
            case 2:	this.blood = 90;break;
            case 3:   this.blood = 120;break;
        }
    },
    bossShow(){
        switch (this.index){
            case 0:	this.bShow = 100;break;
            case 1:	this.bShow = 150;break;
            case 2:	this.bShow = 200;break;
            case 3:  this.bShow = 250;break;
        }
    },
    stopBoss(){
        clearInterval(this.timerBs);
    },
    enemyTest(bigBoss,blood){
        this.biuAndemenyB(bigBoss,blood);
        this.emenyAndplane(bigBoss,blood);
    },
    biuAndemenyB(bigBoss,blood){
        var This = this;
        var allBius = aBox.querySelectorAll('.bullet');
        for ( var i=0,length=allBius.length;i<length;i++ ){
            //如果撞上了&&为了避免别的敌军在检测时子弹有没有清除
            if( this.collision( bigBoss,allBius[i] ) && allBius[i].parentNode ){
                bigBoss.biuAmount++;
                blood.style.width = (1-(bigBoss.biuAmount/this.blood).toFixed(2)) * 100 +'%';
                aBox.removeChild(allBius[i]);
                cancelAnimationFrame( allBius[i].timer );
                if(bigBoss.biuAmount == this.blood){
                    cancelAnimationFrame( bigBoss.timer );
                    var biuAudio = document.createElement('audio');
                    biuAudio.src = 'images/music/game_over.mp3';
                    biuAudio.volume = .5;
                    biuAudio.autoplay = true;
                    var boom = new Image();
                    boom.src = 'images/biu/boom_big.png';
                    boom.className = 'bossBoom';
                    boom.style.left = bigBoss.offsetLeft + 'px';
                    boom.style.top = bigBoss.offsetTop + 'px';
                    aBox.appendChild( boom );
                    aBox.appendChild(biuAudio);
                    setTimeout(function(){
                        boom.parentNode && aBox.removeChild( boom );
                    },500);
                    aBox.removeChild(bigBoss);
                    score += 50;
                    var aS = aBox.querySelector('span.score');
                    aS.innerHTML = score;
                }
            }
        }
    },
    collision(obj,obj_){
        var T1 = obj.offsetTop,
            B1 = T1 + obj.clientHeight,
            L1 = obj.offsetLeft,
            R1 = obj.offsetLeft + obj.clientWidth;

        var T2 = obj_.offsetTop,
            B2 = T2 + obj_.clientHeight,
            L2 = obj_.offsetLeft,
            R2 = obj_.offsetLeft + obj_.clientWidth;
        //除了没撞上的情况，其他都是撞上的。
        return !( B1<T2 || R1<L2 || R2<L1 || B2<T1 );
    },
    emenyAndplane(enemyBoss) {
        var aPlane = aBox.querySelector('.plane');
        if ( aPlane && aPlane.parentNode && this.collision( enemyBoss,aPlane  )){
            clearInterval( aPlane.timer1 );//取消子弹的生产
            clearInterval( aPlane.timer2 );
            clearInterval( aPlane.timer );
            clearInterval( enemy.stopEnemy() );
            clearInterval(this.timerBs);
            var boom = new Image();
            boom.src = 'images/biu/boom_big.png';
            boom.className = 'bossBoom';
            boom.style.left = enemyBoss.offsetLeft + 'px';
            boom.style.top = enemyBoss.offsetTop + 'px';
            var biuAudio = document.createElement('audio');
            biuAudio.src = 'images/music/enemy3_down.mp3';
            biuAudio.volume = 1;
            biuAudio.autoplay = true;
            var This = this;
            setTimeout(function(){
                aBox.removeChild( boom );
                ifEnd = true;
                This.gameOver();
            },1000);
            aBox.appendChild(biuAudio);
            aBox.appendChild( boom );
            aBox.removeChild( enemyBoss );
            aBox.removeChild( aPlane );
        }
    },
    gameOver(){
        aBox.innerHTML = '';//清空界面
        var aDiv = document.createElement('div');
        aSpa = document.createElement('span');
        aH = document.createElement('h2');
        aP = document.createElement('p');
        aSpa.className = 'restart';
        aH.innerHTML = 'Game Over';
        aSpa.innerHTML = '重新开始';
        aP.innerHTML = '您的得分是<span>&nbsp'+score+'</span>';
        aDiv.className = 'gameover';
        aH.className = 'animated rubberBand';
        aDiv.appendChild(aH);
        aDiv.appendChild(aP);
        aDiv.appendChild(aSpa);
        aBox.appendChild(aDiv);
        var restart = document.querySelector('span.restart');
        restart.onclick = function() {
            Init();
        }
    }
}
