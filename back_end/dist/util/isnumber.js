export function converStringsToNumbers(...args) {
    try {
        const numberArray = args.map((arg) => {
            if (typeof arg !== "string" &&
                !isNaN(Number(arg)) &&
                !isNaN(parseFloat(arg))) {
                throw Error("Failed parsing string to int");
            }
            else {
                return Number(arg);
            }
        });
        return numberArray;
    }
    catch (error) {
        throw error;
    }
}
