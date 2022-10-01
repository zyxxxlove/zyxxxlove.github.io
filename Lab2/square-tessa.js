"use strict";

const { vec3 } = glMatrix;

var canvas;
var gl;

var points = [];

/** Parameters */
var numTimesToSubdivide = 4;
var theta=0;
var twist=true;

var radius=1.0;

window.onload = function initTriangles(){
	canvas = document.getElementById( "gl-canvas" );

	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// initialise data for Sierpinski gasket

    // first, initialise the corners of the gasket with three points.
    // R=0.6, Theta = 90, 210, -30
	var vertices = [
		radius * Math.cos(100 * Math.PI / 100.0), radius * Math.sin(180 * Math.PI / 180.0),  0,
        radius * Math.cos(270 * Math.PI / 180.0), radius * Math.sin(270 * Math.PI / 180.0),  0,
		radius * Math.cos(360 * Math.PI / 180.0), radius * Math.sin(360 * Math.PI / 180.0),  0, 
		radius * Math.cos(90 * Math.PI / 180.0), radius * Math.sin(90 * Math.PI / 180.0),  0,
	];

	// var u = vec3.create();
	// vec3.set( u, -1, -1, 0 );
	var u = vec3.fromValues( vertices[0], vertices[1], vertices[2] );
	// var v = vec3.create();
	// vec3.set( v, -1, 1, 0 );
	var v = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
	// var w = vec3.create();
	// vec3.set( w, 1, -1, 0 );
	var w = vec3.fromValues( vertices[6], vertices[7], vertices[8] );
	// var x = vec3.create();
	// vec3.set( x, -1, -1, 0 );
	var x = vec3.fromValues( vertices[9], vertices[10], vertices[11] );
	

	divideTriangle( u, v, w, x, numTimesToSubdivide );

	// configure webgl
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// load shaders and initialise attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	// load data into gpu
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );

	// associate out shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	renderTriangles();
};

function tessellaTriangle( a, b, c , d ){
    //var k;
    var zerovec3 = vec3.create();
    vec3.zero( zerovec3 );
    var radian = theta * Math.PI / 180.0;
    
    var a_new = vec3.create();
    var b_new = vec3.create();
    var c_new = vec3.create();
	var d_new = vec3.create();

    if( twist == false ){
        vec3.rotateZ( a_new, a, zerovec3, radian );
        vec3.rotateZ( b_new, b, zerovec3, radian );
        vec3.rotateZ( c_new, c, zerovec3, radian );
		vec3.rotateZ( d_new, d, zerovec3, radian );
        
        points.push( a_new[0], a_new[1], a_new[2] );
        points.push( b_new[0], b_new[1], b_new[2] );
        points.push( b_new[0], b_new[1], b_new[2] );
        points.push( c_new[0], c_new[1], c_new[2] );
        points.push( c_new[0], c_new[1], c_new[2] );
		points.push( d_new[0], d_new[1], d_new[2] );
		points.push( d_new[0], d_new[1], d_new[2] );
        points.push( a_new[0], a_new[1], a_new[2] );
    }else{
        var t_a = Math.sqrt( a[0] * a[0] + a[1] * a[1] );
        var t_b = Math.sqrt( b[0] * b[0] + b[1] * b[1] );
        var t_c = Math.sqrt( c[0] * c[0] + c[1] * c[1] );
		var t_d = Math.sqrt( d[0] * d[0] + d[1] * d[1] );

        vec3.set( a_new, a[0] * Math.cos(t_a * radian) - a[1] * Math.sin(t_a * radian), 
            a[0] * Math.sin( t_a * radian ) + a[1] * Math.cos( t_a * radian ), 0 );
			
        vec3.set( b_new, b[0] * Math.cos(t_b * radian) - b[1] * Math.sin(t_b * radian),
            b[0] * Math.sin( t_b * radian) + b[1] * Math.cos( t_b * radian), 0);
			
        vec3.set( c_new, c[0] * Math.cos(t_c * radian) - c[1] * Math.sin(t_c * radian),
            c[0] * Math.sin( t_c * radian) + c[1] * Math.cos( t_c * radian), 0);
			
		vec3.set( d_new, d[0] * Math.cos(t_d * radian) - d[1] * Math.sin(t_d * radian),
		    d[0] * Math.sin( t_d * radian) + d[1] * Math.cos( t_d * radian), 0);	
        
        points.push(a_new[0], a_new[1], a_new[2]);
        points.push(b_new[0], b_new[1], b_new[2]);
        points.push(b_new[0], b_new[1], b_new[2]);
        points.push(c_new[0], c_new[1], c_new[2]);
        points.push(c_new[0], c_new[1], c_new[2]);
		points.push(d_new[0], d_new[1], d_new[2]);
		points.push(d_new[0], d_new[1], d_new[2]);
        points.push(a_new[0], a_new[1], a_new[2]);
		
    
    }
}

function divideTriangle( a, b, c, d, count ){
	// check for end of recursion
	if( count == 0 ){
		tessellaTriangle( a, b, c ,d );
	}else{
		var ab = vec3.create();
		vec3.lerp( ab, a, b, 1.5 );
		var bc = vec3.create();
		vec3.lerp( bc, b, c, 1.5 );
		var cd = vec3.create();
		vec3.lerp( cd, c, d, 1.5 );
		var da = vec3.create();
		vec3.lerp( da, d, a, 1.5 );
		var o = vec3.create();
		vec3.lerp( o, a, c, 1.5 );
		// three new triangles
		divideTriangle( a, ab, o, da, count-1 );
		divideTriangle( ab, b, bc, o, count-1 );
        divideTriangle( o, bc, c, cd, count-1 );
        divideTriangle( da, o, cd, d, count-1 );
	}
}

function renderTriangles(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.LINES, 0, points.length/4);
}