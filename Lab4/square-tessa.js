"use strict";

var canvas;
var gl;

var theta = 0.0;
var thetaLoc;
var direction = 1;
var speed = 50;

function changeDir(){
	direction *= -1;
}

function initRotSquare(){
	
	canvas = document.getElementById( "rot-canvas" );
	gl = WebGLUtils.setupWebGL( canvas, "experimental-webgl" );
	if( !gl ){
		alert( "WebGL isn't available" );
	}
	
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
		
		
	canvas.addEventListener( "mousedown", function( event ){
		var a= Math.random();
		var b= Math.random();
		var c= Math.random();
		gl.clearColor( a, b, c, 2.0 );
	} );
	
	

	var program = initShaders( gl, "rot-v-shader", "rot-f-shader" );
	gl.useProgram( program );

	var vertices = [
		0.7,0.0,
		0.35,-0.35,
		0.0,0.0,
		
		0.0,0.7,
		0.0,0.0,
		0.35,0.35,
		
		0.0,0.0,
		-0.7,0.0,
		-0.35,0.35,
		
		0.0,0.0,
		0.0,-0.7,
		-0.35,-0.35
	];

	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	thetaLoc = gl.getUniformLocation( program, "theta" );

	document.getElementById( "speedcon" ).onchange = function( event ){
		speed = 100 - event.target.value;
	}

	
	
	renderSquare();
	
	
		
}

function renderSquare(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	
	// set uniform values
	theta += direction * 0.1;
	
	gl.uniform1f( thetaLoc, theta );

	gl.drawArrays( gl.TRIANGLES, 0, 12 );

	// update and render
	setTimeout( function(){ requestAnimFrame( renderSquare ); }, speed );
}
