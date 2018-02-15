//front build to square wars
//declare player && enemys
var xxx, enemy, enemys, bullet, bullets, boss;
enemys = [];
bullets = [];
boss = [];
life = [];
var gamePlaying;

var startGame = () => {
  document.getElementById("scores").style.display = "inline";
  document.getElementById("scores").style.visibility = "visible";
  enemys = [];
  boss = [];
  gamePlaying = true;
  myGameArea.start();
  xxx = new Player('xxx', 50, 30, 30, 50, 268, 'red');
  //enemy = new Npc('goblin', 50, 30, 30, 60, 230, 'blue');
  //bullet = new Bullet(10, 5, -2, -2, 'black');
}

var myGameArea = {
  canvas: document.createElement('canvas'),
  start: function() {
    this.canvas.width = 600;
    this.canvas.height = 320;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[2]);
    this.framNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    //key down to go
    window.addEventListener("keyup", function(e) {
      myGameArea.key = false;
    })
    window.addEventListener("keydown", function(e) {
      myGameArea.key = e.keyCode;
    })
  },
  //clear the canvas and update
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  drawFifty: function() {
    //draw line for cord-x 50 mark...Not working??
    this.context.beginPath();
    this.context.moveTo(210, 0);
    this.context.lineTo(210, 320);
    this.context.stroke();
  },
  gameOver: function() {
    this.canvas.style.display = "none";
    this.canvas.style.visibility = "hidden";
    document.getElementById("scores").style.display = "none";
    document.getElementById("scores").style.visibility = "hidden";
    document.getElementById("scoreMenu").style.display = "block";
    document.getElementById("scoreMenu").style.visibility = "visible";
    document.getElementById('yourScore').textContent = xxx.killCount;
  }
}

