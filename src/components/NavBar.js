import React, { Component } from 'react'

export default class NavBar extends Component {

    render() {
        return (
            <div style={{ position: 'absolute', zIndex: '1' }}>
                <p>I'M A NAV BAR!</p>
            </div>
        );
    }
}