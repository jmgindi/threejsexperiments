import * as THREE from 'three';
// import '../js/three.js';
import board from './board.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize ( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry_a = new THREE.IcosahedronGeometry();
const material_a = new THREE.MeshBasicMaterial( {color : 0x00ff00, wireframe: true} );
const cube_a = new THREE.Mesh( geometry_a, material_a );
//scene.add( cube_a );
const newBoard = board();
scene.add(newBoard);

//camera position
camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );
    
    renderer.render( scene, camera );
}

animate();
