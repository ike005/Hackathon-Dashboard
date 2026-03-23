

const usersInfo = (usersData: any) => {
    let currentDay = String(new Date().getDate()).padStart(2, '0');
    let currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
    let currentYear = new Date().getFullYear();

    const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

    const results = [];

    for (let i = 0; i < usersData.length; i++) {

        let active = false;
        if (usersData[i].hasOwnProperty(currentDate)) {
            active = true;
        }
        const user = {
            id: usersData[i]._id,
            name: usersData[i].user_name,
            githubLink: usersData[i].github_link || 'https://github.com/ike005',
            status: active ? (
                <span className="bg-green-500/10 px-4 py-2 rounded-full text-green-500 text-sm border-2 border-500/20">ACTIVE</span>
            ) : (
                <span className="bg-yellow-500/10 px-4 py-2 rounded-full text-yellow-500 text-sm border-2 border-yellow-500/20">IDLE</span>
            ),
            feeling: usersData[i][currentDate]?.user_feeling?.[0] || "N/A",
            fullData: usersData[i]
        }

        results.push(user);
    }
    return results;
}

export default usersInfo;