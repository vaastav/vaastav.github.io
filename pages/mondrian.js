window.onload = function(){
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = 500,
		height = canvas.height = 500;
		
	
	
	piet(0,0,500,500,3);
	
	function getRandom(min,max){
	
		return Math.floor(Math.random()*(max-min+1)) + min;
	
	}
	
	function piet(x0,y0,x1,y1,limit){
		
		if(limit == 0){
			drawRectangle(x0,x1,y0,y1);
		}
		else if(limit > 0){
			var i = getRandom(x0,x1);
			var j = getRandom(y0,y1);
			piet(x0,y0,i,j,limit-1);
			piet(i,y0,x1,j,limit-1);
			piet(x0,j,i,y1,limit-1);
			piet(i,j,x1,y1,limit-1);
		}
		
	
	}
	
	function drawRectangle(x0,x1,y0,y1){
	
		context.beginPath();
		context.lineWidth = "6";
		context.strokeStyle = "black";
		context.rect(x0,y0,x1-x0-6,y1-y0-6);
		context.fillStyle = getRandomColour();
		context.fillRect(x0,y0,x1-x0-6,y1-y0-6);
		context.stroke()
	
	}
	
	function getRandomColour(){
			
		var colours = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ffffff"];
		
		var colour = colours[Math.floor(Math.random()*5)]
		
		return colour;
	
	}

}