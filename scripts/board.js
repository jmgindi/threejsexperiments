// import '../js/three.js';
import * as THREE from 'three';

export default function board() {
    const geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array( [
        -1.0, -1.0,  1.0,
        1.0, -1.0,  1.0,
        1.0,  1.0,  1.0,

        1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0, -1.0,  1.0
    ] );
    
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
    //move this to the constructor later
    const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );

    const board = new THREE.Mesh(geometry, material);

    return board;
}

