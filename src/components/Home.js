import React, { Component } from 'react'
import BackgroundScene from './BackgroundScene';
import NavBar from './NavBar';


export default class Home extends Component {
    render() {
        return (
            <>
                <NavBar />
                <BackgroundScene />
            </>
        )
    }
}
