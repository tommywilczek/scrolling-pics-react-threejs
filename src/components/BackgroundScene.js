import React, { Component } from 'react'
import { RetrowaveScene } from '../retrowave-scene/retrowave_scene'
import NavBar from './NavBar';


export default class BackgroundScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prevScrollY: 0
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, { passive: true })
        let retrowaveScene = new RetrowaveScene('../retrowave-scene/');
        retrowaveScene.prepareScene(true, true);
        retrowaveScene.setAnimationSpeed(5);
        // retrowaveScene.setAnimationSpeed(-5);

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll(event) {
        // do something like call `this.setState`
        // access window.scrollY etc

        console.log(`window.scrollY`, window.scrollY);
        if (event.deltaY < 0) {
            // has scrolled up
            console.log('scrolled up');
            // camera.position.z -= .1
        }
        // if (this.state.prevScrollY > window.scrollY) {
        //     // has scrolled down
        //     console.log('scrolled down');
        //     // camera.position.z += .1
        // }
    }
    render() {
        return (
            <><div
                id="retrowaveSceneContainer"
                style={{ position: 'absolute', zIndex: '0' }}
                ref={(mount) => { this.mount = mount; }} />
                <NavBar />
            </>
        )
    }
}
