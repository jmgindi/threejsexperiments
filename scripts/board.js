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
    const board_material = new THREE.MeshBasicMaterial( {color: 0xffffff} );

    const space = new THREE.Mesh(geometry, board_material);

    const frame = new THREE.WireframeGeometry(geometry);

    const line = new THREE.LineSegments(frame);
    line.material.depthTest = false;
    line.material.opacity = 0.75;
    line.material.transparent = true;

    return board;
}
