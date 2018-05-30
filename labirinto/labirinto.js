/*global THREE*/
let larguraCubo = 1;
let alturaCubo = 1;

let scene, camera, renderer, controls, luz;
let tamanhoLabirinto;
let tamanhoMapa;
let personagem;
init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
  renderer = new THREE.WebGLRenderer();
  controls = new THREE.OrbitControls( camera );
  
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  camera.position.y = 5;
  camera.position.z = 5;
  camera.zoom = 0.5;
  camera.updateProjectionMatrix();
  
  luz = new THREE.AmbientLight( 0x404040, 5 ); // soft white light
  scene.add( luz );
  
  /*luz = new THREE.PointLight( 0xffffff, 10, 100 );
  luz.position.set( 0, 0, 0 );*/
  scene.add(luz);
  
  criarMuitosCubos();
  criarChao();
  criarPersonagem();
  
}

function criarCubo(posZ, posX, alturaOffset, larguraOffset) {
  let geometry = new THREE.BoxGeometry( larguraCubo, 1, 1 );
  let texture = new THREE.TextureLoader().load( 'textura.jpg' );
  // let material = new THREE.MeshBasicMaterial( { color: 0xFF0000 });
  let material = new THREE.MeshBasicMaterial( { map: texture } );
  let cube = new THREE.Mesh( geometry, material );
  
  cube.position.z = (posZ - tamanhoLabirinto / 2) * larguraCubo + larguraOffset;
  cube.position.y = alturaOffset;
  cube.position.x = (posX - tamanhoLabirinto / 2) * larguraCubo + larguraOffset;
  scene.add( cube );
}

function criarMuitosCubos() {
  let labirinto = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,1],
    [1,0,1,1,1,1,0,1,0,1,0,1,0,1,0,0,1],
    [1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,1],
    [1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,0,1],
    [1,0,1,0,0,1,0,1,0,0,0,0,0,1,0,0,1],
    [1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,0,1],
    [1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,0,1],
    [1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,0,1],
    [1,0,1,0,0,1,0,1,0,1,1,1,0,1,1,0,1],
    [1,0,1,0,0,1,0,1,0,0,0,0,0,0,1,0,1],
    [1,0,1,0,0,1,0,1,1,1,1,1,0,0,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
    [1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,1],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ];
  tamanhoLabirinto = labirinto[0].length;
  let larguraOffset = larguraCubo / 2;
  let alturaOffset = alturaCubo / 2;
  
  for (let i = 0; i < tamanhoLabirinto; i++) {
    for (let j = 0; j < labirinto[i].length; j++) {
      if (labirinto[i][j] === 1) {
        criarCubo(i, j, alturaOffset, larguraOffset);
      }
    }
  }
  tamanhoMapa = tamanhoLabirinto * larguraCubo;
}

function criarChao() {
  tamanhoMapa = 20;
  let chaoGeometria = new THREE.PlaneGeometry(tamanhoMapa, tamanhoMapa);
  let texture = new THREE.TextureLoader().load( 'grama.jpg' );
  let chaoMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide});

  let chao = new THREE.Mesh(chaoGeometria, chaoMaterial);
  chao.position.set(0, 0.01, 0);
  chao.rotation.x = 90 * Math.PI / 180;
  scene.add(chao);
}

function animate() {
  controls.update();
	requestAnimationFrame( animate );
	renderer.render(scene, camera);
};

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  var keyCode = event.which;
  if (keyCode == 87) { //w
    	personagem.translateZ(0.1);
  } else if (keyCode == 83) { //s
    	personagem.translateZ(-0.1);
  } else if (keyCode == 65) { //a
  	personagem.translateX(0.1);
  } else if (keyCode == 68) { //d
  	personagem.translateX(-0.1);
  } else if (keyCode == 82) { //r
    personagem.translateY(-0.1);
  } else if (keyCode == 84) {//t
    personagem.translateY(0.1);
  }
};

function criarPersonagem() {
  var url = 'models/skinned/marine/marine_anims_core.json';
  new THREE.ObjectLoader().load( url, function ( loadedObject ) {
      console.log(loadedObject);
  	loadedObject.traverse( function ( child ) {
  		if ( child instanceof THREE.SkinnedMesh ) {
  			personagem = child;
  			personagem.rotation.y = - 135 * Math.PI / 180;
  			personagem.scale.set( 0.004, 0.004, 0.004 )
	      scene.add( personagem );
  		}
  	});
  });
	// Add mesh and skeleton helper to scene
	
	/*skeleton = new THREE.SkeletonHelper( mesh );
	skeleton.visible = false;
	scene.add( skeleton );*/
}