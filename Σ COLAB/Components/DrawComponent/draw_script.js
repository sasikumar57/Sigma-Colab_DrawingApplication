const canvas = document.getElementById("boardContent");
const canvasContext = canvas.getContext("2d");
const clearBtn = document.getElementById("clearbtn");
// const state = {
// 	mousedown: false
// };
let isDrawing = false;
let lastX = 0;
let lastY = 0;


resizeWindow();
// freestyle drawing code strats here
function handclick()
{
	document.getElementById("boardContent").style.cursor = "grab";
}

function pencilclick()
{
	document.getElementById("boardContent").style.cursor = "crosshair";
}

function arrowclick()
{
	document.getElementById("boardContent").style.cursor = "default"
}

function resizeWindow() {
	// canvasContext.canvas.width = window.innerWidth;
	// canvasContext.canvas.height = window.innerHeight;

	canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
}

// var position = { x: 0, y: 0 };
// // new position from mouse events
// function setPosition(e) {
// 	position.x = e.clientX;
// 	position.y = e.clientY;
// }

function startDrawing(event) {
      isDrawing = true;
      [lastX, lastY] = [event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop];
}

// function draw(e) {
// 	if (document.getElementById("boardContent").style.cursor == "crosshair") {
// 	if (e.buttons !== 1) return;
// 	var color = document.getElementById("colorPicker").value;
// 	var width = document.getElementById("lineWidth").value;
// 	canvasContext.beginPath();
// 	canvasContext.lineWidth = width;
// 	canvasContext.lineCap = "round";
// 	canvasContext.strokeStyle = color;
// 	canvasContext.moveTo(position.x, position.y);
// 	setPosition(e);
// 	canvasContext.lineTo(position.x, position.y);
// 	canvasContext.stroke();
// }
// }

    function draw(event) {

    	if (document.getElementById("boardContent").style.cursor == "crosshair"){

      if (!isDrawing) return;

      var color = document.getElementById("colorPicker").value;
   	  var width = document.getElementById("lineWidth").value;
      
      const x = event.clientX - canvas.offsetLeft;
      const y = event.clientY - canvas.offsetTop;

      canvasContext.beginPath();
      canvasContext.lineWidth = width;
      canvasContext.lineCap = "round";
      canvasContext.strokeStyle = color;
      canvasContext.moveTo(lastX, lastY);
      canvasContext.lineTo(x, y);
      canvasContext.stroke();

      [lastX, lastY] = [x, y];
  }
}

function stopDrawing() {
      isDrawing = false;
}

// add window event listener to trigger when window is resized
window.addEventListener("resize", resizeWindow);
// document.addEventListener("mousemove", draw);
// document.addEventListener("mousedown", setPosition);
// document.addEventListener("mouseenter", setPosition);

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function clearCanvas() {
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}

function downLoad() {
	var image = canvas.toDataURL("image/png").replace("image/png",
		"image/octet-stream");
window.location.href = image; // it will save locally
}

