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
import emitter from '../../data/events';
import { ISecurityData, IData } from '../../../../models/data.model';

const styles = {
  gain: {
    color: '#16a237',
  },
  loss: {
    color: '#a62436',
  },
  bold: {
    fontWeight: 'bold',
  },
};

class SecTable extends React.Component<any, { secs: IData }> {
  constructor(props: any) {
    super(props);
    this.state = {
      secs: {
        stocks: [] as ISecurityData[],
        totalValue: 0,
        totalChange: 0,
        totalGL: {
          price: 0,
          percentage: 0
        },
      },
    };
  }

  componentDidMount() {
    setInterval(() => emitter.emit('get-update'), 30 * 1000);
    emitter.on('update', (data: IData) => this.setState({ secs: data }));
  }

  formatCurrency(number: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
  }

  calculatePriceChange(firstValue: number, secondValue: number): string {
    const percent = (firstValue / secondValue - 1) * 100;
    return this.formatPercent(percent);
  }

  formatPercent = (percent: number) => percent.toFixed(2) + '%';

  getChangeClass(change: number) {
    const { gain, loss } = this.props.classes;

    if (change > 0) {
      return gain;
    } else if (change < 0) {
      return loss;
    }

    return null;
  }

  getArrowImage(change: number) {
    let image = null;

    if (change > 0) {
      image = 'arrow-up';
    } else if (change < 0) {
      image = 'arrow-down';
    }

    return image ? <img src={`images/${image}.png`} /> : null;
  }


  render() {
    const { classes } = this.props;
    return (
      <div className='table-container'>
        <TableContainer component={Paper}>
          <Table className={classes.root} size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Symbol</TableCell>
                <TableCell align='center'>Description</TableCell>
                <TableCell align='center'>QTY</TableCell>
                <TableCell align='center'>Purchase Price</TableCell>
                <TableCell align='center'>Current Price</TableCell>
                <TableCell align='center'>Total Value</TableCell>
                <TableCell align='center'>Today's Change</TableCell>
                <TableCell align='center'>Total Gain/Loss</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.secs.stocks.map((sec: ISecurityData) => (
                <TableRow key={sec.symbol}>
                  <TableCell component='th' scope='row' align='center'>
                    {sec.symbol}
                  </TableCell>
                  <TableCell align='center'>{sec.description}</TableCell>
                  <TableCell align='center'>{sec.quantity}</TableCell>
                  <TableCell align='center'>{this.formatCurrency(sec.purchasePrice)}</TableCell>
                  <TableCell align='center'>{this.formatCurrency(sec.currentPrice)}</TableCell>
                  <TableCell align='center'>{this.formatCurrency(sec.currentPrice * sec.quantity)}</TableCell>
                  <TableCell className={this.getChangeClass(sec.change.price)} align='center'>
                    {this.formatCurrency(sec.change.price)} ({this.formatPercent(sec.change.percentage)})
                    {this.getArrowImage(sec.change.percentage)}
                  </TableCell>
                  <TableCell className={this.getChangeClass(sec.total.price)} align='center'>
                    {this.formatCurrency(sec.total.price)} (
                    {this.formatPercent(sec.total.percentage)})
                    {this.getArrowImage(sec.total.percentage)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow key='total'>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell align='center' className={classes.bold}>
                  Total
                  </TableCell>

                <TableCell align='center'>
                  {this.formatCurrency(this.state.secs.totalValue)}
                </TableCell>

                <TableCell align='center' className={this.getChangeClass(this.state.secs.totalChange)}>
                  {this.formatCurrency(this.state.secs.totalChange)}
                  {this.getArrowImage(this.state.secs.totalChange)}
                </TableCell>

                <TableCell align='center' className={this.getChangeClass(this.state.secs.totalGL.price)}>
                  {this.formatCurrency(this.state.secs.totalGL.price)} (
                    {this.formatPercent(this.state.secs.totalGL.percentage)})
                    {this.getArrowImage(this.state.secs.totalGL.percentage)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default withStyles(styles as {})(SecTable);
