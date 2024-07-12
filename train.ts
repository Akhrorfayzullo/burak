const mergeSortedArrays = (arr1: number[], arr2: number[]): number[] => {
    return [...arr1, ...arr2].sort((a, b) => a - b);
}

console.log(mergeSortedArrays([0, 3, 4, 31], [4, 6, 30])); 



