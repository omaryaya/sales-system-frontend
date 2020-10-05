import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


const TableHeader = (props) => {
    const { headCells } = props;
    const { tableCellClass } = props;
    return (
        <TableHead>
            <TableRow key={"head"}>
                {headCells.map(head => (
                    <TableCell className={tableCellClass} key={head.id}>{head.label}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default TableHeader;