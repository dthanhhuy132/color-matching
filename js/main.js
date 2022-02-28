import { getRandomColorPair, countDown } from "./utils.js";

import {
  getElementList,
  getTimer,
  getStartBtn,
  getPlayAgainBtn,
  getBackground,
  getGameCover,
  getSettingDisplay,
  getIconClosingSettingDisplay,
  getInputElement,
  getSaveSettingBtn,
  getPerformance,
  getTotalTime,
  getTimerCounter,
} from "./selector.js";

let background = getBackground();
let playAgainBtn = getPlayAgainBtn();
let gameCover = getGameCover();
let cellList = getElementList();
let bestPerformance = getPerformance();
let totalTimeValue = getTotalTime();
let timerCounter = getTimerCounter();

let PAIR_COLORS = 8;
let BEST_PERFROMANCE = "--";
let GAME_TIME = 30;

let timer = getTimer();

let tempArr = [];
let pairColor = [];
let countResult = 0;

function loadInitGame() {
  let randomColor = getRandomColorPair(PAIR_COLORS);
  cellList.forEach((cell, index) => {
    cell.style.backgroundColor = randomColor[index];
    cell.dataset.color = randomColor[index];
  });

  tempArr = [];
  pairColor = [];
  countResult = 0;
}

let clearTimeoutResetTempArr;

function resetTempArr() {
  tempArr.forEach((el) => el.classList.add("overlay"));
  tempArr = [];
}

cellList.forEach((cell) => {
  cell.addEventListener("click", function (e) {
    if (e.target.nodeName === "LI") return;
    let overlayElement = e.target;

    if (tempArr.length === 2) {
      clearTimeout(clearTimeoutResetTempArr);
      resetTempArr();
    }
    overlayElement.classList.remove("overlay");
    tempArr.push(overlayElement);

    // get color code from cell element
    let parentElement = overlayElement.parentNode;
    pairColor.push(parentElement.getAttribute("data-color"));

    // condition
    if (pairColor[0] === pairColor[1]) {
      background.style.background = pairColor[0];
      pairColor = [];
      tempArr = [];
      countResult += 1;

      if (countResult === PAIR_COLORS) {
        // function get time is here
        let playTime = GAME_TIME - Number(timer.innerText.slice(0, 2));
        if (BEST_PERFROMANCE === "--" || BEST_PERFROMANCE > playTime) {
          bestPerformance.innerText = `${playTime}s`;
        }
        createTimer.clear();
      }

      if (countResult == PAIR_COLORS) {
        gameCover.classList.add("game__cover-show");
        gameCover.innerText = "Ghê quá ta";
      }
    } else {
      if (pairColor.length < 2) return;
      clearTimeoutResetTempArr = setTimeout(() => resetTempArr(), 1000);
      pairColor = [];
    }
  });
});

// ----------------SET TIMER, START, FINISH FOR THE GAME
let createTimer = countDown({
  time: GAME_TIME,
  onChange: handleTimerChange,
  onFinish: handleTimerFinish,
});

function handleTimerChange(time) {
  let fullSecond = `0${time}`.slice(-2);
  timer.innerText = `${fullSecond} s`;
}

function handleTimerFinish() {
  gameCover.classList.add("game__cover-show");
  if (countResult === PAIR_COLORS) {
    gameCover.innerText = "Ghê quá ta";
  } else gameCover.innerText = "Cố lên bạn";
}

// ----------------START THE GAME FOR THE FIRST TIME
let startBtn = getStartBtn();

window.addEventListener("load", function () {
  startBtn.addEventListener("click", () => {
    startBtnAction();
  });
});

function startBtnAction() {
  displayGameCover();
  setTimeout(() => {
    let timeReality = GAME_TIME - 1;
    resetGame(timeReality);
    hideGameCover();
    startBtn.style.display = "none";
    playAgainBtn.style.display = "block";
    hideGameCover();
  }, 1000);
}

playAgainBtn.addEventListener("click", () => {
  resetGame(GAME_TIME);
  displayGameCover();
  setTimeout(() => hideGameCover(), 1000);
});

function resetGame(GAME_TIME) {
  cellList.forEach((cell) => {
    cell.children[0].classList.add("overlay");
    gameCover.classList.remove("game__cover-show");
    createTimer.clear();
    createTimer.start(GAME_TIME);
    loadInitGame();
  });
}

function displayGameCover() {
  gameCover.innerText = "Let's Start";
  gameCover.classList.add("game__cover-show");
}
function hideGameCover() {
  gameCover.innerText = "";
  gameCover.classList.remove("game__cover-show");
}

// ----------------GAME SETTING
let settingDisplay = getSettingDisplay();
let closeSettingDisplay = getIconClosingSettingDisplay();
let inputEl = getInputElement();

settingDisplay.addEventListener("click", function (e) {
  if (
    e.target.classList.toString().includes("close") ||
    e.target.classList.toString().includes("game__setting-save")
  )
    return;
  settingDisplay.classList.add("game__setting-show");
});

closeSettingDisplay.addEventListener("click", closeSettingGame);

let settingTempValue = Number(totalTimeValue.innerText.split("s")[0]);
inputEl.addEventListener("input", function (e) {
  let inputValue = e.target.value;
  if (!isNaN(inputValue) && inputValue > 0) {
    settingTempValue = inputValue;
  }
});

let saveSettingBtn = getSaveSettingBtn();
saveSettingBtn.addEventListener("click", changeSetting);

function changeSetting() {
  if (GAME_TIME !== Number(settingTempValue) && settingTempValue > 0) {
    GAME_TIME = Number(settingTempValue);
    let newTime = `0${settingTempValue}`.slice(-2);
    totalTimeValue.innerText = `${newTime}s`;
    timerCounter.innerText = `${newTime}s`;

    cellList.forEach((cell) => {
      cell.children[0].classList.add("overlay");
      // gameCover.classList.remove("game__cover-show");
      createTimer.clear();
      // createTimer.start(GAME_TIME);
      loadInitGame();
    });

    closeSettingGame();
    inputEl.value = "";
  }
}

function closeSettingGame() {
  settingDisplay.classList.remove("game__setting-show");
}
