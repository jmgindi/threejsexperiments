// import * as THREE from 'three';
// import { OrbitControls } from 'three-orbitcontrols';
import OrbitControls from '../js/orbitControls.js';
import '../js/three.js';
// import './game.js'

export default class BoardController {
    constructor(options) {
        this.options = options || {};
        this.containerE1 = options.containerE1 || null;
        this.assetsUrl = options.assetsUrl || '';
        this.renderer;
        this.scene;
        this.camera;
        this.cameraController;

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

        this.camera = new THREE.PerspectiveCamera(25, viewWidth / viewHeight, 1, 1000);
        this.camera.position.set(0, 10, 150);
    
        this.cameraController = new OrbitControls(this.camera, this.containerE1);
    
        this.scene.add(this.camera);
    
        this.containerE1.appendChild(this.renderer.domElement);
    }
    
    initObjects = (callback) => {
        const geometry = new THREE.BoxGeometry(50, 0, 50);
        const material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube)
    
        callback();
    }
    
    onAnimationFrame = () => {
        requestAnimationFrame(this.onAnimationFrame);
        this.cameraController.update();
        this.renderer.render(this.scene, this.camera);
    }
}
