function pluck(arr) {
    if (!arr || !arr.length) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

export { pluck }