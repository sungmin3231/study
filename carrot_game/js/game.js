import * as sound from "./sound.js";
import Field from "./field.js";

export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  cancel: "cancel",
});

// Builder Pattern
export default class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(this.gameDuration, this.carrotCount, this.bugCount);
  }
}
class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameTimer = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");
    this.gameBtn = document.querySelector(".game__button");
    this.gameBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop();
        sound.stopBackground();
      } else {
        this.start();
      }
    });

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }
  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }
  stop() {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.playAlert();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(Reason.cancel);
  }
  finish(win) {
    this.started = false;
    this.hideGameButton();
    if (win) {
      sound.playWin();
      sound.stopBackground();
    } else {
      sound.playBug();
      sound.stopBackground();
    }
    this.stopGameTimer();

    this.onGameStop && this.onGameStop(win ? Reason.win : Reason.lose);
  }

  onItemClick = item => {
    if (!this.started) {
      return;
    }
    if (item === "carrot") {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.finish(true);
      }
    } else if (item === "bug") {
      this.finish(false);
    }
  };

  showStopButton() {
    const icon = this.gameBtn.querySelector(".far");
    icon.classList.add("fa-stop-circle");
    icon.classList.remove("fa-play-circle");
    this.gameBtn.style.visibility = "visible";
  }

  hideGameButton() {
    this.gameBtn.style.visibility = "hidden";
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finish(this.carrotCount === this.score);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    this.gameField.init();
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }
}
