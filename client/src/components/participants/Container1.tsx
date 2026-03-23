import {useNavigate} from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import StyledTableCell from "@mui/material/TableCell";
import StyledTableRow from "@mui/material/TableRow";

import usersInfo from "../../utils/usersInfo";
import type {Container1Props} from "../../types/overviewTypes.ts";

const Container1 = ({usersData}: Container1Props) => {

    const rows = usersInfo(usersData);
    const navigate = useNavigate();

    return (
        <>
            <div
                className="flex flex-col w-[100%] min-h-[35vh] max-h-[50vh] overflow-scroll rounded-2xl gap-4 border-2 border-[#282E38]">
                <div className="flex flex-col md:flex-row md:justify-between gap-2">
                    {/*md:max-w-1/3*/}
                    <div className="flex items-center w-full gap-2">
                        <TableContainer component={Paper}>
                            <Table sx={{maxWidth: '100%'}} aria-label="customized table"  className="bg-[#111827]">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell style={{backgroundColor: '#111827'}}>NAME</StyledTableCell>
                                        <StyledTableCell align="left" style={{backgroundColor: '#111827'}}>STATUS</StyledTableCell>
                                        <StyledTableCell align="left" style={{backgroundColor: '#111827'}}>FEELING</StyledTableCell>
                                        <StyledTableCell align="left" style={{backgroundColor: '#111827'}}>REPO</StyledTableCell>
                                        <StyledTableCell align="left" style={{backgroundColor: '#111827'}}>ACTION</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell component="th" scope="row" style={{color: '#A1A6AD'}}>
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="left" style={{color: '#A1A6AD'}}>{row.status}</StyledTableCell>
                                            <StyledTableCell align="left" style={{color: '#A1A6AD'}}>{row.feeling}</StyledTableCell>
                                            <StyledTableCell align="left" style={{color: '#A1A6AD'}}>
                                                <a href={row.githubLink}>{row.githubLink}</a>
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <button
                                                    // onClick={() => onViewDetails?.(row.fullData)}
                                                    onClick={() => navigate(`/participant/${row.id}`)}
                                                    className="bg-[#135BEC] px-4 py-2 rounded-md text-[#FFFFFF] text-md hover:cursor-pointer transition-colors">Details
                                                </button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Container1;