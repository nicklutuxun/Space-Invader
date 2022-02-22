import Game from "./model/Game.js";
import "./style.css";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let game = new Game();

game.initialize();

function play() {
  if (game.GAMEOVER == true) {
    return;
  }
  game.run();
  window.requestAnimationFrame(play);
}

play();
