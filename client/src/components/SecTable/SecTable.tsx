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
        total: 0,
        total_change: 0,
      },
    };
  }

  componentDidMount() {
    // TODO @Ran -> @Avidor: consider using an observable here
    setInterval(() => emitter.emit('get-update'), 3000);
    emitter.on('update', (data: IData) => {
      this.setState({
        secs: data,
      });
    });
  }

  formatSecCurrency(number: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
  }

  calculatePriceChange(firstValue: number, secondValue: number): string {
    const percent = (firstValue / secondValue - 1) * 100;
    return this.formatPercent(percent);
  }

  formatPercent = (percent: number) => percent.toFixed(2) + '%';

  getChangeClass(change: number) {
    const { gain, loss } = this.props.classes;
    return change > 0 ? gain : loss;
  }

  getArrowImage(change: number) {
    let image = null;
    image = change > 0 ? 'arrow-up' : 'arrow-down';
    return <img src={`images/${image}.png`} alt={image} />;
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
                  <TableCell align='center'>{this.formatSecCurrency(sec.purchasePrice)}</TableCell>
                  <TableCell align='center'>{this.formatSecCurrency(sec.currentPrice)}</TableCell>
                  <TableCell className={this.getChangeClass(sec.change.percentage)} align='center'>
                    {this.formatSecCurrency(sec.change.price)} ({this.formatPercent(sec.change.percentage)}){' '}
                    {this.getArrowImage(sec.change.percentage)}
                  </TableCell>
                  <TableCell className={this.getChangeClass(sec.currentPrice - sec.purchasePrice)} align='center'>
                    {this.formatSecCurrency((sec.currentPrice - sec.purchasePrice) * sec.quantity)} (
                    {this.calculatePriceChange(sec.currentPrice, sec.purchasePrice)}){' '}
                    {this.getArrowImage(sec.currentPrice - sec.purchasePrice)}
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

                <TableCell align='center'>{this.formatSecCurrency(this.state.secs.total_change)}</TableCell>
                <TableCell align='center'>{this.formatSecCurrency(this.state.secs.total)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default withStyles(styles as {})(SecTable);
