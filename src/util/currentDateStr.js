function currentDateStr() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const currentDate = new Date();

    const currentMonth = months[currentDate.getMonth()];
    const currentDay = currentDate.getDate();
    const currentYear = currentDate.getFullYear();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    const dateString = `${currentMonth} ${currentDay}, ${currentYear} at ${currentHour}:${currentMinute.toString().padStart(2, '0')}`;

    return dateString;
}

export { currentDateStr }






