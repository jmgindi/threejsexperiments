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
        this.lights = {};
        this.materials = {};
        this.pieceGeometry = null;
        this.boardModel;
        this.groundModel;
        this.squareSize = 10;

        this.drawBoard = function() {
            this.initEngine();
            this.initLights();
            this.initMaterials();
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
    
    initLights = () => {
        this.lights.topLight = new THREE.PointLight();
        this.lights.topLight.position.set(0, 150, 0);
        this.lights.topLight.intensity = 1.0;

        this.scene.add(this.lights.topLight);
    }

    initMaterials = () => {
        this.materials.boardMaterial = new THREE.MeshLambertMaterial({
            color: 0xdd2200
        });
        this.materials.groundMaterial = new THREE.MeshBasicMaterial({
            transparent: true,
            color: 0x9999ff
        })
        this.materials.darkSquareMaterial = new THREE.MeshLambertMaterial({
            color: 0x5c1400
        });
        this.materials.lightSquareMaterial = new THREE.MeshLambertMaterial({
            color: 0xe6e4da
        });
        this.materials.whitePieceMaterial = new THREE.MeshPhongMaterial({
            color: 0xe9e4bd,
            shininess: 20
        });
        this.materials.blackPieceMaterial = new THREE.MeshPhongMaterial({
            color: 0x9f2200,
            shininess: 20
        });
        this.materials.pieceShadowPlane = new THREE.MeshBasicMaterial({
            transparent: true,
            color: 0x111111
        });
    }

    initBoard = () => {
        const boardGeometry = new THREE.BoxGeometry(200, 15, 200);
        const board = new THREE.Mesh(boardGeometry, this.materials.boardMaterial);
        this.scene.add(board);
    }

    initGround = () => {
        this.groundModel = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 1, 1, materials.groundMaterial));
        this.groundModel.position.set(this.squareSize * 4, -1.52, this.squareSize * 4);
        this.groundModel.rotation.x = -90 * Math.PI / 180;
        this.scene.add(this.groundModel);
    }

    initObjects = (callback) => {

        this.scene.add(new THREE.AxesHelper(200));

        this.initBoard()

        // for (let x = 0; x <= 31; x++) {
        //     if (x > 15) {
        //         initPiece(this.materials.whitePieceMaterial)
        //     } else {
        //         initPiece(this.materials.blackPieceMaterial)
        //     }
        // }
    
        callback();
    }
    
    onAnimationFrame = () => {
        requestAnimationFrame(this.onAnimationFrame);
        this.cameraController.update();
        this.renderer.render(this.scene, this.camera);
    }
}
