//import * as THREE from 'three';
import '../js/three.js';
//import './game.js'
//import {OrbitControls} from 'three';

export default class BoardController {
    constructor(options) {
        this.options = options || {};
        this.containerE1 = options.containerE1 || null;
        this.assetsUrl = options.assetsUrl || '';
        this.renderer;
        this.scene;
        this.camera;

        this.drawBoard = function() {
            this.initEngine();
            this.initObjects(function () {
                this.onAnimationFrame();
            }.bind(this));

            console.log('drawBoard');
        };
    }
    initEngine() {
        const viewWidth = this.containerE1.offsetWidth;
        const viewHeight = this.containerE1.offsetHeight;
    
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setSize(viewWidth, viewHeight);
    
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(35, viewWidth / viewHeight, 1, 1000);
        this.camera.position.set(0, 120, 150);
    
        //cameraController = new OrbitControls(camera, containerE1);
    
        this.scene.add(this.camera);
    
        this.containerE1.appendChild(this.renderer.domElement);
    }
    
    initObjects = (callback) => {
        const geometry = new THREE.BoxGeometry(50, 50, 50);
        const material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube)
    
        callback();
    }
    
    onAnimationFrame = () => {
        requestAnimationFrame(this.onAnimationFrame);
    
        //cameraController.update();
    
        this.renderer.render(this.scene, this.camera);
    }
}
