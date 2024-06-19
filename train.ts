function findLongestWord(input: string): string {
    const words = input.split(' ');

   
    let longest = '';

    for (const word of words) {
        if (word.length > longest.length) {
            longest = word;
        }
    }

    return longest;
}

console.log(findLongestWord("I come from Uzbekistan"));
 

