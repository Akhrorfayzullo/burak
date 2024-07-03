const objectToArray = (obj: { [key: string]: any }): [string, any][] => {
    const result: [string, any][] = [];

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result.push([key, obj[key]]);
        }
    }

    return result;
}

console.log(objectToArray({a: 10, b: 20})); 
