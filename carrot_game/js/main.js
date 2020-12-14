"use strict";

import PopUp from "./popup.js";
import GameBuilder, { Reason } from "./game.js";

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .withGameDuration(5)
  .withCarrotCount(3)
  .withBugCount(3)
  .build();

game.setGameStopListener(reason => {
  console.log(reason);
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "Replay❓";
      break;
    case Reason.win:
      message = "You Won 🎉";
      break;
    case Reason.lose:
      message = "You Lost 🤪";
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
