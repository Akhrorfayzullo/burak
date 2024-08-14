function delayHelloWorld(message: string): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(message);
        }, 3001); 
    });
}

delayHelloWorld("Hello World").then((result) => {
    console.log(result); 
});







