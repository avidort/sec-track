import React from 'react';
import './Navbar.scss';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default class Navbar extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className="menu-button" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className="title">
                        sec-track
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}
