const arrayBox = document.getElementById('arrayContainer')

//create random array
var randomArray = []
function initArray(arr){    //using func so i can have reset btn later on
    for(i=0; i<20; i++){
        arr[i] = Math.floor(Math.random() * 100) + 1 //randomnum 1-100
    }
    console.log(arr)
}
initArray(randomArray)

//create bars representing array & append to arrayBox
function createBoxes(arr){
    for(i=0; i<arr.length; i++){
        var bar = document.createElement('div')
        bar.style.height = arr[i] + 'px'
        bar.classList.add(i)
        arrayBox.appendChild(bar)
    }
}

createBoxes(randomArray)
