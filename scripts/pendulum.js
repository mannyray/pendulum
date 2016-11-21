function drawCircle(ctx,x,y,radius,colour){
	ctx.beginPath();

	ctx.arc(x,y,radius, 0, 2*Math.PI);
	ctx.strokeStyle=colour;
	ctx.stroke();
	ctx.strokeStyle="black";
}

function drawLine(ctx,x1,y1,x2,y2){
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);

	ctx.stroke();
}



var g = 0;
var length = 0;
var radius = 0;
var damping = 0;
var theta = 0;
var dtheta = 0;
var ddtheta =0;


var ddtheta1 = 0;
var dtheta1 = 0;
var theta1 = 0;

var ddtheta2 = 0;
var dtheta2 = 0;
var theta2 = 0;
//we are going to use runge-kutta 4th order to solve a second order DE:
/*
ddtheta = -g/l * sin(theta) - alpha*dtheta
is the equation of motion.

We break this into two equations:
dtheta = z [f]
dz = -g/l*sin(theta) - alpha*z [g]

with initial conditions provided by program input 


*/


var id;
function myMove() {

	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	
	g = document.getElementById("gravity").value;
	length = 150;
	radius = 20;
	damping = document.getElementById("damping").value;

	theta = document.getElementById("theta").value/180*Math.PI;
	dtheta = document.getElementById("dtheta").value/180*Math.PI;;
	ddtheta =-g/length*Math.sin(theta) - damping * dtheta ;
	var t = 0.05;
	
	theta1 = theta;
	dtheta1 = dtheta;
	ddtheta1 = ddtheta;
	
	theta2 = theta;
	dtheta2 = dtheta;
	ddtheta2 = ddtheta;
	
	var pivot_x = c.width/2;
	var pivot_y = c.height/2;


  	
  	clearInterval(id);
  	id = setInterval(frame, 0.05);
  	
  	
	function frame() {
		ctx.clearRect(0, 0, c.width, c.height);
		/*
		ddtheta = -g/length*Math.sin(theta) - damping * dtheta ;
		dtheta = ddtheta * t + dtheta;
		theta = dtheta*t + theta;
		*/
		//dont really care about the first 't' variable
		//since there is no dependence
		//we override it and use it as step size
		var k_0 = t *f(t,theta,dtheta);
		var l_0 = t*h(t,theta,dtheta);

		var k_1 = t*f(t,theta + 0.5*k_0, dtheta + 0.5 *l_0);
		var l_1 =t*h(t,theta + 0.5*k_0, dtheta + 0.5 *l_0);
		
		var k_2 =  t*f(t,theta + 0.5*k_1, dtheta + 0.5 *l_1);
		var l_2 =  t*h(t,theta + 0.5*k_1, dtheta + 0.5 *l_1);
		
		var k_3 =  t*f(t,theta + k_2, dtheta + l_2);
		var l_3 =  t*h(t,theta + k_2, dtheta + l_2);
		
		theta = theta + 1/6*(k_0+2*k_1+2*k_2+k_3);
		dtheta = dtheta + 1/6*(l_0+2*l_1+2*l_2+l_3);

		ctx.fillText("theta:"+(theta*180/Math.PI %360).toFixed(2),0,10);
		var x = pivot_x + length * Math.cos(theta);
		var y = pivot_y + length * Math.sin(theta); 
		drawCircle(ctx,y,x,radius,"red");
		drawLine(ctx,pivot_x,pivot_y,y,x);
		
		
		ddtheta1 = -g/length*Math.sin(theta1) - damping * dtheta1 ;
		dtheta1 = ddtheta1 * t + dtheta1;
		theta1 = dtheta1*t + theta1;
		
		var x = pivot_x + length * Math.cos(theta1);
		var y = pivot_y + length * Math.sin(theta1); 
		drawCircle(ctx,y,x,radius,"blue");
		drawLine(ctx,pivot_x,pivot_y,y,x);
		
		ddtheta2 = -g/length * theta2 - damping *dtheta2;
		dtheta2 = ddtheta2 * t + dtheta2;
		theta2 = dtheta2*t + theta2;
		
		var x = pivot_x + length * Math.cos(theta2);
		var y = pivot_y + length * Math.sin(theta2); 
		drawCircle(ctx,y,x,radius,"green");
		drawLine(ctx,pivot_x,pivot_y,y,x);
		
		
		
	}


	function f(X, Y, z){
		return z;
	}

	function h(X, Y, z){
		return -g/length*Math.sin(Y) - damping*z;
	}
}
