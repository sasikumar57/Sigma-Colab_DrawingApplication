const canvas = document.getElementById("boardContent");
const canvasContext = canvas.getContext("2d");
const clearBtn = document.getElementById("clearbtn");
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
	canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
}
function startDrawing(event) {
      isDrawing = true;
      [lastX, lastY] = [event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop];
}
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
window.addEventListener("resize", resizeWindow);
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

