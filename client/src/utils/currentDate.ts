function getCurrentDate() {
    let currentDay = String(new Date().getDate()).padStart(2, '0');
    let currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
    let currentYear = new Date().getFullYear();
    const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    return currentDate;
}
export default getCurrentDate;