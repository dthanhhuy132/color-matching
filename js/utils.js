export const getRandomColorPair = (count) => {
  let colorList = [];
  let hueList = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
    "monochrome",
  ];

  for (let i = 0; i < count; i++) {
    //global randomColor function is provided by randomColor
    let color = randomColor({
      luminository: "dark",
      hue: hueList[i % hueList.length], // to make sure i not exceed HueList if count.lenght > hueList.length
    });

    colorList.push(color);
  }

  let fullColorList = [...colorList, ...colorList];
  shuffleColor(fullColorList);
  return fullColorList;
};

function shuffleColor(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);

    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

export const countDown = ({ time, onChange, onFinish }) => {
  let intervalID = null;

  function start(time) {
    console.log("time trong ultil: ", time);
    let currentTime = time;
    intervalID = setInterval(() => {
      onChange?.(currentTime);
      currentTime--;

      if (currentTime < 0) {
        clear();
        onFinish?.();
      }
    }, 1000);
  }

  function clear() {
    clearInterval(intervalID);
  }

  return {
    start,
    clear,
  };
};
