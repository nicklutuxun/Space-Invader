import Missile from "./Missile.js";
import Tank from "./Tank.js";
import Invader from "./Invader.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

class Game {
  constructor() {
    this.continue = false;
    this.GAMEOVER = false;
    this.tank = new Tank(
      canvas.width / 2 - 25,
      canvas.height - 60,
      50,
      50,
      "./assets/tank.png"
    );

    this.missileNum = 0;
    this.missiles = [];
    this.destroyInvaderNum = 0;
    this.invaders = [];
    this.fireSound = new Audio("./assets/shoot.wav");
    this.explosionSound = new Audio("./assets/explosion.wav");
    this.bgm = new Audio("./assets/music.mpeg");
    document.addEventListener("keydown", this.keyDownHandler.bind(this));
  }

  keyDownHandler(e) {
    if (this.continue) {
      if ((e.code == "Space" && this.missiles.length < 10)) {
        let missile = new Missile(
          this.tank.x + this.tank.width / 2 - 5,
          this.tank.y,
          10,
          20,
          "./assets/missile.png"
        );
        this.fireSound.play();
        this.fireSound.currentTime = 0;
        this.missiles.push(missile);
        this.missileNum++;
        return;
      }
    }

    if (e.code == "Right" || e.code == "ArrowRight" || e.code == "Left" || e.code == "ArrowLeft") {
      if (this.GAMEOVER == false) {
        this.continue = true;
        this.bgm.loop = true;
        this.bgm.play();
      }
    }
  }

  initialize() {
    this.canvasText();
  }

  run() {
    ctx.clearRect(0, 0, canvas.width, canvas.height),
      this.canvasText();
    this.tank.draw(ctx);
    if (this.continue == true) {
      this.tank.move(canvas.width);
      this.addInvader();

      if (this.missiles.length != 0) {
        for (let i = 0; i < this.missiles.length; i++) {
          this.missiles[i].draw(ctx);
          this.missiles[i].move();
        }
        this.checkMissileBound();
      }

      if (this.invaders.length != 0) {
        for (let i = 0; i < this.invaders.length; i++) {
          this.invaders[i].draw(ctx);
          this.invaders[i].move();
        }
        this.checkInvaderBound();
      }
      this.jiggleInvaders();

      this.checkInvaderMissileCollide();
      this.checkInvaderTankCollide();
    }
  }

  rand(num) {
    return Math.floor(Math.random() * num);
  }

  addInvader() {
    if (this.rand(200) < 1) {
      let invader = new Invader(
        Math.max(5, this.rand(canvas.width - 40)),
        40,
        40,
        "./assets/invader.png",
        this.rand(3) + 1
      );
      this.invaders.push(invader);
    }
  }

  jiggleInvaders() {
    if (this.invaders.length == 0) {
      return;
    }
    for (let i = 0; i < this.invaders.length; i++) {
      this.invaders[i].jiggle();
      if (this.invaders[i].x <= 0) {
        this.invaders[i].dx = Math.abs(this.invaders[i].dx);
      } else if (this.invaders[i].x >= canvas.width - 40) {
        this.invaders[i].dx = -Math.abs(this.invaders[i].dx);
      }
    }
  }

  checkMissileBound() {
    if (this.missiles.length == 0) {
      return;
    }
    for (let i = 0; i < this.missiles.length; i++) {
      if (this.missiles[i].y <= 0) {
        this.missiles.splice(i, 1);
        this.missileNum--;
      }
    }
  }

  checkInvaderBound() {
    if (this.invaders.length == 0) {
      return;
    }
    for (let i = 0; i < this.invaders.length; i++) {
      if (this.invaders[i].y >= canvas.height) {
        this.gameover();
      }
    }
  }

  checkInvaderTankCollide() {
    if (this.invaders.length == 0) {
      return;
    }
    for (let i = 0; i < this.invaders.length; i++) {
      if (this.invaders[i].collide(this.tank)) {
        this.explosionSound.play();
        this.explosionSound.currentTime = 0;
        this.gameover();
      }
    }
  }

  checkInvaderMissileCollide() {
    if (this.missiles.length == 0 || this.invaders.length == 0) {
      return;
    }
    for (let i = 0; i < this.missiles.length; i++) {
      for (let j = 0; j < this.invaders.length; j++) {
        if (this.missiles[i].collide(this.invaders[j])) {
          this.missiles.splice(i, 1);
          this.missileNum--;
          this.invaders.splice(j, 1);
          this.invaderNum--;
          this.destroyInvaderNum++;
          this.explosionSound.play();
          this.explosionSound.currentTime = 0;
          return;
        }
      }
    }
  }

  canvasText() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Invaders shot down: " + this.destroyInvaderNum, 8, 20);
    ctx.fillText("Invaders on screen: " + this.invaders.length, 8, 40);
    ctx.fillText("Missiles on screen: " + this.missiles.length, 8, 60);
    ctx.fillText("Missiles remaining: " + (10 - this.missileNum), 8, 80);
    if (!this.continue) {
      ctx.font = "30px Arial";
      ctx.fillText("Press \u21E6 or \u21E8 to start", canvas.width / 2 - 135, canvas.height / 2);
    }
  }

  gameover() {
    ctx.clearRect(0, 0, canvas.width, canvas.height),
      ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("GAMEOVER!", 8, 20);
    ctx.fillText("Invaders shot down: " + this.destroyInvaderNum, 8, 40);
    this.bgm.pause();
    this.bgm.currentTime = 0;

    this.tank.x = canvas.width / 2 - 25;
    this.tank.draw(ctx);

    this.GAMEOVER = true;
    this.continue = false;
  }
}

export default Game;