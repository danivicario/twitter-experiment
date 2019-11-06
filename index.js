// Dani Vicario - index experiment (threejs) - Sat 2 Nov 2019 01:11:19 CET
let camera;
let scene;
let renderer;
let geometry;
let material;
let mesh;
var capturer;

init();
animate();

function init() {
  // capturer = new CCapture({ format: "webm" })

  // capturer.start();
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.z = 1;

  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh(geometry, material);
  scene.background = new THREE.Color("black");
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;
  document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  // capturer.capture(document.querySelector("canvas"));

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
}

document.body.onclick = function() {
  // capturer.stop();

  // default save, will download automatically a file called {name}.extension (webm/gif/tar)
  capturer.save();
};
