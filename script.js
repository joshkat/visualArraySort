const arrayBox = document.getElementById('arrayContainer')
const sortBtn = document.getElementById('startAlgo')
const resetBtn = document.getElementById('reset')
const bubbleBtn = document.getElementById('bubbleSort')
const mergeBtn = document.getElementById('mergeSort')
const heapBtn = document.getElementById('heapSort')
const quickBtn = document.getElementById('quickSort')
const radixBtn = document.getElementById('radixSort')

var currentAlgo = "bubbleSort" //default algo
var currentlySorting = false

//create random array
var randomArray = []
function initArray(arr){    //using func so i can have reset btn later on
    for(i=0; i<20; i++){
        arr[i] = Math.floor(Math.random() * 500) + 1 //randomnum 1-200
    }
}
initArray(randomArray)

//create bars representing array & append to arrayBox
function createBoxes(arr){
    for(i=0; i<arr.length; i++){
        var bar = document.createElement('div')
        var num = document.createElement('div')
        bar.style.height = arr[i] + 'px'
        bar.classList.add('bar')
        num.innerText = arr[i]
        num.classList.add('number')
        arrayBox.appendChild(bar)
        bar.appendChild(num)
    }
}
createBoxes(randomArray)

//header control btns

sortBtn.addEventListener('click', ()=>{
    currentlySorting = true
    resetBtn.classList.add('redButton')
    preformCurrentAlgo(currentAlgo)
})

resetBtn.addEventListener('click', ()=>{
    if(currentlySorting == false){
        clearBoard(arrayBox)
        initArray(randomArray)
        createBoxes(randomArray)
    }
})

//sort functions down here
async function bubbleSort(nums, board){
    for(var i=0; i<nums.length; i++){
        for(var j=0; j< (nums.length-i-1); j++){
            if(nums[j] > nums[j+1]){
                var temp = nums[j]
                nums[j] = nums[j+1]
                nums[j+1] = temp
                clearBoard(board)                    
                createBoxes(nums)
                await sleep(50)
            }
        }
    }
    resetBtn.classList.remove('redButton')
    currentlySorting = false  
}

//helper functions for sort
function clearBoard(board){
    while(board.firstChild){
        board.removeChild(board.firstChild)
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function preformCurrentAlgo(algoName){
    switch(algoName){
        case 'bubbleSort':
            bubbleSort(randomArray, arrayBox)
            break
        case 'mergeSort':
            mergeSort(randomArray, arrayBox)
            break
        case 'heapSort':
            heapSort(randomArray, arrayBox)
            break
        case 'quickSort':
            quickSort(randomArray, arrayBox)
            break
        case 'radixSort':
            quickSort(randomArray, arrayBox)
            break
    }
}
