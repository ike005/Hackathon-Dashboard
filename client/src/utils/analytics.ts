import getCurrentDate from "./currentDate";

function trackHacathonDaysDate(data: any) {
    // console.log("Data tracking");
    console.log(data.dailyLogData)
    // console.log(data.dailyLogData[0]["user_feeling"][0])
    let duration_dates = []
    for (let i = 0; i < data.dailyLogData.length; i++) {
        duration_dates.push(data.dailyLogData[i]["log_date"]);
    }

    return [...new Set(duration_dates)];
}

function trackActiveUsers(data: any) {
    const uniqueDates = trackHacathonDaysDate(data);
    let currentlyActiveUsers = 0;

    const currentDate = getCurrentDate();
    // console.log(currentDate);

    for (let i = 0; i < data.dailyLogData.length; i++) {
        if (data.dailyLogData[i]["log_date"] == (currentDate)) {
            currentlyActiveUsers++;
            console.log("beans");
            console.log(currentlyActiveUsers);
        }
    }

    const dictArray = [];

    for (let i = 0; i < uniqueDates.length; i++) {
        let count = 0;
        for (let j = 0; j < data.dailyLogData.length; j++) {
            if (data.dailyLogData[j]["log_date"] == (uniqueDates[i])) {
                count++
            }
        }

        dictArray.push({Key: uniqueDates[i], Value: count});
    }
    console.log(dictArray);
    return {dictArray, currentlyActiveUsers};


}


// function trackOneActiveUser(data: any) {
//     const currentDate = getCurrentDate();
//
//     for (let i = 0; i < data?.daily_log?.length; i++) {
//         if (data.daily_log[i].log_date === currentDate) {
//             return true;
//         }
//     }
//
//     return false;
// }

export { trackHacathonDaysDate, trackActiveUsers };