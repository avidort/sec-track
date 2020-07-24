import React from 'react';
import './SecTable.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class SecTable extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            secs: [
                {
                    symbol: "AMZN",
                    description: "Amazon",
                    quantity: 2,
                    purchasePrice: 1250.23,
                    currentPrice: 1518.23,
                    change: {
                        price: 1241.23,
                        percent: 23.23
                    },
                    meta: {
                        currency: "$",
                        exchange: "USD"
                    }
                }
            ]
        }
    }

    render() {
        return (
            <TableContainer component={Paper} className="table-container">
                <Table className="table" size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.secs.map((sec: any) => (
                            <TableRow key={sec.symbol}>
                                <TableCell component="th" scope="row">
                                    {sec.name}
                                </TableCell>
                                <TableCell align="right">{sec.description}</TableCell>
                                <TableCell align="right">{sec.quantity}</TableCell>
                                <TableCell align="right">{sec.purchasePrice}</TableCell>
                                <TableCell align="right">{sec.currentPrice}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    );
    }
}
