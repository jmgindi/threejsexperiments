import '../js/three.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize ( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry_a = new THREE.IcosahedronGeometry();
var material_a = new THREE.MeshBasicMaterial( {color : 0x00ff00, wireframe: true} );
var cube_a = new THREE.Mesh( geometry_a, material_a );
scene.add( cube_a );

var geometry_b = new THREE.BoxGeometry

camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );
    cube_a.rotation.x += .01;
    cube_a.rotation.y += .01;
    renderer.render( scene, camera );
}

animate();
