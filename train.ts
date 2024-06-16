function majorityElement(nums: number[]): number {
  // Create a Map to count occurrences of each number
  const mapCount = new Map<number, number>();


  for (const num of nums) {
      mapCount.set(num, (mapCount.get(num) || 0) + 1);
  }


  let majorityNum = nums[0];
  let maxCount = 0;

  for (const [num, count] of mapCount) {
      if (count > maxCount) {
          maxCount = count;
          majorityNum = num;
      }
  }

  return majorityNum;
}


console.log(majorityElement([1, 2, 3, 4, 5, 4, 3, 4])); 

