export const clx = (classes) => {
    for (let key in classes) {
        if (classes[key]) return key;
    }
}