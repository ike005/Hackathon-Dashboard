function averageFeeling (data: any, currentDate: string) {

    const totalListedNumbers = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].hasOwnProperty(currentDate)) {
            switch (true) {
                case (data[i][currentDate].user_feeling[0] === "Super excited 😁"):
                    totalListedNumbers.push(4);
                    break;
                case (data[i][currentDate].user_feeling[0] === "Good 😊"):
                    totalListedNumbers.push(3);
                    break;
                case (data[i][currentDate].user_feeling[0] === "Okay 😐"):
                    totalListedNumbers.push(2);
                    break;
                case (data[i][currentDate].user_feeling[0] === "Stressed 😞"):
                    totalListedNumbers.push(1);
                    break;
                default:
                    totalListedNumbers.push(0);
            }
        }
    }

    const totalAddedNumbers = totalListedNumbers.reduce((a, b) => a + b, 0);

    const totalAverage = Math.round(totalAddedNumbers / data.length);

    let averageUserFeeling = "N/A";
    switch (true) {
        case (totalAverage === 4):
            averageUserFeeling = "😁";
            break;
        case (totalAverage === 3):
            averageUserFeeling = "😊";
            break;
        case (totalAverage === 2):
            averageUserFeeling = "😐";
            break;
        case (totalAverage === 1):
            averageUserFeeling = "😞";
            break;
    }

    return averageUserFeeling;
}

export default averageFeeling;

