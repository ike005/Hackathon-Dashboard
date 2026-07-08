
const usersInfo = (usersData: any) => {

    const results = [];

    for (let i = 0; i < usersData.length; i++) {

        // let active = false;
        // if (usersData[i].hasOwnProperty(currentDate)) {
        //     active = true;
        // }
        const user = {
            id: usersData[i].user_id,
            name: usersData[i].name,
            githubLink: usersData[i].github_link || 'https://github.com/ike005',
            // status: active ? (
            //     <span className="inline-flex items-center gap-2 bg-[#87F2E4] px-4 py-2 rounded-full text-[#000000] font-semibold text-sm">
            //         <span className="bg-green-500 h-2 w-2 rounded-full"></span>
            //         Active
            //     </span>
            // ) : (
            //     <span className="inline-flex items-center gap-2 bg-[#DFE8FF] px-4 py-2 rounded-full text-[#000000] font-semibold text-sm">
            //         <span className="bg-[#777587] h-2 w-2 rounded-full"></span>
            //         Offline
            //     </span>
            // ),
            gender: usersData[i].gender,
            email: usersData[i].email,
            // feeling: usersData[i][currentDate]?.user_feeling?.[0] || "N/A",
            // fullData: usersData[i]
        }

        results.push(user);
    }
    return results;
}

export default usersInfo;