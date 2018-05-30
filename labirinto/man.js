function criarPersonagem() {
    var mesh;
    var url = 'models/skinned/marine/marine_anims_core.json';
    new THREE.ObjectLoader().load( url, function ( loadedObject ) {
        console.log(loadedObject);
    	loadedObject.traverse( function ( child ) {
    		if ( child instanceof THREE.SkinnedMesh ) {
    			mesh = child;
    			console.log("mesh", mesh);
    		}
    	} );
    });
    
	if ( mesh === undefined ) {
		alert( 'Unable to find a SkinnedMesh in this place:\n\n' + url + '\n\n' );
		return;
	}
	// Add mesh and skeleton helper to scene
	mesh.rotation.y = - 135 * Math.PI / 180;
	/*scene.add( mesh );
	skeleton = new THREE.SkeletonHelper( mesh );
	skeleton.visible = false;
	scene.add( skeleton );*/
	return mesh;
}