const ctx = document.getElementById("myChart");
const characterData = JSON.parse(localStorage.getItem("characters"));
const characterEyeColor = characterData.map((color) => color.eye_color);
const sortedEyeColor = characterEyeColor.sort();
const allEyecolors = [];
const eyeColorCount = [];

characterEyeColor.forEach((eyeColor) => {
  console.log(eyeColor);
  if (!allEyecolors.includes(eyeColor)) {
    allEyecolors.push(eyeColor);
  }
});

const resultArr = sortedEyeColor.reduce(
  (item, index) => {
    if (typeof item.last === "undefined" || item.last !== index) {
      item.last = index;
      item.sortedEyeColor.push([]);
    }
    item.sortedEyeColor[item.sortedEyeColor.length - 1].push(index);
    return item;
  },
  { sortedEyeColor: [] }
).sortedEyeColor;

const colorLength = [];

resultArr.forEach((number) => {
  colorLength.push(number.length);
});

const cfg = {
  type: "pie",
  data: {
    labels: allEyecolors,
    datasets: [
      {
        label: "Total",
        data: colorLength,
        borderWidth: 1,
        backgroundColor: [
          "rgb(0, 0, 0)",
          "rgb(16, 2, 243)",
          "rgb(78, 106, 145)",
          "rgb(133, 59, 0)",
          "rgb(215, 196, 9)",
          "rgb(123, 133, 0)",
          "rgb(133, 90, 0)",
          "rgb(254, 105, 0)",
          "rgb(255, 82, 246)",
          "rgb(208, 30, 30)",
          "rgb(88, 41, 137)",
          "rgba(108, 83, 134, 0,83)",
          "rgb(255, 255, 255)",
          "rgb(233, 215, 7)",
        ],
      },
    ],
  },
};

new Chart(ctx, cfg);
