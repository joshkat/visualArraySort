
//create random array
var randomArray = []
function initArray(arr){    //using func so i can have reset btn later on
    for(i=0; i<20; i++){
        arr[i] = Math.floor(Math.random() * 100) + 1 //randomnum 1-100
    }
    console.log(arr)
}
initArray(randomArray)

