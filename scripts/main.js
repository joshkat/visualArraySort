const arrayBox = document.getElementById("arrayContainer");
const sortBtn = document.getElementById("startAlgo");
const resetBtn = document.getElementById("reset");
const bubbleBtn = document.getElementById("bubbleSort");
const selectionBtn = document.getElementById("selectionSort");
const mergeBtn = document.getElementById("mergeSort");
const heapBtn = document.getElementById("heapSort");
const quickBtn = document.getElementById("quickSort");
const radixBtn = document.getElementById("radixSort");
const algoButtons = [
  bubbleBtn,
  selectionBtn,
  mergeBtn,
  heapBtn,
  quickBtn,
  radixBtn,
];

var currentAlgo = "bubbleSort"; //default algo
var currentlySorting = false;

//create random array
var randomArray = [];
function initArray(arr) {
  //using func so i can have reset btn later on
  for (i = 0; i < 20; i++) {
    arr[i] = Math.floor(Math.random() * 500) + 1; //randomnum 1-200
  }
}
initArray(randomArray);

//create bars representing array & append to arrayBox
function createBoxes(arr) {
  for (i = 0; i < arr.length; i++) {
    var bar = document.createElement("div");
    var num = document.createElement("div");
    bar.style.height = arr[i] + "px";
    bar.classList.add("bar");
    num.innerText = arr[i];
    num.classList.add("number");
    arrayBox.appendChild(bar);
    bar.appendChild(num);
  }
}
createBoxes(randomArray);

//header control btns

//func to adjust color of selected button
function currentButton(clickedBtn, arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].classList.remove("currentAlgo");
    arr[i].classList.add("controlButton");
  }
  clickedBtn.classList.remove("controlButton");
  clickedBtn.classList.add("currentAlgo");
}

bubbleBtn.addEventListener("click", () => {
  currentAlgo = "bubbleSort";
  currentButton(bubbleBtn, algoButtons);
});

selectionBtn.addEventListener("click", () => {
  currentAlgo = "selectionSort";
  currentButton(selectionBtn, algoButtons);
});

mergeBtn.addEventListener("click", () => {
  currentAlgo = "mergeSort";
  currentButton(mergeBtn, algoButtons);
});

heapBtn.addEventListener("click", () => {
  currentAlgo = "heapSort";
  currentButton(heapBtn, algoButtons);
});

quickBtn.addEventListener("click", () => {
  currentAlgo = "quickSort";
  currentButton(quickBtn, algoButtons);
});

radixBtn.addEventListener("click", () => {
  currentAlgo = "radixSort";
  currentButton(radixBtn, algoButtons);
});

sortBtn.addEventListener("click", () => {
  currentlySorting = true;
  resetBtn.classList.add("redButton");
  resetBtn.classList.remove("controlButton");
  preformCurrentAlgo(currentAlgo);
});

resetBtn.addEventListener("click", () => {
  if (currentlySorting == false) {
    clearBoard(arrayBox);
    initArray(randomArray);
    createBoxes(randomArray);
  }
});
