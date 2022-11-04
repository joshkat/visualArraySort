const arrayBox = document.getElementById('arrayContainer')
const sortBtn = document.getElementById('startAlgo')
const resetBtn = document.getElementById('reset')

//create random array
var randomArray = []
function initArray(arr){    //using func so i can have reset btn later on
    for(i=0; i<20; i++){
        arr[i] = Math.floor(Math.random() * 200) + 1 //randomnum 1-200
    }
}
initArray(randomArray)

//create bars representing array & append to arrayBox
function createBoxes(arr){
    for(i=0; i<arr.length; i++){
        var bar = document.createElement('div')
        bar.style.height = arr[i] + 'px'
        bar.classList.add('bar')
        bar.innerText = arr[i]
        arrayBox.appendChild(bar)
    }
}
createBoxes(randomArray)

sortBtn.addEventListener('click', ()=>{
    bubbleSort(randomArray, arrayBox)
})

resetBtn.addEventListener('click', ()=>{
    clearBoard(arrayBox)
    initArray(randomArray)
    createBoxes(randomArray)
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
}

//helper function for sort
function clearBoard(board){
    while(board.firstChild){
        board.removeChild(board.firstChild)
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

