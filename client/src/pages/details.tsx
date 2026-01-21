import {Container2} from "../components/Containers.tsx";
import {useUsers} from "../hooks/useUsers.ts";
import {useState} from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface ProfilePopupProps {
    open: boolean;
    onClose: () => void;
    userData: any;
}

const ProfilePopup = ({open, onClose, userData}: ProfilePopupProps) => {
    if (!userData) return null;

    const currentDate = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;
    const todayData = userData[currentDate] || {};

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: '#1F2937',
                    color: '#FFFFFF',
                    borderRadius: '16px',
                    maxHeight: '80vh'
                }
            }}
        >
            <DialogTitle sx={{m: 0, p: 2, fontSize: '1.5rem', fontWeight: 'bold'}}>
                Profile Details
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: '#9CA3AF',
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{borderColor: '#374151'}}>
                <div className="flex flex-col gap-6">
                    {/* Header Section */}
                    <div className="flex items-center gap-4">
                        <div
                            className="bg-gradient-to-br from-[#82181A] to-[#B91C1C] rounded-full size-[80px] flex justify-center items-center text-3xl font-bold">
                            {userData.user_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl font-bold">{userData.user_name}</h2>
                            <div className="flex items-center gap-2">
                                <GitHubIcon sx={{fontSize: '1.2rem', color: '#9CA3AF'}}/>
                                <a
                                    href={userData.github_link || 'https://github.com'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline text-sm"
                                >
                                    {userData.github_link || 'GitHub Profile'}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Status Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#2B3544] rounded-lg p-4 flex flex-col items-center gap-2">
                            <CalendarTodayIcon sx={{fontSize: '2rem', color: '#10B981'}}/>
                            <h3 className="text-gray-400 text-sm">Status</h3>
                            <p className="text-lg font-semibold">
                                {todayData.user_feeling ? (
                                    <span className="bg-green-500 px-4 py-2 rounded-full text-white text-sm">Active</span>
                                ) : (
                                    <span className="bg-yellow-400 px-4 py-2 rounded-full text-white text-sm">Inactive</span>
                                )}
                            </p>
                        </div>

                        <div className="bg-[#2B3544] rounded-lg p-4 flex flex-col items-center gap-2">
                            <EmojiEventsIcon sx={{fontSize: '2rem', color: '#F59E0B'}}/>
                            <h3 className="text-gray-400 text-sm">Feeling</h3>
                            <p className="text-lg font-semibold">
                                {todayData.user_feeling?.[0] || 'N/A'}
                            </p>
                        </div>

                        <div className="bg-[#2B3544] rounded-lg p-4 flex flex-col items-center gap-2">
                            <TrendingUpIcon sx={{fontSize: '2rem', color: '#3B82F6'}}/>
                            <h3 className="text-gray-400 text-sm">Activity Days</h3>
                            <p className="text-lg font-semibold">
                                {Object.keys(userData).filter(key => key.match(/\d{4}-\d{2}-\d{2}/)).length}
                            </p>
                        </div>
                    </div>

                    {/* Today's Reflection */}
                    {todayData.user_reflection && (
                        <div className="bg-[#2B3544] rounded-lg p-4">
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <span className="text-2xl">💭</span>
                                Today's Reflection
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {todayData.user_reflection}
                            </p>
                        </div>
                    )}

                    {/* Today's Update */}
                    {todayData.user_update && (
                        <div className="bg-[#2B3544] rounded-lg p-4">
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <span className="text-2xl">📝</span>
                                Today's Update
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {todayData.user_update}
                            </p>
                        </div>
                    )}

                    {/* Recent Activity */}
                    <div className="bg-[#2B3544] rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
                        <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto">
                            {Object.keys(userData)
                                .filter(key => key.match(/\d{4}-\d{2}-\d{2}/))
                                .sort()
                                .reverse()
                                .slice(0, 7)
                                .map((date) => (
                                    <div key={date}
                                         className="flex justify-between items-center py-2 px-3 bg-[#1F2937] rounded-lg">
                                        <span className="text-sm text-gray-400">{date}</span>
                                        <span className="text-sm">{userData[date].user_feeling?.[0] || 'N/A'}</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const Participants = () => {
    const {usersData} = useUsers();
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleOpenPopup = (user: any) => {
        setSelectedUser(user);
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
        setSelectedUser(null);
    };

    return (
        <>
            <div className="px-4 md:px-6 py-8 md:py-12 bg-[#111827] h-[100vh]">
                <div>
                    <Container2 usersData={usersData} onViewDetails={handleOpenPopup}/>
                </div>
            </div>

            <ProfilePopup
                open={popupOpen}
                onClose={handleClosePopup}
                userData={selectedUser}
            />
        </>
    )
}

export default Participants;