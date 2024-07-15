export const SERVER_URL = "http://localhost:5000";

export function capitalizeFirstChar(str = '') {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeEveryFirstChar(str = '') {
    const words = str.split(' '); // Split the string into individual words
    const capitalizedWords = words.map((word) => capitalizeFirstChar(word));
    return capitalizedWords.join(' '); // Join the capitalized words back into a single string
}

export const removeHTTP = (str) => {
    return str.replace("https://", "").replace("http://", "");
}