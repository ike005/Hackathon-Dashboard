
import type {Ref} from "react";

const AllUsersReport = ({ ref } : { ref?: Ref<HTMLDivElement> }) => {
    return (
        <div
            ref={ref}
            className="w-full max-w-5xl mx-auto bg-white text-black font-serif p-4 sm:p-6 md:p-8 lg:p-12 text-sm sm:text-base"
        >

            {/* Header */}

            <div className="mb-6 sm:mb-8 md:mb-10">
                <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-[2.625rem] text-[#022156] font-bold tracking-wide mb-4 sm:mb-5">
                    HACKATHON USERS REPORT
                </h1>

                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 md:gap-6">
                    <hr className="hidden sm:block flex-1 border border-[#022156] w-full"/>

                    <h2 className="text-sm sm:text-base md:text-lg font-semibold whitespace-nowrap text-center">
                        Generated On:
                    </h2>

                    <hr className="hidden sm:block flex-1 border border-[#022156] w-full"/>
                </div>

            </div>

            {/* Report Metrics */}

            <div className="mb-8 sm:mb-10 md:mb-12">
                <h2 className="text-[#022156] text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-[18px]">
                    REPORT METRICS
                </h2>

                <div className="border-2 border-[#022156] rounded-lg min-h-[7rem] sm:min-h-[9rem] md:min-h-[11rem] lg:h-[180px]"/>

            </div>

            {/* User */}

            <div>

                <div className="bg-[#022156] p-3 sm:p-3.5 rounded-md mb-3 sm:mb-4">

                    <h2 className="text-white text-center text-lg sm:text-xl md:text-2xl lg:text-[28px] font-bold">
                        USER #1
                    </h2>

                </div>

                <div className="border-2 border-[#022156] rounded-lg sm:rounded-[10px] overflow-hidden">

                    {/* Personal Information */}

                    <div className="border-b-2 border-[#022156] p-4 sm:p-6 md:p-8">

                        <h3 className="text-[#022156] text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 sm:mb-5 md:mb-7">
                            PERSONAL INFORMATION
                        </h3>

                        <div className="flex flex-col md:flex-row md:justify-between gap-4 sm:gap-8 md:gap-12 lg:gap-[100px]">

                            <div className="flex-1 leading-relaxed sm:leading-8 space-y-1">

                                <p><strong>Name:</strong> Chibuike Anyiam</p>

                                <p><strong>Username:</strong> chibuike005</p>

                                <p className="break-all"><strong>Email:</strong> anyiamchibuike3@gmail.com</p>

                            </div>

                            <div className="flex-1 leading-relaxed sm:leading-8 space-y-1">

                                <p><strong>Age:</strong> 20</p>

                                <p><strong>Gender:</strong> Male</p>

                                <p className="break-all"><strong>GitHub:</strong> github.com/ike005</p>

                            </div>

                        </div>

                    </div>

                    {/* Main Body */}

                    <div className="flex flex-col lg:flex-row">

                        {/* Daily Logs */}

                        <div className="w-full lg:w-1/2 border-b-2 lg:border-b-0 lg:border-r-2 border-[#022156] p-4 sm:p-6 md:p-8">

                            <h3 className="text-[#022156] text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 sm:mb-5 md:mb-7">
                                DAILY LOGS
                            </h3>

                            <div>

                                <h4 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 md:mb-5">
                                    May 18, 2026
                                </h4>

                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10">

                                    <div className="w-full sm:w-[45%]">

                                        <p><strong>Mood:</strong> Okay</p>

                                        <div className="mt-4 sm:mt-5">

                                            <strong>Tasks</strong>
                                            <ul className="mt-2 sm:mt-2.5 pl-5 sm:pl-[22px] leading-relaxed sm:leading-[1.8] list-disc">

                                                <li>Task 1</li>

                                                <li>Task 2</li>

                                            </ul>

                                        </div>
                                    </div>

                                    <div className="w-full sm:w-[55%]">

                                        <strong>Reflection</strong>

                                        <p className="mt-2 sm:mt-2.5 leading-relaxed sm:leading-[1.8]">
                                            Everything is okay and good, my team is
                                            working together.
                                        </p>

                                    </div>

                                </div>

                                <hr className="my-5 sm:my-6 md:my-8 border-t-2 border-dashed border-[#bfbfbf]"/>

                            </div>

                        </div>

                        {/* Brainstorm */}

                        <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8">

                            <h3 className="text-[#022156] text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 sm:mb-5 md:mb-7">
                                BRAINSTORMING SESSIONS
                            </h3>

                            <div>

                                <h4 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 md:mb-[18px]">
                                    May 18, 2026
                                </h4>

                                <ul className="leading-relaxed sm:leading-8 pl-4 sm:pl-5 list-disc space-y-0.5 sm:space-y-0">

                                    <li><strong>Interests:</strong> Cross-Platform UI/UX</li>

                                    <li><strong>Tech Stack:</strong> React</li>

                                    <li><strong>Tech Interests:</strong> Figma</li>

                                    <li><strong>Possible Impact:</strong> Improve UI/UX</li>

                                    <li><strong>Tools Used:</strong> Youtube, Stackoverflow</li>

                                    <li><strong>Reason:</strong> To improve the user experience.</li>

                                </ul>

                                <hr className="my-5 sm:my-6 md:my-8 border-t-2 border-dashed border-[#bfbfbf]"/>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
 }

 export default AllUsersReport;
