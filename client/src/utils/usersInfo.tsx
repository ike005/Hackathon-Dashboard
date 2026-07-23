
const usersInfo = (usersData: any) => {

    const results = [];

    for (let i = 0; i < usersData.length; i++) {
        const user = {
            id: usersData[i].user_id,
            name: usersData[i].name,
            githubLink: usersData[i].github_link || 'https://github.com/ike005',
            gender: usersData[i].gender,
            email: usersData[i].email,
        }

        results.push(user);
    }
    return results;
}

export default usersInfo;