let sleepSpeed = 100; //by default @ 100
const input = document.getElementById("speed");

input.addEventListener("input", () => {
  sleepSpeed = parseInt(input.value);
});

async function bubbleSort(array) {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      // Indices of the elements being compared
      const comparisons = [i, i + 1];

      if (array[i] > array[i + 1]) {
        // Indices of the elements being swapped
        const swaps = [i, i + 1];

        // Swap the elements
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;

        // Update the display to reflect the change
        updateDisplay(array, comparisons, swaps);
        await sleep(sleepSpeed); // Sleep for 100 milliseconds
      } else {
        // Update the display to reflect the comparison
        updateDisplay(array, comparisons, []);
        await sleep(sleepSpeed); // Sleep for 100 milliseconds
      }
    }
  } while (swapped);

  // Reset the colors of the elements
  updateDisplay(array, [], []);
  resetBtn.classList.remove("redButton");
  resetBtn.classList.add("controlButton");
  currentlySorting = false;
}

async function selectionSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      // Indices of the elements being compared
      const comparisons = [j, minIndex];

      if (array[j] < array[minIndex]) {
        minIndex = j;
      } else {
        // Update the display to reflect the comparison
        updateDisplay(array, comparisons, []);
        await sleep(sleepSpeed); // Sleep for 100 milliseconds
      }
    }

    // Indices of the elements being swapped
    const swaps = [i, minIndex];

    // Swap the elements
    [array[i], array[minIndex]] = [array[minIndex], array[i]];

    // Update the display to reflect the change
    updateDisplay(array, [], swaps);
    await sleep(sleepSpeed); // Sleep for 100 milliseconds
  }

  // Reset the colors of the elements
  updateDisplay(array, [], []);
  resetBtn.classList.remove("redButton");
  resetBtn.classList.add("controlButton");
  currentlySorting = false;
}

async function merge(left, right, offset = 0) {
  const sorted = [];

  while (left.length > 0 && right.length > 0) {
    // Indices of the elements being compared in the original array
    const comparisons = [
      offset + sorted.length,
      offset + sorted.length + left.length,
    ];

    let swaps;
    if (left[0] < right[0]) {
      sorted.push(left.shift());
      swaps = [comparisons[1], comparisons[1] - 1];
    } else {
      sorted.push(right.shift());
      swaps = [comparisons[0], comparisons[0] + left.length];
    }

    // Update the display to reflect the change
    updateDisplay(sorted.concat(left, right), comparisons, swaps);
    await sleep(sleepSpeed); // Delay for 100 milliseconds
  }

  resetBtn.classList.remove("redButton");
  resetBtn.classList.add("controlButton");
  currentlySorting = false;
  return sorted.concat(left, right);
}

async function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  const sorted = merge(await mergeSort(left), await mergeSort(right), 0);

  // Reset the colors of the elements
  updateDisplay(sorted, [], []);

  return sorted;
}

async function heapSort(array) {
  const n = array.length;

  // Build a max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(array, n, i);
  }

  // Extract elements from the heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Indices of the elements being swapped
    const swaps = [0, i];

    // Swap the root element with the last element
    [array[0], array[i]] = [array[i], array[0]];

    // Update the display to reflect the change
    updateDisplay(array, [], swaps);
    await sleep(sleepSpeed); // Delay for 100 milliseconds

    // Heapify the reduced heap
    await heapify(array, i, 0);
  }

  // Reset the colors of the elements
  updateDisplay(array, [], []);
  resetBtn.classList.remove("redButton");
  resetBtn.classList.add("controlButton");
  currentlySorting = false;
}

async function heapify(array, n, i) {
  let largest = i; // Initialize the largest element as the root
  const left = 2 * i + 1; // Index of the left child
  const right = 2 * i + 2; // Index of the right child

  // Compare the root element with its left and right children
  const comparisons = [i, left, right].filter((index) => index < n);

  // Find the largest element
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }

  // If the largest element is not the root, swap it with the root and heapify the affected sub-tree
  if (largest !== i) {
    // Indices of the elements being swapped
    const swaps = [i, largest];

    [array[i], array[largest]] = [array[largest], array[i]];

    // Update the display to reflect the change
    updateDisplay(array, comparisons, swaps);
    await sleep(sleepSpeed); // Delay for 100 milliseconds

    await heapify(array, n, largest);
  } else {
    // Update the display to reflect the comparison
    updateDisplay(array, comparisons, []);
    await sleep(sleepSpeed); // Delay for 100 milliseconds
  }
}

