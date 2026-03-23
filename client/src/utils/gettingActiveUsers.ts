function gettingActiveUsers(data: any) {
    const totalParticipants = data.length;
    let currentDay = String(new Date().getDate()).padStart(2, '0');
    let currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
    let currentYear = new Date().getFullYear();

    const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

    const totalActiveParticipants = (data: any) => {
        let active = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].hasOwnProperty(currentDate)) {
                active++;
            }
        }
        return active;
    }

    return {totalActiveParticipants, currentDate, totalParticipants};
}

export default gettingActiveUsers;