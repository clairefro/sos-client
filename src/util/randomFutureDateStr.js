function randomFutureDateString() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const currentDate = new Date(); // Get current date
    const randomFutureDate = new Date(currentDate.getTime() + Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000); // Add random number of milliseconds to current date

    const randomMonth = months[randomFutureDate.getMonth()];
    const randomDay = randomFutureDate.getDate();
    const randomYear = randomFutureDate.getFullYear();
    const randomHour = Math.floor(Math.random() * 24);
    const randomMinute = Math.floor(Math.random() * 60);

    const dateString = `${randomMonth} ${randomDay}, ${randomYear} at ${randomHour}:${randomMinute.toString().padStart(2, '0')}`;

    return dateString;
}

export { randomFutureDateString as randomDateString }