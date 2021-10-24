export function getElementList() {
  return document.querySelectorAll(".game__board li");
}

export function getTimer() {
  return document.querySelector(".game__timer");
}

export function getStartBtn() {
  return document.querySelector(".btn-start");
}

export function getPlayAgainBtn() {
  return document.querySelector(".btn-play-again");
}

export function getBackground() {
  return document.querySelector(".background");
}

export function getGameCover() {
  return document.querySelector(".game__cover");
}

export function getSettingDisplay() {
  return document.querySelector(".game__setting");
}

export function getIconClosingSettingDisplay() {
  return document.querySelector(".close");
}

export function getInputElement() {
  return document.querySelector("input");
}

export function getSaveSettingBtn() {
  return document.querySelector(".game__setting-save");
}

export function getPerformance() {
  return document.querySelector(".display__aware h5");
}

export function getTotalTime() {
  return document.querySelector(".display__timer h5");
}
