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
        this.objects = {};
        this.collisions = {};

        this.drawBoard = function() {
            this.initEngine();
            this.initLights();
            this.initMaterials();
            this.initGround();
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
        this.scene.background = new THREE.Color('#00ffff');

        this.camera = new THREE.PerspectiveCamera(25, viewWidth / viewHeight, 1, 1000);
        this.camera.position.set(100, 320, 450);

        this.initCameraControls();

        this.scene.add(this.camera);
    
        this.containerE1.appendChild(this.renderer.domElement);
    }

    initCameraControls = () => {
        this.cameraController = new OrbitControls(this.camera, this.containerE1);
        this.cameraController.maxPolarAngle = Math.PI / 2.05;
        this.cameraController.target = new THREE.Vector3(100, 0, 100);
    }
    
    initLights = () => {
        this.lights.topLight = new THREE.PointLight();
        this.lights.topLight.position.set(100, 150, 100);
        this.lights.topLight.intensity = 1.0;
        this.lights.topLight.target = new THREE.Vector3(100, 0, 100);

        this.scene.add(this.lights.topLight);
    }

    initMaterials = () => {
        this.materials.boardMaterial = new THREE.MeshLambertMaterial({
            color: 0xdd2200
        });
        this.materials.groundMaterial = new THREE.MeshBasicMaterial({
            transparent: true,
            side: THREE.DoubleSide,
            color: 0x507d2a
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
        board.position.x += 100;
        board.position.z += 100;
        this.initDetection(piece, 1, 'board');
        this.objects.push(piece);
        this.scene.add(board);
    }

    initGround = () => {
        this.groundModel = new THREE.Mesh((new THREE.PlaneGeometry(1000, 1000, 1, 1)), this.materials.groundMaterial);
        this.groundModel.position.set(this.squareSize * 4, -1.52, this.squareSize * 4);
        this.groundModel.rotation.x = -90 * Math.PI / 180;
        this.scene.add(this.groundModel);
    }

    initPiece = () => {
        const piece = new THREE.Mesh(
            new THREE.CylinderGeometry(5, 5, 20, 32),
            new THREE.MeshBasicMaterial({ color: '#0000ff' })
        );
        piece.position.set(150, 17, 150);
        this.initDetection(piece, 1, 'piece');
        this.objects.push(piece);
        this.scene.add(piece);
    }

    initDetection = (mesh, scale, name, type='collision') => {
        const hitBox = new THREE.box3().setFromObject(mesh);

        const bounds = {
            type: type,
            xMin: hitBox.min.x,
            xMax: hitBox.max.x,
            yMin: hitBox.min.y,
            yMax: hitBox.max.y,
            zMin: hitBox.min.z,
            zMax: hitBox.max.z,
        };

        this.collisions.update({ name: bounds });
    }

    initObjects = (callback) => {

        this.scene.add(new THREE.AxesHelper(200));
    
        this.initBoard();

        this.initPiece();

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

    cameraToggle = () => {
        document.addEventListener('click', (e) => {
            if (!e.target.matches('.camera-toggle')) return;
            this.cameraController.enabled = !this.cameraController.enabled;
        });
    }
}
