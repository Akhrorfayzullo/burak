function findDisappearedNumbers(arr: number[]): number[] {
    const maxNum = Math.max(...arr);

   
    const fullRange: number[] = Array.from({ length: maxNum }, (_, i) => i + 1);

    const missingNumbers: number[] = fullRange.filter(num => !arr.includes(num));

    return missingNumbers;
}

console.log(findDisappearedNumbers([1, 3, 4, 7])); 






