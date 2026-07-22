import {useRef, useState} from 'react';
import generatePDF from 'react-to-pdf';
import { RiArrowDropRightLine, RiArrowDropDownLine } from "react-icons/ri";

import AllUsersReport from "./DownloadPdfFile/AllUsersReport.tsx";

const Downloads = () => {
    const targetForAllReportRef = useRef(null);
    const targetForIndividualReportRef = useRef(null);

    // Use state for displaying All Users Report download button
    const [showReport, setShowReport] = useState(true);
    const [printDesktopLayout, setPrintDesktopLayout] = useState(false);

    const handleDownload = async (targetRef: any, filename: string) => {
        setPrintDesktopLayout(true);

        await new Promise((resolve) => {
            requestAnimationFrame(() => {
                requestAnimationFrame(resolve);
            });
        });

        try {
            await generatePDF(targetRef, {filename: `${filename}.pdf`});
        } finally {
            setPrintDesktopLayout(false);
        }
    }

    return(
        <>
            {/*<div className="flex flex-col justify-center items-center min-h-[calc(100vh-3.5rem)] lg:min-h-screen w-full px-4">*/}
            {/*    <h1 className="text-[#145BEC] text-5xl sm:text-6xl md:text-7xl font-bold">404</h1>*/}
            {/*    <p className="mt-4 text-sm sm:text-base text-[#000000] font-medium">Page not found</p>*/}
            {/*</div>*/}

            <div className="font-bold flex flex-col h-full w-full gap-4">

                <div className="h-[100%] border-r-2 border-[#C9C6D9]">

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

                <div className="h-[100%]">

                    {showReport && (
                        <AllUsersReport ref={targetForAllReportRef} forceDesktopLayout={printDesktopLayout} />
                    )}

                    {!showReport && (
                        <div ref={targetForIndividualReportRef} className="text-2xl">
                            Not Implemented
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}

export default Downloads;