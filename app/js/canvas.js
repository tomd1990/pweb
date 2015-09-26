function canv(id,text,width, height, url) {
	var canvas = document.getElementById(id);
	h = canvas.height;
	w = canvas.width;
	var ctx = canvas.getContext('2d');
	var image = new Image;
	image.src = "../resources/" + url;
	ctx.imageSmoothingEnabled = false;
	image.onload = function() {
		ctx.drawImage(this,width,0);
	};

  ///  canvas.addEventListener("mousemove", function (e) {
   //     color(id, e)
   // }, false);
};

canv('b',"HOME",80,37,"HOME.png");
canv('c',"PROJECTS", 0, 34,"projects.png");
canv('d',"ABOUT", 55, 30,"About.png");
canv('e',"CONTACT", 0, 30, "contact.png");


function is_white(p)
{
	for(var x = 0; x < p.length; x+=3)
	{
		if(p[x] != 255 || p[x+1] != 255 || p[x+2] != 255 )
		{	//console.log("NOPE"+ p[x] +" " + p[x+1] + " " + p[x+2]);
			return false;
		}
	}
	return true;

};


function fill_fade(x, y, a ) {

	var color = randomColor();

	a.fillStyle = "#FFFFFE";
	a.fillRect(x,y, 3, 3);

	//add fade back to white
	//convert to rgb
	var r = parseInt(color[1], 16) * 16 + parseInt(color[2], 16);
	var g = parseInt(color[3], 16) * 16 + parseInt(color[4], 16);
	var b = parseInt(color[5], 16) * 16 + parseInt(color[6], 16);

	//fade to color

	var steps1 = 20;
	var dr1 = (r - 255)/steps1;
	var dg1 = (g - 255)/steps1;
	var db1 = (b - 255)/steps1;
	var t = 0;
	var interval1 = setInterval(function() {
		a.fillStyle = 'rgb(' + Math.round(255 + dr1*t) + ','
							 + Math.round(255 + dg1*t) + ','
							 + Math.round(255 + db1*t) + ')';
		a.fillRect(x,y,3,3);
		t++;
		if( t == steps1) {
			clearInterval(interval1);
			a.fillStyle = color;
			a.fillRect(x,y,3,3);

	 var steps = 20;
     var dr = (255 - r) / steps;
     var dg = (255 - g) / steps;
     var db = (255 - b) / steps;
     var i = 0;
     var interval = setInterval(function() {
         a.fillStyle = 'rgb(' + Math.round(r + dr * i) + ','
                                 + Math.round(g + dg * i) + ','
                                 + Math.round(b + db * i) + ')';
         a.fillRect(x, y, 3, 3);
         i++;
         if(i === steps) {
              clearInterval(interval);
              a.fillStyle = "#FFFFFF";
              a.fillRect(x, y, 3, 3);
         }
     }, 20);


		}

 	},20);



};

//event listen to first find and store white space
function color(cha,e)
{	
	
	var canvas = document.getElementById(cha);
	var rect = canvas.getBoundingClientRect();
	//console.log(rect.top, rect.right, rect.bottom, rect.left);
	
	var ctx = canvas.getContext("2d");
	var x =  Math.round((e.clientX-rect.left)/(rect.right-rect.left)*canvas.width);
	var y =  Math.round((e.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height);


	//first check if spot is white
	//BFS search first with 1x1 resolution
	 var q = [];
	 var p = ctx.getImageData(x, y, 3, 3).data; 
	 if(is_white(p) )
	 {	
	 	//pixel is white
	 	q.push(y);
	 	q.push(x + 3);
	 	q.push(y);
	 	q.push(x - 3);
	 	q.push(y + 3);
		q.push(x);
		q.push(y - 3);
		q.push(x);	
	 	fill_fade(x, y, ctx);
			 //start BFS
			 while(q.length != 0)
			 {	
			 	var j = q.shift();
			 	var i = q.shift();
			 	var k = ctx.getImageData(i, j, 3, 3).data; 
			 	//console.log(k[0] + k[1] + k[2]);
			 	if(is_white(k))
			 	{		
			 			fill_fade(i, j, ctx);
 						q.push(j);
 						q.push(i + 3);
 						q.push(j);
 						q.push(i - 3);
 						q.push(j + 3);
 						q.push(i);
 						q.push(j - 3);
 						q.push(i);
			 	}
			 	
			 }

	}

};



