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
var spring_x1 = 0;
var spring_dx1 = 0;
var spring_ddx1 = 0;

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
	
	ddtheta1 = ddtheta;
	dtheta1 = dtheta;
	theta1 = theta;
	spring_x1 = 0;
	spring_dx1 = 0;
	spring_ddx1 = 0;
	
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
		
		/*drawCircle(ctx,y,x,radius,"blue");
		drawLine(ctx,spring_length + spring_x,spring_y,spring_length + spring_x+x,spring_y+y);
		drawLine(ctx,0,spring_y,spring_length + spring_x,spring_y);
		*/
		
		
		


		/*
		var k_1 = t*ddx(k,spring_x1,spring_dx1,theta1,dtheta1,M,length);
		var l_1 = t*DDtheta(k_1,theta1,length);
		
		var s_dx1 = k_1*t+spring_dx1;
		var s_x1 = s_dx1*t + spring_x1;
		var dth1 = l_1*t + dtheta1;
		var th1 = dth1*t + theta1;

		var k_2 = t*ddx(k,spring_x1+s_x1/2,spring_dx1+s_dx1/2,theta1+th1/2,dtheta1+dth1/2,M,length);
		var l_2 = t*DDtheta(k_2,theta1 + th1/2,length);
		
		s_dx1 = k_2*t+spring_dx1;
		s_x1 = s_dx1*t + spring_x1;
		dth1 = l_2*t + dtheta1;
		th1 = dth1*t + theta1;
		var k_3 = t*ddx(k,spring_x1+s_x1/2,spring_dx1+s_dx1/2,theta1+th1/2,dtheta1+dth1/2,M,length);
		var l_3 = t*DDtheta(k_3,theta1 + th1/2,length);
		
		s_dx1 = k_3*t+spring_dx1;
		s_x1 = s_dx1*t + spring_x1;
		dth1 = l_3*t + dtheta1;
		th1 = dth1*t + theta1;
		var k_4 = t*ddx(k,spring_x1+s_x1/2,spring_dx1+s_dx1/2,theta1+th1/2,dtheta1+dth1/2,M,length);
		var l_4 = t*DDtheta(k_4,theta1 + th1/2,length);
		
		var k_5 = 1/6 * (k_1+2*k_2+2*k_3+k_4);
		var l_5 = 1/6 * (l_1+2*l_2+2*l_3+l_4);
		
		dtheta1 = l_5 + dtheta1;
		theta1 = dtheta1*t + theta1;
		spring_dx1 = k_5+spring_dx1;
		spring_x1 = spring_dx1*t + spring_x1;
		
		x =  length * Math.sin(theta1);
		y =  length * Math.cos(theta1);*/
		
		
		var n_1 = t*dx(spring_dx1);//dx
		var m_1 = t*Dtheta(dtheta1);//dtheta
		var k_1 = t*ddx(k,spring_x1,spring_dx1,theta1,dtheta1,M,length);//ddx
		var l_1 = t*DDtheta(k,spring_x1,spring_dx1,theta1,dtheta1,M,length);//ddtheta
		
		var n_2 = t*dx(spring_dx1 + n_1/2);//dx
		var m_2 = t*Dtheta(dtheta1 + m_1/2);//dtheta
		var k_2 = t*ddx(k,spring_x1+t/2,spring_dx1+n_1/2,theta1+t/2,dtheta1+m_1/2,M,length);//ddx
		var l_2 = t*DDtheta(k,spring_x1+t/2,spring_dx1+n_1/2,theta1+t/2,dtheta1+m_1/2,M,length);//ddtheta
		
		var n_3 = t*dx(spring_dx1 + n_2/2);//dx
		var m_3 = t*Dtheta(dtheta1 + m_2/2);//dtheta
		var k_3 = t*ddx(k,spring_x1+t/2,spring_dx1+n_2/2,theta1+t/2,dtheta1+m_2/2,M,length);//ddx
		var l_3 = t*DDtheta(k,spring_x1+t/2,spring_dx1+n_2/2,theta1+t/2,dtheta1+m_2/2,M,length);//ddtheta
		
		
		var n_4 = t*dx(spring_dx1 + n_3);//dx
		var m_4 = t*Dtheta(dtheta1 + m_3);//dtheta
		var k_4 = t*ddx(k,spring_x1+t,spring_dx1+n_3,theta1+t,dtheta1+m_3,M,length);//ddx
		var l_4 = t*DDtheta(k,spring_x1+t,spring_dx1+n_3,theta1+t,dtheta1+m_3,M,length);//ddtheta
		
	
		
		
		spring_dx1 = spring_dx1 + 1/6*(k_1+2*k_2+2*k_3+k_4);
		spring_x1 = spring_dx1 * t+spring_x1;
		
		dtheta1 = dtheta1 + 1/6*(l_1+2*l_2+2*l_3+l_4);//l3
		theta1 = dtheta1*t + theta1;
		

		
		x =  length * Math.sin(theta1);
		y =  length * Math.cos(theta1);
		drawCircle(ctx,y,x,radius,"red");
		drawLine(ctx,spring_length + spring_x1,spring_y,spring_length + spring_x1+x,spring_y+y);
		drawLine(ctx,0,spring_y,spring_length + spring_x1,spring_y);
		
	}
	
	function dx(DX){
		return DX;
	}
	
	function Dtheta(DTHETA){
		return DTHETA;
	}
			
	function ddx(k,x,dx,theta,dtheta,M,l){
		return -k*x - M*l*(Math.sin(theta) * dtheta * dtheta - g/l*Math.cos(theta)*Math.sin(theta))/(m+M - Math.cos(theta)*Math.cos(theta)*M);
	}

	function DDtheta(k,x,dx,theta,dtheta,M,l){
		return (-g*Math.sin(theta) - Math.cos(theta) * ddx(k,x,dx,theta,dtheta,M,l))/l;
	}

	function f(X, Y, z){
		return z;
	}

	function h(X, Y, z){
		return -g/length*Math.sin(Y) - damping*z;
	}
}
