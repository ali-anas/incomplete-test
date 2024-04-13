import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { PAGINATION_LENGTH } from '../../constants';
import './CUICollapsibleTable.css';

function createData(row) {
  const { customerName, invoiceNumber, date, gstin, billingAddress, shippingAdderess, items, billSundrys, totalAmount } = row;
  return {
    invoiceNumber,
    customerName,
    date,
    gstin,
    totalAmount,
    billingAddress,
    shippingAdderess,
    items,
    billSundrys,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* <TableCell component="th" scope="row">
          {row.name}
        </TableCell> */}
        <TableCell align="center">{row.invoiceNumber}</TableCell>
        <TableCell align="center">{row.customerName}</TableCell>
        <TableCell align="center">{row.gstin}</TableCell>
        <TableCell align="center">{row.date}</TableCell>
        <TableCell align="center">{row.totalAmount}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <div className="push--right--s">
              <Typography variant="body" gutterBottom component="p">
                Billing Address: {row.billingAddress}
              </Typography>
              <Typography variant="body2" gutterBottom component="p">
                Shipping Address: {row.shippingAdderess}
              </Typography>
              

                <Typography variant="h6" gutterBottom component="p">
                  Items Included
                </Typography>

                <Table size="small" aria-label="purchases">
                <TableHead>
                    <TableRow>
                      <TableCell>Item Name</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">Total Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.items.map((itemsRow) => (
                      <TableRow key={itemsRow.itemName}>
                        <TableCell component="th" scope="row">
                          {itemsRow.itemName}
                        </TableCell>
                        <TableCell>{itemsRow.quantity}</TableCell>
                        <TableCell align="center">{itemsRow.price}</TableCell>
                        <TableCell align="center">
                          {Math.round(itemsRow.amount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

const createRowsData = (data, currPage) => {
  return data.slice(currPage*PAGINATION_LENGTH - PAGINATION_LENGTH, currPage * PAGINATION_LENGTH).map((row, i) =>  createData(row))
}

export default function CUICollapsibleTable({ data, currPage }) {
  const [rows, setRows] = React.useState(createRowsData(data, currPage));
  React.useEffect(() => {
    setRows(createRowsData(data, currPage));
  }, [currPage])
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">Invoice Number</TableCell>
            <TableCell align="center">Customer Name</TableCell>
            <TableCell align="center">GSTIN&nbsp;(g)</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.gstin} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}