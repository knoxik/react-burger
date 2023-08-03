export const clx = (classes: {[key: string]: boolean}) => {
    for (let key in classes) {
        if (classes[key]) return key;
    }
}