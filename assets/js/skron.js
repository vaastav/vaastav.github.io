window.onload = function(){
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = 400,
		height = canvas.height = 400;
    var color2 = "rgb(51, 255, 51)";
    var color3 = "rgb(255, 255, 0)";
    var selcolor = "rgb(255, 0, 0)";

    //var oporder = [2, 2, 2, 3, 2, 3];
    //var oporder = [2, 2, 2, 2, 2, 2];
    var oporder = [2, 3, 2]
    var choice = [1, 2, 3, 0, 1, 4];
    var max_length = 3;

    skron(0,0,400,400,color2,false,0);
	
	function skron(x0,y0,x1,y1,current_color,selected, level){
        if (selected || level == 0) {
            // Only keep on going if this was selected.
            drawRectangle(x0, y0, x1, y1, current_color, selcolor, "2")
            if (level == max_length) {;
                return;
            }
            var order = oporder[level];
            if (order == 2) {
                var x_mid = (x0 + x1) / 2;
                var y_mid = (y0 + y1) / 2;

                var count = 0;
                skron(x0, y0, x_mid, y_mid, color2, choice[level] == count, level+1);
                count++;
                skron(x_mid, y0, x1, y_mid, color2, choice[level] == count, level+1);
                count++;
                skron(x0, y_mid, x_mid, y1, color2, choice[level] == count, level+1);
                count++;
                skron(x_mid, y_mid, x1, y1, color2, choice[level] == count, level+1);
            } else {
                var x_third1 = x0 + (x1 - x0) / 3;
                var x_third2 = x0 + 2 * (x1 - x0) / 3;
                var y_third1 = y0 + (y1 - y0) / 3;
                var y_third2 = y0 + 2 * (y1 - y0) / 3;

                // Going left to right 
                // 0, 1, 2,
                // 3, 4, 5,
                // 6, 7, 8
                var count = 0;
                // Top Row
                skron(x0, y0, x_third1, y_third1, color3, choice[level] == count, level+1);
                count++;
                skron(x_third1, y0, x_third2, y_third1, color3, choice[level] == count, level+1);
                count++;
                skron(x_third2, y0, x1, y_third1, color3, choice[level] == count, level+1);
                //Middle Row
                count++;
                skron(x0, y_third1, x_third1, y_third2, color3, choice[level] == count, level+1);
                count++;
                skron(x_third1, y_third1, x_third2, y_third2, color3, choice[level] == count, level+1);
                count++;
                skron(x_third2, y_third1, x1, y_third2, color3, choice[level] == count, level+1);
                // Bottom Row
                count++;
                skron(x0, y_third2, x_third1, y1, color3, choice[level] == count, level+1);
                count++;
                skron(x_third1, y_third2, x_third2, y1, color3, choice[level] == count, level+1);
                count++;
                skron(x_third2, y_third2, x1, y1, color3, choice[level] == count, level+1);
            }
		} else {
            // Just draw the rectangle and be done with it.
            drawRectangle(x0, y0, x1, y1, current_color, "white", "1");
        }
	}
	
	function drawRectangle(x0,y0,x1,y1,colour, strokecolor, width){
	
        context.beginPath();
		context.lineWidth = width;
		context.strokeStyle = strokecolor;
		context.rect(x0,y0,x1-x0,y1-y0);
		context.fillStyle = colour;
		context.fillRect(x0,y0,x1-x0,y1-y0);
		context.stroke()
	}
}
