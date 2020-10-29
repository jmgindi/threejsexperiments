import * as THREE from 'three';

export class Board{
    
    
    constructor(){
        this.geometry = new THREE.BufferGeometry();

        this.vertices = new Float32Array( [
            -1.0, -1.0,  1.0,
            1.0, -1.0,  1.0,
            1.0,  1.0,  1.0,

            1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0, -1.0,  1.0
        ] );
    }
    
    static createBoard(){
        board.setAttribute('position', new THREE.BufferAttribute(this.vertices, 3));
        
        //move this to the constructor later
        const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        
        const board = THREE.Mesh(this.geometry, material);

        return board;
    }
}