//function to calc framNo
var everyInterval = (n) => {
  if ((myGameArea.framNo / n) % 1 === 0) {
    return true;
  }
  return false;
}
//---------------------------------------------------------------------------------------------------------
//player constructor killcount = player kills roundcount = rounds if round > 80 round = 80
//bc enemys spawn to fast to kill. killCount will be sent to hight score
class Player {
  constructor(name, hitPoints, width, height, x, y, color, killCount, roundCount) {
    this.name = name;
    this.hitPoints = hitPoints;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.color = color;
    this.killCount = 0;
    this.roundCount = 0;
    this.life = 1;
  }
  update() {
    let ctx = myGameArea.context;
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  crashWith(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}

//npc/ enemy constructor
class Npc {
  constructor(name, hitPoints, width, height, x, y, color) {
    this.name = name;
    this.hitPoints = hitPoints;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.x = x;
    this.y = y;
    this.color = color;
  }
  update() {
    let ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  newPos() {
    this.x += this.speedX;
  }
  death() {
    this.x = undefined;
    this.y = undefined;
    this.update();
  }
  boss_death() {
    var random = Math.random() * 101;
    if(this.x < 210 && random > 80) {
      life.push(new Life(this.x, this.y, 'red', 10, 10));
    }
    this.x = undefined;
    this.y = undefined;
    this.update();
  }
}
//life class drops lives###yay.
class Life {
  constructor(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
  }
  //only shows on screen if enemys x < 210 and 20% chnace...
  update() {
    let ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Bullet {
  constructor(width, height, x, y, color, bulletFire) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.x = x;
    this.y = y;
    this.color = color;
    this.bulletFire = false;
  }
  update() {
    let ctx = myGameArea.context;
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  newPos() {
    this.x += this.speedX;
  }
  shoot() {
    if (!this.bulletFire) {
      this.bulletFire = true;
      this.x = xxx.x;
      this.y = xxx.y;
      this.speedX = +10;
    }
    if (this.x > myGameArea.canvas.width) {
      this.bulletFire = false;
    }
  }
  crashWith(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}

//----------------------------------------------------------------------------------------------------
//  GAME ENGINE CONSTANTLY RUNNING !!
//to cut down on array sizes after 10 rounds the array is pushed back to 0
var readyFire;
var round = 0;
//game area always updating every 20min sec ...
var updateGameArea = () => {
  //if gamePlaying = true
  if (gamePlaying) {
    //cut array here to decrease array size and keep game engine running fast.
    if(round % 10 == 0 && round != 0) {
      enemys = [];
    }
    //if enemys past width of gamefield stop
    for (var i = 0; i < enemys.length; i++) {
      if (enemys[i].x < 0 && enemys[i].x != undefined && enemys[i].y != undefined) {
        gamePlaying = false;
        myGameArea.gameOver();

        scoreMenu();
      }
    }
    //crash with handing... Npc
    for (var i = 0; i < enemys.length; i++) {
      for (var j = 0; j < bullets.length; j++) {
        if (bullets[j].crashWith(enemys[i]) && enemys[i].x != undefined && enemys[i].y != undefined) {
          //just testing for enemys will put to bosses...
          enemys[i].boss_death();
          // enemys[i].death();
          if (xxx.roundCount >= 80) {
            //keep round count at 80 to many enemies spawn
            xxx.roundCount = 80;
          } else {
            xxx.roundCount += 1;
          }
          xxx.killCount += 1;
          if (xxx.killCount % 10 === 0) {
            round += 1
          } else {
            round = round;
          }
        }
      }
    }
    //crash handling...Boss no points for bosses... but chance of health.
    for (var i = 0; i < bullets.length; i++) {
      for (var j = 0; j < boss.length; j++) {
        if (bullets[i].crashWith(boss[j]) && boss[j].x != undefined && boss[j].y != undefined) {
          life.push(new Life(boss[j].x, boss[j].y, 'red', 10, 10));
          boss[j].boss_death();
        }
      }
    }
    //crash handling for lives add live to player...
    for(var i = 0; i < life.length; i++) {
      if(xxx.crashWith(life[i]) && life[i].x != undefined && life[i].y != undefined) {
        xxx.life += 1;
        life[i].x = undefined;
        life[i].y = undefined;
      }
    }


    //random y generator
    var randomY = Math.floor(Math.random() * 240);
    //clear the canvas for moving pieces...
    myGameArea.clear();
    //call draw 50 for marker..
    myGameArea.drawFifty();
    //must declare player speed
    xxx.speedX = 0;
    xxx.speedY = 0;
    //game keys to move and shoot
    for (var j = 0; j < bullets.length; j++) {
      //shoot function
      if (myGameArea.key && myGameArea.key === 32) {
        readyFire = bullets[j];
        readyFire.shoot();
      }
    }
    if (myGameArea.key && myGameArea.key === 37) {
      xxx.speedX = -3;
    }
    if (myGameArea.key && myGameArea.key === 39) {
      xxx.speedX = 3;
    }
    if (myGameArea.key && myGameArea.key === 38) {
      xxx.speedY = -3;
    }
    if (myGameArea.key && myGameArea.key === 40) {
      xxx.speedY = 3
    }

    //add a gameframe
    myGameArea.framNo += 1;
    //spawn enemies
    if (myGameArea.framNo === 1 || everyInterval(120 - xxx.roundCount)) {
      enemys.push(new Npc('Goblin', 50, 30, 30, 600, randomY, 'blue'));
      //push two bullets so you always have ammo
      bullets.push(new Bullet(10, 5, -2, -2, 'black'), new Bullet(10, 5, -2, -2, 'black'), new Bullet(10, 5, -2, -2, 'black'));
      if (round % 3 == 0 && round != 0) {
        //turn killcount to string to send data to compare
        let holdData = xxx.roundCount.toString();
        holddata = holdData.split('');
        holdData = holdData.slice(0, 1);
        parseInt(holddata);
        spawnBoss(holdData)
      }

    }

    //loop threw enemys and update
    for (var i = 0; i < enemys.length; i++) {
      //if player has killCount of 100 enemys move faster
      if (xxx.killCount >= 100) {
        enemys[i].x -= 1.25;
      } else {
        enemys[i].x -= 1;
      }
      enemys[i].update();
    }
    //update player
    xxx.newPos();
    xxx.update();
    //update bullet
    for (var j = 0; j < bullets.length; j++) {
      bullets[j].newPos();
      bullets[j].update();
    }
    //update boss...
    boss.forEach((el) => {
      el.x -= 1;
      el.newPos();
      el.update();
    });
    //update life array
    life.forEach((lives) => {
      lives.update();
    })

    //show player killCount round and lives...
    document.getElementById('killCount').textContent = `Player kill-count: ${xxx.killCount}`;
    document.getElementById('roundCounter').textContent = `This Round: ${round}`;
    document.getElementById('lifeHolder').textContent = `Lives left: ${xxx.life}`;
  }
}
//-----------------------------------------------------------------------------------------------------
//spawn npc function for boss
var spawnBoss = (count) => {
  console.log(count);
  var randomY = Math.floor(Math.random() * 240);
  if (count <= round) {
    //moved enmy back 500 thats why its 600 + 500 aka 11000
    boss.push(new Npc('Boss', 50, 30, 30, (600 + 500), randomY, "green"));
    count++;
  }
}
//make home page a little more user friendly with DOM events...
document.getElementById("gameBtn").onmouseover = function() {
  document.getElementById("gl").style.display = "block";
  document.getElementById("gl").style.visibility = "visible";
}
document.getElementById("gameBtn").onmouseout = function() {
  document.getElementById("gl").style.display = "none";
  document.getElementById("gl").style.visibility = "hidden";
}

//Event listener for main menu...
document.getElementById('gameBtn').addEventListener("click", () => {
  document.getElementById('gameMenu').style.display = 'none';
  startGame();
});

//score menu
var scoreMenu = () => {
  myGameArea.canvas.display = "hidden";
  document.getElementById('scoreMenu').style.display = 'hidden';
  document.getElementById('gameMenu').style.display = "none";
};
