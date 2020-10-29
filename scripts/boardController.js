//import * as THREE from 'three';
import '../js/three.js';
//import './game.js'
//import {OrbitControls} from 'three';

BOARDGAME.BoardController = (options) => {
    options = options || {};

    const containerE1 = options.containerE1 || null;

    const assetsUrl = options.assetsUrl || '';

    this.drawBoard = () => {
        initEngine();

        initObjects (() => {
            onAnimationFrame();
        })

        console.log('drawBoard');
    };

    let renderer;
    let scene;
    let camera;
    //let cameraController;

    const initEngine = () => {
        const viewWidth = containerE1.offsetWidth;
        const viewHeight = containerE1.offsetHeight;

        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setSize(viewWidth, viewHeight);

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(35, viewWidth / viewHeight, 1, 1000);
        camera.position.set(0, 120, 150);

        //cameraController = new OrbitControls(camera, containerE1);

        scene.add(camera);

        containerE1.appendChild(renderer.domElement);
    }

    const initObjects = (callback) => {
        const geometry = new THREE.BoxGeometry(50, 50, 50);
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube)

        callback();
    }

    const onAnimationFrame = () => {
        requestAnimationFrame(onAnimationFrame);

        //cameraController.update();

        renderer.render(scene, camera);
    }
}