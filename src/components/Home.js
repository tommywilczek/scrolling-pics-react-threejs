import React, { Component } from 'react'
import * as THREE from 'three';
import * as dat from 'dat.gui'

export default class Home extends Component {
    componentDidMount() {
        // Debug
        const gui = new dat.GUI()

        const width = this.mount.clientWidth
        const height = this.mount.clientHeight
        //ADD SCENE
        this.scene = new THREE.Scene()
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        )
        this.camera.position.z = 4
        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor('#000000')
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)

        // Textures
        const textureLoader = new THREE.TextureLoader();

        const purpleGridTexture = textureLoader.load('./purple_grid_straight.png')

        //ADD CUBE
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: '#433F81' })
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        this.cube.position.x = 2;
        this.scene.add(this.cube)

        //ADD CYLINDER
        const cylinderGeometry = new THREE.CylinderBufferGeometry(5, 5, 3, 64)
        const cylinderMaterial = new THREE.MeshBasicMaterial({ color: '#433F81' })
        cylinderMaterial.roughness = 0;
        cylinderMaterial.metalness = 0.7;
        cylinderMaterial.map = purpleGridTexture;
        this.cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
        this.cylinder.position.y = -1.5;
        this.cylinder.position.z = -1.75;
        this.cylinder.rotation.z = 1.57079633; // 90 degrees in radians
        // this.cylinder.position.x = -2;
        this.scene.add(this.cylinder)

        const cylinderFolder = gui.addFolder('Cylinder');
        const positionFolder = cylinderFolder.addFolder('Position');
        const rotationFolder = cylinderFolder.addFolder('Rotation');
        // cylinderFolder.add(this.cylinderGeometry, 'x').min(3).max(64).step(0.01);
        positionFolder.add(this.cylinder.position, 'x').min(-3).max(3).step(0.01);
        positionFolder.add(this.cylinder.position, 'y').min(-6).max(6).step(0.01);
        positionFolder.add(this.cylinder.position, 'z').min(-15).max(3).step(0.01);
        rotationFolder.add(this.cylinder.rotation, 'x').min(-10).max(10).step(0.01);
        rotationFolder.add(this.cylinder.rotation, 'y').min(-10).max(10).step(0.01);
        rotationFolder.add(this.cylinder.rotation, 'z').min(-10).max(10).step(0.01);


        this.start()
    }
    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }
    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }
    stop = () => {
        cancelAnimationFrame(this.frameId)
    }
    animate = () => {
        this.cube.rotation.x += 0.01
        this.cube.rotation.y += 0.01
        this.cylinder.rotation.x += 0.01
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }
    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }
    render() {
        return (
            <div
                style={{ width: '800px', height: '800px' }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}
