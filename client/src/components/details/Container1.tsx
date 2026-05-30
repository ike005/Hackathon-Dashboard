import {Link, useNavigate} from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import StyledTableCell from "@mui/material/TableCell";
import StyledTableRow from "@mui/material/TableRow";

import {Link2} from "lucide-react";

import usersInfo from "../../utils/usersInfo";
import type {Container1Props} from "../../types/overviewTypes.ts";

const Container1 = ({usersData}: Container1Props) => {

    const rows = usersInfo(usersData);
    const navigate = useNavigate();

    return (
        <>
            <div
                className="flex flex-col w-[100%] rounded-md gap-4 border-2 border-[#C9C6D9]">
                <div className="flex flex-col md:flex-row md:justify-between gap-2">
                    {/*md:max-w-1/3*/}
                    <div className="flex items-center w-full gap-2">
                        <TableContainer component={Paper}>
                            <Table sx={{maxWidth: '100%'}} aria-label="customized table"  className="bg-[#FFFFFF]">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell style={{backgroundColor: '#F0F3FF', color: '#000000', textAlign: 'center', fontWeight: 'bold'}}>Name</StyledTableCell>
                                        <StyledTableCell align="left" style={{backgroundColor: '#F0F3FF', color: '#000000', textAlign: 'center', fontWeight: 'bold'}}>Repo</StyledTableCell>
                                        <StyledTableCell align="left" style={{backgroundColor: '#F0F3FF', color: '#000000', textAlign: 'center', fontWeight: 'bold'}}>Email</StyledTableCell>
                                        <StyledTableCell align="left" style={{backgroundColor: '#F0F3FF', color: '#000000', textAlign: 'center', fontWeight: 'bold'}}>Gender</StyledTableCell>
                                        <StyledTableCell align="left" style={{backgroundColor: '#F0F3FF', color: '#000000', textAlign: 'center', fontWeight: 'bold'}}>Info</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell component="th" scope="row" style={{color: '#000000', textAlign: 'center'}}>
                                                {row.name}
                                            </StyledTableCell>

                                            <StyledTableCell align="left" style={{ color: "#A1A6AD", textAlign: "center" }}>
                                                <Link to={row.githubLink} className="inline-flex items-center gap-2 no-underline text-[#135BEC] hover:text-[#3726CD]">
                                                    <Link2 size={16} />
                                                    <span>{row.githubLink}</span>
                                                </Link>
                                            </StyledTableCell>

                                            <StyledTableCell align="left" style={{color: '#000000', textAlign: 'center'}}>{row.email}</StyledTableCell>
                                            <StyledTableCell align="left" style={{color: '#000000', textAlign: 'center'}}>{row.gender}</StyledTableCell>
                                            <StyledTableCell align="left" style={{ textAlign: 'center'}}>
                                                <button
                                                    // onClick={() => onViewDetails?.(row.fullData)}
                                                    onClick={() => navigate(`/participant/${row.id}`)}
                                                    className="rounded-md text-[#135BEC] hover:text-[#3726CD] font-semibold text-md cursor-pointer transition-colors">View Profile
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