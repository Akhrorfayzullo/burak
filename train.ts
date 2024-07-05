const hasProperty = (obj: { [key: string]: any }, prop: string): boolean => {
    return prop in obj;
}

console.log(hasProperty({name: "BMW", model: "M3"}, "model"));
console.log(hasProperty({name: "BMW", model: "M3"}, "year"));  

