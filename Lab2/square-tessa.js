"use strict";

var gl;
var points;

window.onload = function init(){
	var canvas = document.getElementById( "triangle-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

 // Three Vertices//房顶
    var vertices = [
        -0.5, 0.25,
        -1,  -0.25,
        0.0,  -0.25
    ];
	//房子体
    var vertices2 = [
        -0.8, -0.25,
        -0.8,  -1, 
        -0.2, -1, 
        -0.2, -0.25,
        -0.8, -0.25,
        -0.2, -1
    ];
	//门
	var vertices3 = [
	    -0.7, -0.61,
	    -0.7,  -1, 
	    -0.5, -0.61, 
	    -0.5, -0.61,
	    -0.5,  -1,
	    -0.7, -1
	];
	//窗
	var vertices4 = [
	    -0.45, -0.35,
	    -0.45,  -0.45, 
	    -0.35, -0.45, 
	    -0.35, -0.35,
	    -0.45,  -0.35,
	    -0.35, -0.45
	];
	
	
    // Configure WebGL
    	gl.viewport( 0, 0, canvas.width, canvas.height );
    	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
	//房顶
    	// Load shaders and initialize attribute buffers
    	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    	gl.useProgram( program );
    
    	// Load the data into the GPU
    	var bufferId = gl.createBuffer();
    	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );
    
    	// Associate external shader variables with data buffer
    	var vPosition = gl.getAttribLocation( program, "vPosition" );
    	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    	gl.enableVertexAttribArray( vPosition );
    
    	render();
    //房子体	
    	//2
    	var program2 = initShaders( gl, "vertex-shader", "fragment2-shader" );
    	gl.useProgram( program2 );
    	
    	// Load the data into the GPU
    	var bufferId2 = gl.createBuffer();
    	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices2 ), gl.STATIC_DRAW );
    	
    	// Associate external shader variables with data buffer
    	var vPosition2 = gl.getAttribLocation( program2, "vPosition" );
    	gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
    	gl.enableVertexAttribArray( vPosition2 );
    	
    	render2();
	//房子门
		//3
		var program3 = initShaders( gl, "vertex-shader", "fragment3-shader" );
		gl.useProgram( program3 );
		
		// Load the data into the GPU
		var bufferId3 = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, bufferId3 );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices3 ), gl.STATIC_DRAW );
		
		// Associate external shader variables with data buffer
		var vPosition3 = gl.getAttribLocation( program3, "vPosition" );
		gl.vertexAttribPointer( vPosition3, 2, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( vPosition3 );
		
		render2();//同房子体一样的四边形
    
	//窗
		//4
		var program4 = initShaders( gl, "vertex-shader", "fragment4-shader" );
		gl.useProgram( program4 );
		
		// Load the data into the GPU
		var bufferId4 = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, bufferId4 );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices4 ), gl.STATIC_DRAW );
		
		// Associate external shader variables with data buffer
		var vPosition4 = gl.getAttribLocation( program4, "vPosition" );
		gl.vertexAttribPointer( vPosition4, 2, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( vPosition4 );
		
		render2();		
	}
    
	
	
    function render(){
    	gl.clear( gl.COLOR_BUFFER_BIT );
    	//gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
    	gl.drawArrays( gl.TRIANGLES, 0, 3 );
    	//gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
    }
    function render2(){
    	//gl.clear( gl.COLOR_BUFFER_BIT );
    	//gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
    	gl.drawArrays( gl.TRIANGLES, 0, 6 );
    	//gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
    }
	function render3(){
		//gl.clear( gl.COLOR_BUFFER_BIT );
		//gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
		gl.drawArrays( gl.TRIANGLES, 0, 12 );
		//gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
	}
	function render4(){
		//gl.clear( gl.COLOR_BUFFER_BIT );
		gl.drawArrays( gl.TRIANGLE_FAN, 0, 12 );
		//gl.drawArrays( gl.LINE_LOOP, 0, 12 );
	}