import React, {PureComponent} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Footer from "./components/Footer"
import Header from "./components/Header"
import Board from "./components/Board"
import Start from "./components/Start"
import PropTypes from "prop-types";
import {connect} from "react-redux";
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    }
};

class App extends PureComponent {
    render() {
        return (
            // <BrowserRouter>
            <div className={this.props.classes.root}>
                <Header/>
                {this.props.startGame
                    ? <Board />
                    : <Start />
                }
                <Footer/>
            </div>
            // </BrowserRouter>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

const StyledApp = withStyles(styles)(App);
export default connect(
    state => ({
        startGame: state.gameStatus.startGame
    })
)(StyledApp);