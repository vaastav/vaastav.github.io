window.onload = function(){
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = 400,
		height = canvas.height = 400;
	
	class Colour {
		constructor(r,g,b) {
			this.r = r;
			this.g = g;
			this.b = b;
		}
		
		String() {
			return "rgb(" + Math.floor(this.r) + "," + Math.floor(this.g) + "," + Math.floor(this.b) + ")";
		}
	}
	
	class Rectangle {
		constructor(x0, y0, x1, y1, colour) {
			this.x0 = x0;
			this.y0 = y0;
			this.x1 = x1;
			this.y1 = y1;
			this.colour = colour;
		}
	}
		
	var colours = [new Colour(0,0,255), new Colour(0,0,0), new Colour(0, 51, 204), new Colour(0, 204, 255)];
	var rectangles = [];
	
	kron(0,0,400,400,new Colour(255,255,255), 6);
	
	function color_multiply(color1, color2) {
		var r = (color1.r / 255) * (color2.r / 255) * 255;
		var g = (color1.g / 255) * (color2.g / 255) * 255;
		var b = (color1.b / 255) * (color2.b / 255) * 255;
		
		return new Colour(r,g,b)
	}
	
	function kron(x0,y0,x1,y1,current_color,limit){
		if (limit == 0) {
			drawRectangle(x0,y0,x1,y1,current_color);
		} else {
			var mid_x = (x0 + x1) / 2;
			var mid_y = (y0 + y1) / 2;
			
			var q1_colour = color_multiply(current_color, colours[0])
			kron(x0, y0, mid_x, mid_y, q1_colour, limit-1);
			
			var q2_colour = color_multiply(current_color, colours[1])
			kron(mid_x, y0, x1, mid_y, q2_colour, limit-1);
			
			var q3_colour = color_multiply(current_color, colours[2])
			kron(x0, mid_y, mid_x, y1, q3_colour, limit-1);
			
			var q4_colour = color_multiply(current_color, colours[3])
			kron(mid_x, mid_y, x1, y1, q4_colour, limit-1);
		}
	}
	
	function drawRectangle(x0,y0,x1,y1, colour){
	
		rectangles.push(new Rectangle(x0, y0, x1, y1, colour));
		context.beginPath();
		context.lineWidth = "1";
		context.strokeStyle = "black";
		context.rect(x0,y0,x1-x0,y1-y0);
		context.fillStyle = colour.String();
		context.fillRect(x0,y0,x1-x0,y1-y0);
		context.stroke()
	}
	console.log(rectangles.length)
}
