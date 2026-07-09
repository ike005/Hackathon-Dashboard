import getCurrentDate from "./currentDate";

function gettingActiveUsers(data: any) {
    const totalParticipants = data.length;
    const currentDate = getCurrentDate();

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