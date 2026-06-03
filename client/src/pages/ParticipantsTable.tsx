import Container1 from "../components/participantstable/Container1.tsx";
import {useUsers} from "../hooks/useUsers.ts";
import {useState} from "react";
// import {ListFilter, ArrowDownUp} from "lucide-react"

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
            <div className="bg-[#FFFFFF] h-[100vh] w-full">
                <div className="flex flex-row justify-between gap-2 h-[6rem] items-center border-b-2 border-[#C9C6D9]">
                    {/*<h1 className="text-xl md:text-2xl font-bold text-[#000000] px-4 md:px-6 py-2 md:py-4 ">Participant Directory</h1>*/}
                    <div className="px-6">
                        <div className="flex flex-row bg-[#F0F3FF] border-2 border-[#CCC9DC] items-center px-3 py-2 rounded-lg w-[20rem]">
                            <SearchIcon className="text-[#000000]"/>
                            <input type="text" placeholder="Search participants..." className="w-full h-full px-4 py-2 text-[#000000] outline-none" value={searchParticipantValue} onChange={handleSearch}   />
                        </div>
                    </div>
                </div>

                <div className="px-4 md:px-6 py-2 md:py-4 flex flex-col gap-8 w-full h-[calc(100vh-6rem)] overflow-auto bg-[#F9F9FF]">
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <h1 className="text-xl md:text-4xl font-bold text-[#000000]">Participants</h1>
                            <p className="text-sm md:text-base font-medium text-[#000000]">
                                {filteredUsersList.length > 0 ? `Showing ${filteredUsersList.length} of ${usersData.length} participants` : `Showing all ${usersData.length} participants`}
                            </p>
                        </div>

                        {/*<div className="flex flex-row gap-2">*/}
                        {/*    <button className="bg-[#F9F9FF] hover:bg-[#135BEC] px-4 py-2 rounded-lg text-[#000000] hover:text-[#FFFFFF] border-2 border-[#C9C6D9] text-md font-semibold hover:cursor-pointer transition-colors flex flex-row items-center cursor-pointer">*/}
                        {/*        <ListFilter strokeWidth={3} className="mr-1 size-4"/>*/}
                        {/*        Filters*/}
                        {/*    </button>*/}

                        {/*    <button className="bg-[#F9F9FF] hover:bg-[#135BEC] px-4 py-2 rounded-lg text-[#000000] hover:text-[#FFFFFF] border-2 border-[#C9C6D9] text-md font-semibold hover:cursor-pointer transition-colors flex flex-row items-center cursor-pointer">*/}
                        {/*        <ArrowDownUp strokeWidth={3} className="mr-1 size-4"/>*/}
                        {/*        Sort*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </div>
                    <Container1 usersData={(filteredUsersList.length > 0 ? filteredUsersList : usersData)}/>
                </div>
            </div>
        </>
    )
}

export default Participants;