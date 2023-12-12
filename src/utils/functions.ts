export const randomNumber = (): string => {
    const date = new Date();
    const randomNum = Math.floor(Math.random() * 1000);
    const randomNumberWithTime = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}${randomNum}`;
    return randomNumberWithTime;
};

export const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
};