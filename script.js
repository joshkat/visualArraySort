//swap helper function
function swap(nums, a, b){
    var temp = nums[a];
    nums[a] = nums[b];
    nums[b] = temp;
}

function bubbleSort(nums){
    for(var i=0; i<nums.length; i++){
        for(var j=0; j< (nums.length-i-1); j++){
            if(nums[j] > nums[j+1]){
                var temp = nums[j]
                nums[j] = nums[j+1]
                nums[j+1] = temp
            }
        } 
    }
    console.log(nums)
}

var testingArray = [12, 3, 4, 5, 3, 2, 1, 43]
bubbleSort(testingArray)