async function quickSort(array, left = 0, right = array.length - 1) {
  if (left < right) {
    const pivotIndex = await partition(array, left, right);

    // Recursively sort the left and right halves
    await quickSort(array, left, pivotIndex - 1);
    await quickSort(array, pivotIndex + 1, right);
  }

  // Reset the colors of the elements
  updateDisplay(array, [], []);
  resetBtn.classList.remove("redButton");
  resetBtn.classList.add("controlButton");
  currentlySorting = false;
}

async function partition(array, left, right) {
  const pivotValue = array[right]; // Choose the rightmost element as the pivot
  let pivotIndex = left;

  for (let i = left; i < right; i++) {
    // Indices of the elements being compared
    const comparisons = [i, right];

    if (array[i] < pivotValue) {
      // Indices of the elements being swapped
      const swaps = [i, pivotIndex];

      // Swap the element with the pivot index
      [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
      pivotIndex++;

      // Update the display to reflect the change
      updateDisplay(array, comparisons, swaps);
      await sleep(sleepSpeed); // Delay for 100 milliseconds
    } else {
      // Update the display to reflect the comparison
      updateDisplay(array, comparisons, []);
      await sleep(sleepSpeed); // Delay for 100 milliseconds
    }
  }

  // Swap the pivot with the pivot index
  const swaps = [right, pivotIndex];
  [array[right], array[pivotIndex]] = [array[pivotIndex], array[right]];

  // Update the display to reflect the change
  updateDisplay(array, [], swaps);
  await sleep(sleepSpeed); // Delay for 100 milliseconds

  return pivotIndex;
}

async function radixSort(array) {
  const maxDigits = getMaxDigits(array);

  for (let i = 0; i < maxDigits; i++) {
    const buckets = Array.from({ length: 10 }, () => []);

    for (let j = 0; j < array.length; j++) {
      const digit = getDigit(array[j], i);
      buckets[digit].push(array[j]);
    }

    array = [].concat(...buckets);

    // Update the display to reflect the change
    updateDisplay(array, [], []);
    await sleep(sleepSpeed); // Sleep for 100 milliseconds
  }

  // Reset the colors of the elements
  updateDisplay(array, [], []);
  resetBtn.classList.remove("redButton");
  resetBtn.classList.add("controlButton");
  currentlySorting = false;
}

function getMaxDigits(array) {
  return Math.max(...array).toString().length;
}

function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

//helper functions for sort algos

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function swap(arr, xp, yp) {
  var temp = arr[xp];
  arr[xp] = arr[yp];
  arr[yp] = temp;
}

function preformCurrentAlgo(algoName) {
  switch (algoName) {
    case "bubbleSort":
      bubbleSort(randomArray);
      break;
    case "selectionSort":
      selectionSort(randomArray);
      break;
    case "mergeSort":
      mergeSort(randomArray);
      break;
    case "heapSort":
      heapSort(randomArray);
      break;
    case "quickSort":
      quickSort(randomArray);
      break;
    case "radixSort":
      radixSort(randomArray);
      break;
  }
}

function updateDisplay(array, comparisons, swaps) {
  const elements = document.querySelectorAll(".bar");
  const elemLength = document.querySelectorAll(".number");

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const num = elemLength[i];

    element.style.backgroundColor = "#f1e05a";

    element.style.height = `${array[i]}px`;
    element.classList.add("bar");

    //check if elem is being compared or swapped
    if (comparisons.includes(i)) {
      element.style.backgroundColor = "purple";
    }
    if (swaps.includes(i)) {
      element.style.backgroundColor = "red";
    }

    if (array[i] != undefined) {
      num.innerText = array[i];
      num.classList.add("number");
    }
  }
}

function createElement(element) {
  const board = document.getElementById("arrayContainer");

  // Create a div element for the given element
  const div = document.createElement("div");
  div.classList.add("bar");
  div.style.height = `${element}px`;

  const number = document.createElement("div");
  number.classList.add("number");
  number.innerText = element;
  div.append(number);

  // Append the new element to the board
  board.appendChild(div);
}

function clearBoard(box) {
  box.innerHTML = "";
}
