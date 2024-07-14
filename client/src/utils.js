export const SERVER_URL = "";

export function capitalizeFirstChar(str = '') {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeEveryFirstChar(str = '') {
    const words = str.split(' '); // Split the string into individual words
    const capitalizedwords = words.map((word) => capitalizeFirstChar(word));
    return capitalizedwords.join(' '); // Join the capitalized words back into a single string
}

export const removeHTTP = (str) => {
    return str.replace("https://", "").replace("http://", "");
}