//const canvas = document.getElementById('canvas'),
inputbutton=document.getElementById('textbut');
//canvasContext = canvas.getContext('2d');
let hasInput = false;
let currentInput = null;

 inputbutton.ondragend = function(e) {
 if (hasInput) return;
 addInput(e.clientX, e.clientY);
 }

//Function to dynamically add an input box: 
 function addInput(x, y) {

 var input = document.createElement('input');
 input.type = 'text';
 input.style.position = 'absolute';
 input.style.left = x  + 'px';
 input.style.top = y  + 'px';
 input.style.fontFamily=document.getElementById('fontName').value;
 input.style.fontSize=document.getElementById('fontSize').value+"px";
 input.style.color=document.getElementById('foreColor').value;
 input.onkeydown = handleEnter;
 input.onclick = handleInputClick;
  input.addEventListener('mousedown', handleInputMouseDown);
  input.addEventListener('mousemove', handleInputMouseMove);
  input.addEventListener('mouseup', handleInputMouseUp);
 document.body.appendChild(input);

 input.focus();

 hasInput = true;
 }
//  
 //Key handler for input box:
 function handleEnter(e) {
 var keyCode = e.keyCode;
 if (keyCode === 13) {
     drawText(this.value, parseInt(this.style.left, 10)-canvas.offsetLeft, parseInt(this.style.top, 10)-canvas.offsetTop);
     //document.body.removeChild(this);
     this.blur;
     document.body.removeChild(this);
     currentInput = null;
     hasInput = false;
  }
}

function handleInputClick(e) {
  currentInput = this;
}
 //Draw the text onto canvas:
 function drawText(txt, x, y) {
  canvasContext.textBaseline = 'top';
  canvasContext.textAlign = 'left';
  const fontFamily = currentInput.style.fontFamily;
  const fontSize = currentInput.style.fontSize;
  const fontColor = currentInput.style.color;
  canvasContext.font = `${fontSize} ${fontFamily}`;
  canvasContext.fillStyle = fontColor;
  canvasContext.fillText(txt, x, y);
}
function updateInputStyle() {
  if (currentInput) {
    currentInput.style.fontFamily = document.getElementById('fontName').value;
    currentInput.style.fontSize = document.getElementById('fontSize').value + 'px';
    currentInput.style.color = document.getElementById('foreColor').value;
  }
}

// Attach event listeners to the font family, font size, and color input elements
document.getElementById('fontName').addEventListener('change', updateInputStyle);
document.getElementById('fontSize').addEventListener('input', updateInputStyle);
document.getElementById('foreColor').addEventListener('change', updateInputStyle);

let dragging = false;
let offsetX, offsetY;

function handleInputMouseDown(e) {
  dragging = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
}

function handleInputMouseMove(e) {
  if (dragging) {
    const input = e.target;
    input.style.left = e.clientX - offsetX + 'px';
    input.style.top = e.clientY - offsetY + 'px';
  }
}

function handleInputMouseUp() {
  dragging = false;
}




 



// const canvas = document.getElementById('canvas');
// const inputbutton=document.getElementById('textbut');
// const canvasContext = canvas.getContext('2d');
// let textElements = [];

// inputbutton.ondragend = function(e){
//   addInput(e.clientX,e.clientY);
// }

// function addInput(x, y) {
//   const input = document.createElement('input');
//   input.type = 'text';
//   input.style.position = 'absolute';
//   input.style.left = x + 'px';
//   input.style.top = y + 'px';
//   input.style.border = 'none';
//   input.style.outline = 'none';
//   input.style.background = 'transparent';
//   input.style.fontFamily = document.getElementById('fontName').value;
//   input.style.fontSize = document.getElementById('fontSize').value + 'px';
//   input.style.color = document.getElementById('foreColor').value;
//   input.addEventListener('keyup', handleEnter);
//   document.body.appendChild(input);
//   input.focus();
// }

// function handleEnter(e) {
//    var keyCode = e.keyCode;
//    if (keyCode === 13) {
//     addTextElement(this.value, parseInt(this.style.left, 10)-canvas.offsetLeft, parseInt(this.style.top, 10)-canvas.offsetTop);
//        document.body.removeChild(this);
//     }
//   }

// function addTextElement(text, x, y) {
//   const textElement = {
//     text,
//     x,
//     y,
//     selected: false
//   };
//   textElements.push(textElement);
//   drawTextElements();
// }

// function drawTextElements() {
//   canvasContext.clearRect(0, 0, canvas.width, canvas.height);
//   textElements.forEach(textElement => {
//     canvasContext.font = `${selectedText.style.fontSize} ${selectedText.style.fontFamily}`;
//     canvasContext.fillStyle = selectedText.style.color;
//     canvasContext.fillText(textElement.text, textElement.x, textElement.y);
//   });
// }

// canvas.addEventListener('mousedown', (event) => {
//   const x = event.clientX - canvas.offsetLeft;
//   const y = event.clientY - canvas.offsetTop;
//   textElement.forEach((element) => {
//     canvasContext.font = element.font;
//     const textWidth = canvasContext.measureText(element.text).width;
//     const textHeight = parseInt(element.font, 10);
//     if (x >= element.x && x <= element.x + textWidth && y >= element.y - textHeight && y <= element.y) {
//       canvas.addEventListener('mousemove', dragText);
//       canvas.addEventListener('mouseup', () => {
//         canvas.removeEventListener('mousemove', dragText);
//       });
//     }
//   });
// });

// function dragText(event) {
//       const offsetX = event.movementX;
//       const offsetY = event.movementY;
//       textElements.forEach((element) => {
//         element.x += offsetX;
//         element.y += offsetY;
//       });
//       drawTextElements();
//     }