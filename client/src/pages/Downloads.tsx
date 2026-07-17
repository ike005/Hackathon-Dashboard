import {useRef, useState} from 'react';
import generatePDF from 'react-to-pdf';
import { RiArrowDropRightLine, RiArrowDropDownLine } from "react-icons/ri";

const Downloads = () => {
    const targetForAllReportRef = useRef(null);
    const targetForIndividualReportRef = useRef(null);

    // Use state for displaying All Users Report download button
    const [showReport, setShowReport] = useState(true);

    // Use state for displaying Individual Report download button
    // const [showIndividualReport, setShowIndividualReport] = useState(false);



    const handleDownload = (targetRef: any, filename: string) => {
        generatePDF(targetRef, {filename: `${filename}.pdf`})
    }

    return(
        <>
            {/*<div className="flex flex-col justify-center items-center min-h-[calc(100vh-3.5rem)] lg:min-h-screen w-full px-4">*/}
            {/*    <h1 className="text-[#145BEC] text-5xl sm:text-6xl md:text-7xl font-bold">404</h1>*/}
            {/*    <p className="mt-4 text-sm sm:text-base text-[#000000] font-medium">Page not found</p>*/}
            {/*</div>*/}

            <div className="font-bold flex flex-row h-full w-full gap-4">

                <div className="h-[100%] w-[50%] border-r-2 border-[#C9C6D9]">
                    {/*<div className="gap-2 flex flex-row items-center">*/}
                    {/*    <label className="text-[#145BEC] text-xl" htmlFor="report">Download All Users Report:</label>*/}
                    {/*    <button onClick={() => handleDownload(targetForAllReportRef, "All_Report")}  className="px-3 py-2 text-sm sm:text-base font-semibold text-[#000000] bg-[#F0F3FF] rounded-lg hover:bg-[#F0F3FF]/80 transition-colors cursor-pointer">*/}
                    {/*        <span className="text-[#135BEC] hover:text-[#3726CD]">Download Report</span>*/}
                    {/*    </button>*/}
                    {/*</div>*/}

                    {/*<div>*/}
                    {/*    <div className="flex flex-row items-center gap-4">*/}
                    {/*        <label className="text-[#145BEC] text-2xl" htmlFor="report">Download Report:</label>*/}
                    {/*        <select name="report" id="report" className="border-none text-md" >*/}
                    {/*            <option value="">Select options</option>*/}
                    {/*            <option value="apple">Compiled Report</option>*/}
                    {/*            <option value="banana">Banana</option>*/}
                    {/*            <option value="orange">Orange</option>*/}
                    {/*        </select>*/}
                    {/*    </div>*/}
                    {/*    <button onClick={() => handleDownload(targetForIndividualReportRef, "User_Report")} className="bg-[#145BEC] text-white px-4 py-2 rounded-lg hover:bg-[#145BEC]/80 transition-colors">*/}
                    {/*        Download*/}
                    {/*    </button>*/}
                    {/*</div>*/}

                    <div className="space-y-4">
                        <div
                            onClick={() => setShowReport(true)}
                            className="cursor-pointer bg-white p-4 shadow-sm hover:shadow-md transition-all"
                        >
                           <div className="flex items-center justify-between">
                               <h2 className="text-lg font-semibold text-gray-800">
                                   Download All Users Report
                               </h2>

                               {!showReport ?
                                   <RiArrowDropRightLine className="text-2xl text-gray-500" />
                                   :
                                   <RiArrowDropDownLine className="text-2xl text-gray-500" />
                               }
                           </div>


                            <div className={`mt-3 ${showReport ? "block" : "hidden"}`}>
                                <button
                                    onClick={() => handleDownload(targetForAllReportRef, "All_Report")}
                                    className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                >
                                    Download
                                </button>
                            </div>
                        </div>

                        <div
                            onClick={() => setShowReport(false)}
                            className="cursor-pointer bg-white p-4 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Download Individual User Report
                                </h2>

                                {showReport ?
                                    <RiArrowDropRightLine className="text-2xl text-gray-500" />
                                    :
                                    <RiArrowDropDownLine className="text-2xl text-gray-500" />
                                }
                            </div>

                            <div className={`mt-3 ${!showReport ? "block" : "hidden"}`}>
                                <button
                                    onClick={() => handleDownload(targetForIndividualReportRef, "Individual_Report")}
                                    className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                >
                                    Download
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-[100%] w-[50%]">

                    {showReport && (
                        <div ref={targetForAllReportRef} className="text-2xl">
                            Hello world all
                        </div>
                    )}

                    {!showReport && (
                        <div ref={targetForIndividualReportRef} className="text-2xl">
                            Hello world one user
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}

export default Downloads;