import React from 'react';
import './App.css';
const THREE = require('three');
const THREEAR = require('threear');


class App extends React.Component {

  render(){

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    camera.position.z = 5;

    var renderer = new THREE.WebGLRenderer({
				// antialias	: true,
				alpha: true
			});
		renderer.setClearColor(new THREE.Color('lightgrey'), 0)
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.domElement.style.position = 'absolute'
		renderer.domElement.style.top = '0px'
		renderer.domElement.style.left = '0px'
    document.body.appendChild( renderer.domElement );

    var markerGroup = new THREE.Group();
    var fixedGroup = new THREE.Group();
		scene.add(markerGroup);
		scene.add(fixedGroup);

    var source = new THREEAR.Source({ renderer, camera });

    THREEAR.initialize({ source: source }).then((controller) => {
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshNormalMaterial();
        var cube = new THREE.Mesh( geometry, material );
        var cube2 = new THREE.Mesh( new THREE.BoxGeometry( 2, 2, 2 ), material );
        scene.add( cube );
        scene.add( cube );
        scene.add( cube2 );
        markerGroup.add(cube);
        fixedGroup.add(cube2);
        var path = './data/patt.hiro';
        var patternMarker = new THREEAR.PatternMarker({
    					patternUrl: path,
    					markerObject: markerGroup
    				});
  	    controller.trackMarker(patternMarker);
        let lulz = false;

        console.log(controller.arController);
        controller.arController.addEventListener('getMarker', function(ev) {
          // if (!lulz) alert("Wow! I'm a Scorpio too!");
          // console.log(ev.data);
          // console.log(ev.data.marker);
          // console.log('marker pos: ', ev.data.marker.pos);
          // console.log(cube.position);
          // console.log(markerGroup.position);
          // console.log(fixedGroup.position);
          fixedGroup.position.set(markerGroup.position.x, markerGroup.position.y, markerGroup.position.z);
          // console.log(fixedGroup.position);
          // cube.position.set(ev.data.marker.pos[0], ev.data.marker.pos[1], 4);
          // console.log(cube.position);
          // cube.applyMatrix4(ev.data.matrix);
          lulz = true;
        });





        


    requestAnimationFrame(function animate(nowMsec){
      console.log(camera.position);
        // measure time
				var lastTimeMsec = lastTimeMsec || nowMsec-1000/60;
				var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
				lastTimeMsec = nowMsec;
	      renderer.render( scene, camera );
        controller.update( source.domElement );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        // keep looping
			  requestAnimationFrame( animate );
        });

    });
  return(
  <div></div>
  )
  }
}

export default App;
