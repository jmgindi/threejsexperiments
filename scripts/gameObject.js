import '../js/three.js';

export default class gameObject extends THREE.Geometry {
    constructor(geometry, material, x, y, z) {
        this.geometry = geometry || new THREE.CylinderGeometry(5, 5, 20, 32);
        this.material = material || new THREE.MeshBasicMaterial({ color: '#0000ff' });
        this.positionX = x;
        this.positionY = y;
        this.positionZ = z;
        this.collisions = [];
        this.position.set(this.positionX, this.positionY, this.positionZ);
        this.initRotationPoint();
        this.initHitbox();
    }

    initHitbox = () => {
        for (let vertex = 0; vertex < this.geometry.vertices; vertex++) {
            const localVertex = this.geometry.vertices[vertex].clone();
            const globalVertex = localVertex.applyMatrix4(this.geometry.matrix)
            const directionVector = globalVertex.sub( this.geometry.position );
        
            const ray = new THREE.Raycaster( this.geometry.position, directionVector.clone().normalize() );
            this.collisions.push(ray);
        }
    }

    initRotationPoint = () => {
        this.rotationPoint = new THREE.Object3D();
        this.rotationPoint.position.set(this.positionX, this.positionY, this.positionZ);
    }
}

// piece = [
//     geometry,
//     material,
//     hitbox = { bounds },
//     rotationPoint = center of bottom of piece,
//     // position = rotationPoint
// ]

// scene [
//     camera,
//     skybox(background),
//     objects [
//         mesh {
//             geometry,
//             material
//         },
//         hitbox,
//         controls,
//         etc...
//     ],
// ]