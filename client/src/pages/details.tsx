// import {Container2} from "../components/Containers.tsx";
import {useUsers} from "../hooks/useUsers.ts";
import {useState} from "react";

import SearchIcon from '@mui/icons-material/Search';

const Participants = () => {
    const {usersData} = useUsers();

    const [filteredUsersList, setFilteredUsersList] = useState<any>([]);

    const [searchParticipantValue, setSearchParticipantValue] = useState('');

    const handleSearch = ( event) => {
        event.preventDefault();

        const searchParticipantTerm = event.target.value;
        setSearchParticipantValue(searchParticipantTerm);

        if (!searchParticipantTerm.trim()) {
            setFilteredUsersList([]);
            return;
        }

        const filteredUsersData: any[] = usersData.filter((user: any) => {
           return user.user_name.toLowerCase().includes(searchParticipantTerm);
        });

        setFilteredUsersList(filteredUsersData);
    }

    return (
        <>
            <div className="bg-[#111827] h-[100vh] w-full">
                <div className="flex flex-row gap-2 h-[6rem] items-center border-b-2 border-[#282E38]">
                    <h1 className="text-xl md:text-2xl font-bold text-[#FFFFFF] px-4 md:px-6 py-2 md:py-4 ">Participant Directory</h1>
                    <div className="flex flex-row bg-[#374152] items-center px-3 py-2 rounded-lg">
                        <SearchIcon className="text-[#AAAFB8]"/>
                        <input type="text" placeholder="Search participants..." className="w-full h-full px-4 py-2 text-[#FFFFFF] outline-none" value={searchParticipantValue} onChange={handleSearch}   />
                    </div>
                </div>
                <div className="px-4 md:px-6 py-2 md:py-4 w-full">
                    {/*{filteredUsersList.length > 0 ? <p className="text-[#AAAFB8]">participants found</p> : <p className="text-[#AAAFB8]">no participants found</p>}*/}
                    {/*{usersData.length > 0 ? <p className="text-[#AAAFB8]">participants found</p> : <p className="text-[#AAAFB8]">no participants found</p>}*/}

                    <Container2 usersData={(filteredUsersList.length > 0 ? filteredUsersList : usersData)}/>
                </div>
            </div>
        </>
    )
}

export default Participants;