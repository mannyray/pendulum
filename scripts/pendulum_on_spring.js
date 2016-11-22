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
var spring_y = 10;
var spring_x = 0;
var spring_dx = 0;
var spring_ddx = 0;
var k = 0;
var m = 0;
var M = 0;

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
	
	g = 9.8;//document.getElementById("gravity").value;
	length = 70; //document.getElementById("length").value;

	theta = document.getElementById("theta").value/180*Math.PI;
	dtheta = document.getElementById("dtheta").value/180*Math.PI;
	
	//spring_x = document.getElementById("x").value;
	//spring_dx = document.getElementById("dx").value;
	
	m = 1;
	M = 1;
	k = 1;
	
	var spring_length = 100;

	var t = 0.05;

	spring_y = c.height/2;
	

	//var runge = (document.getElementById("runge").checked);
	//var smalltheta = (document.getElementById("smalltheta").checked);
	var euler = true;//(document.getElementById("euler").checked);
  	
  	clearInterval(id);
  	id = setInterval(frame, t);
  	
  	
	function frame() {
		ctx.clearRect(0, 0, c.width, c.height);

		spring_ddx = ddx(k,spring_x,spring_dx,theta,dtheta,M,length);
		spring_dx = spring_dx + spring_ddx*t;
		spring_x = spring_x + spring_dx*t;
		ddtheta = DDtheta(spring_ddx,theta,length);
		dtheta = dtheta + ddtheta * t;
		theta = theta + dtheta * t;
		
		var x =  length * Math.sin(theta);
		var y =  length * Math.cos(theta);
		drawCircle(ctx,y,x,radius,"blue");
		drawLine(ctx,spring_length + spring_x,spring_y,spring_length + spring_x+x,spring_y+y);
		drawLine(ctx,0,spring_y,spring_length + spring_x,spring_y);
		
		
		//dont really care about the first 't' variable
		//since there is no dependence
		//we override it and use it as step size
		
		/*
		if(runge){
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
			//ctx.fillText("theta:"+(theta*180/Math.PI %360).toFixed(2),0,10);
			//ctx.fillText("theta:"+(theta*180/Math.PI %360).toFixed(2),0,10);
			//ctx.fillText("small theta:"+(theta*180/Math.PI %360).toFixed(2),0,10);
			var x = pivot_x + length * Math.cos(theta);
			var y = pivot_y + length * Math.sin(theta); 
			drawCircle(ctx,y,x,radius,"red");
			drawLine(ctx,pivot_x,pivot_y,y,x);
		}*/
		/*
		if(euler){
			ddtheta1 = -g/length*Math.sin(theta1) - damping * dtheta1 ;
			dtheta1 = ddtheta1 * t + dtheta1;
			theta1 = dtheta1*t + theta1;
		
			var x = pivot_x + length * Math.cos(theta1);
			var y = pivot_y + length * Math.sin(theta1); 
			drawCircle(ctx,y,x,radius,"blue");
			drawLine(ctx,pivot_x,pivot_y,y,x);
		}*/
		
		/*
		if(smalltheta){
			ddtheta2 = -g/length * theta2 - damping *dtheta2;
			dtheta2 = ddtheta2 * t + dtheta2;
			theta2 = dtheta2*t + theta2;
		
			var x = pivot_x + length * Math.cos(theta2);
			var y = pivot_y + length * Math.sin(theta2); 
			drawCircle(ctx,y,x,radius,"green");
			drawLine(ctx,pivot_x,pivot_y,y,x);
		}*/
		
		
	}
	
	function ddx(k,x,dx,theta,dtheta,M,l){
		return -k*x - M*l*(Math.sin(theta) * dtheta * dtheta - g/l*Math.cos(theta)*Math.sin(theta))/(m+M - Math.cos(theta)*Math.cos(theta)*M);
	}

	function DDtheta(ddx,theta,l){
		return (-g*Math.sin(theta) - Math.cos(theta) * ddx)/l;
	}

	function f(X, Y, z){
		return z;
	}

	function h(X, Y, z){
		return -g/length*Math.sin(Y) - damping*z;
	}
}
