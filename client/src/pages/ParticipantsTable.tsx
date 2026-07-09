import Container1 from "../components/participantstable/Container1.tsx";
import {useUsers} from "../hooks/useUsers.ts";
import {useState} from "react";


import SearchIcon from '@mui/icons-material/Search';

const Participants = () => {
    const {usersData} = useUsers();
    const [filteredUsersList, setFilteredUsersList] = useState<any>([]);
    const [searchParticipantValue, setSearchParticipantValue] = useState('');

    const handleSearch = (event: any) => {
        event.preventDefault();

        const searchParticipantTerm = event.target.value;
        setSearchParticipantValue(searchParticipantTerm);

        if (!searchParticipantTerm.trim()) {
            setFilteredUsersList([]);
            return;
        }

        const filteredUsersData: any[] = usersData.filter((user: any) => {
           return user.name.toLowerCase().includes(searchParticipantTerm);
        });

        setFilteredUsersList(filteredUsersData);
    }

    return (
        <>
            <div className="bg-[#FFFFFF] min-h-[calc(100vh-3.5rem)] lg:min-h-screen w-full">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-2 min-h-[4.5rem] sm:h-[6rem] items-stretch sm:items-center border-b-2 border-[#C9C6D9] px-3 sm:px-4 md:px-6 py-3 sm:py-0">
                    <div className="w-full sm:w-auto">
                        <div className="flex flex-row bg-[#F0F3FF] border-2 border-[#CCC9DC] items-center px-3 py-2 rounded-lg w-full sm:w-[18rem] md:w-[20rem]">
                            <SearchIcon className="text-[#000000] shrink-0"/>
                            <input type="text" placeholder="Search participants..." className="w-full min-w-0 h-full px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-[#000000] outline-none bg-transparent" value={searchParticipantValue} onChange={handleSearch}   />
                        </div>
                    </div>
                </div>

                <div className="px-3 sm:px-4 md:px-6 py-3 md:py-4 flex flex-col gap-4 md:gap-8 w-full min-h-[calc(100vh-7.5rem)] lg:min-h-[calc(100vh-6rem)] overflow-auto bg-[#F9F9FF]">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#000000]">Participants</h1>
                            <p className="text-xs sm:text-sm md:text-base font-medium text-[#000000]">
                                {filteredUsersList.length > 0 ? `Showing ${filteredUsersList.length} of ${usersData.length} participants` : `Showing all ${usersData.length} participants`}
                            </p>
                        </div>
                    </div>
                    <Container1 usersData={(filteredUsersList.length > 0 ? filteredUsersList : usersData)}/>
                </div>
            </div>
        </>
    )
}

export default Participants;