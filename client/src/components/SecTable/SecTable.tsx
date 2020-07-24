import React from 'react';
import './SecTable.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';

const styles = {
  gain: {
    color: "#16a237"
  },
  loss: {
    color: "#a62436"
  },
};

class SecTable extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      secs: [
        {
          symbol: 'AMZN',
          description: 'Amazon',
          quantity: 2,
          purchasePrice: 1250.23,
          currentPrice: 1518.23,
          change: {
            price: 1241.23,
            percent: 23.23,
          },
          meta: {
            currency: 'USD',
            exchange: 'NASDAQ',
          },
        },
        {
          symbol: 'SLCK',
          description: 'Slack',
          quantity: 4,
          purchasePrice: 2250.23,
          currentPrice: 1518.23,
          change: {
            price: 1141.23,
            percent: -13.23,
          },
          meta: {
            currency: 'USD',
            exchange: 'NASDAQ',
          },
        },
        {
          symbol: 'WORK',
          description: 'Blwahaha',
          quantity: 11,
          purchasePrice: 123.23,
          currentPrice: 123.23,
          change: {
            price: 0.00,
            percent: 0.00,
          },
          meta: {
            currency: 'USD',
            exchange: 'NASDAQ',
          },
        },
      ],
    };
  }

  formatSecCurrency(sec: any, number: number): string {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: sec.meta.currency}).format(number);
  }

  calculatePriceChange(firstValue: number, secondValue: number): string {
    const percent = (firstValue / secondValue - 1) * 100;
    return this.formatPercent(percent);
  }

  formatPercent(percent: number): string {
    return percent.toFixed(2) + "%";
  }

  GetChangeClass(change: number) {
    const { classes } = this.props;

    if(change > 0)
      return classes.gain;
    else if(change < 0)
      return classes.loss;

    return null;
  }

  GetArrowImage(change: number) {
    let image = null;

    if(change > 0)
      image = 'arrow-up';
    else if(change < 0)
      image = 'arrow-down';

    return image ? <img src={`images/${image}.png`} /> : null;
  }

  SumSecParemeter(parameter: string) {
    return this.state.secs.reduce((a: number, b: any) => a + Number(b[parameter]), 0);
  }

  render() {
    const { classes } = this.props;
    return (
        <div className="table-container">
          <TableContainer component={Paper}>
            <Table className={classes.root} size='small' aria-label='a dense table'>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Symbol</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">QTY</TableCell>
                  <TableCell align="center">Purchase Price</TableCell>
                  <TableCell align="center">Current Price</TableCell>
                  <TableCell align="center">Today's Change</TableCell>
                  <TableCell align="center">Total Gain/Loss</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {this.state.secs.map((sec: any) => (
                  <TableRow key={sec.symbol}>
                    <TableCell component='th' scope='row' align="center">
                      {sec.symbol}
                    </TableCell>
                    <TableCell align="center">{sec.description}</TableCell>
                    <TableCell align="center">{sec.quantity}</TableCell>
                    <TableCell align="center">{this.formatSecCurrency(sec, sec.purchasePrice)}</TableCell>
                    <TableCell align="center">{this.formatSecCurrency(sec, sec.currentPrice)}</TableCell>
                    <TableCell className={this.GetChangeClass(sec.change.percent)} align="center">
                      {this.formatSecCurrency(sec, sec.change.price)} ({this.formatPercent(sec.change.percent)}) {this.GetArrowImage(sec.change.percent)}
                    </TableCell>
                    <TableCell className={this.GetChangeClass(sec.currentPrice - sec.purchasePrice)} align="center">
                      {this.formatSecCurrency(sec,(sec.currentPrice - sec.purchasePrice) * sec.quantity)} ({this.calculatePriceChange(sec.currentPrice, sec.purchasePrice)}) {this.GetArrowImage(sec.currentPrice - sec.purchasePrice)}
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow key="total">
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell align='center' className={classes.total}>
                    Total
                  </TableCell>
                  <TableCell align="center">{this.SumSecParemeter("change.price")}</TableCell>
                  <TableCell align="center">{this.SumSecParemeter("currentPrice")}}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
    );
  }
}

export default withStyles(styles)(SecTable);
