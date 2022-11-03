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

var testingArr = [21,31,42,53,78,4,2,1,4,6,8,9,0]