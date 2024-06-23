function reverseSentence(sentence: string): string {
    const words = sentence.split(' ');

    const reversedWords = words.map(word => word.split('').reverse().join(''));

    return reversedWords.join(' ');
}

console.log(reverseSentence("we like coding!")); 
 

