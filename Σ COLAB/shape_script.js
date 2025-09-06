const treeToggle = document.querySelector('.tree-toggle');
const treeView = document.getElementById('tree-view');
treeToggle.addEventListener('click', () => {
  treeView.style.display = (treeView.style.display === 'none') ? 'block' : 'none';
});
let shapes = [];
let selectedShape = null;
let isDragging = false;
let dragStartX, dragStartY;
let dragStartShapeX, dragStartShapeY;
  function addShape(shapeType) {
    console.log('Adding shape: ' + shapeType);
  }
function drawShapes() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(shape => {
        canvasContext.fillStyle = shape.color;
        canvasContext.beginPath();
        if (shape.type === 'circle') {
            canvasContext.arc(shape.x, shape.y, 50, 0, 2 * Math.PI);
          } else if (shape.type === 'rectangle') {
            canvasContext.rect(shape.x - 75, shape.y - 50, 150, 100);
          }   else if (shape.type === 'oval') {
            canvasContext.ellipse(shape.x, shape.y, 75, 50, 0, 0, 2 * Math.PI);
          } else if (shape.type === 'square') {
            canvasContext.rect(shape.x - 50, shape.y - 50, 100, 100);
          } else if (shape.type === 'trapezoid') {
            canvasContext.moveTo(shape.x - 50, shape.y - 50);
            canvasContext.lineTo(shape.x + 50, shape.y - 50);
            canvasContext.lineTo(shape.x + 75, shape.y + 50);
            canvasContext.lineTo(shape.x - 75, shape.y + 50);
            canvasContext.closePath();
          }   else if (shape.type === 'parallelogram') {
            canvasContext.moveTo(shape.x - 50,shape.y - 50);
            canvasContext.lineTo(shape.x + 50, shape.y - 50);
            canvasContext.lineTo(shape.x + 25, shape.y + 50);
            canvasContext.lineTo(shape.x - 75, shape.y + 50);
            canvasContext.closePath();
          }else if (shape.type === 'diamond') {
            canvasContext.moveTo(shape.x,shape.y - 50);
            canvasContext.lineTo(shape.x + 50,shape.y);
            canvasContext.lineTo(shape.x,shape.y + 50);
            canvasContext.lineTo(shape.x - 50,shape.y);
            canvasContext.closePath();
        } else if (shape.type === 'triangle') {
            canvasContext.moveTo(shape.x,shape.y - 50);
            canvasContext.lineTo(shape.x + 50,shape.y + 50);
            canvasContext.lineTo(shape.x - 50,shape.y + 50);
            canvasContext.closePath();
        } else if (shape.type === 'pentagon') {
            canvasContext.moveTo(shape.x, shape.y - 50);
            canvasContext.lineTo(shape.x + 50, shape.y - 15);
            canvasContext.lineTo(shape.x + 30, shape.y + 40);
            canvasContext.lineTo(shape.x - 30, shape.y + 40);
            canvasContext.lineTo(shape.x - 50, shape.y - 15);
            canvasContext.closePath();
        } else if (shape.type === 'hexagon') {
            const sideLength = 50;
            const height = Math.sqrt(3) * sideLength / 2;
            canvasContext.moveTo(shape.x, shape.y - sideLength);
            canvasContext.lineTo(shape.x + height, shape.y - sideLength / 2);
            canvasContext.lineTo(shape.x + height, shape.y + sideLength / 2);
            canvasContext.lineTo(shape.x, shape.y + sideLength);
            canvasContext.lineTo(shape.x - height, shape.y + sideLength / 2);
            canvasContext.lineTo(shape.x - height, shape.y - sideLength / 2);
            canvasContext.closePath();
          } else if (shape.type === 'star') {
            const outerRadius = 50;
            const innerRadius = 25;
            const spikes = 5;
            const rot = Math.PI / 2 * 3;
            const step = Math.PI / spikes;
            canvasContext.moveTo(shape.x, shape.y - outerRadius);
            for (let i = 0; i < spikes; i++) {
              const x1 = shape.x + Math.cos(rot + step * i) * outerRadius;
              const y1 = shape.y + Math.sin(rot + step * i) * outerRadius;
              canvasContext.lineTo(x1, y1);
              const x2 = shape.x + Math.cos(rot + step * i + step / 2) * innerRadius;
              const y2 = shape.y + Math.sin(rot + step * i + step / 2) * innerRadius;
              canvasContext.lineTo(x2, y2);
              
            }
            canvasContext.closePath();
          } else if (shape.type === 'arrow-left') {
            canvasContext.moveTo(shape.x - 50, shape.y);
            canvasContext.lineTo(shape.x + 50, shape.y - 50);
            canvasContext.lineTo(shape.x + 50, shape.y - 20);
            canvasContext.lineTo(shape.x + 80, shape.y - 20);
            canvasContext.lineTo(shape.x + 80, shape.y + 20);
            canvasContext.lineTo(shape.x + 50, shape.y + 20);
            canvasContext.lineTo(shape.x + 50, shape.y + 50);
            canvasContext.closePath();
          } else if (shape.type === 'arrow-right') {
            canvasContext.moveTo(shape.x + 50, shape.y);
            canvasContext.lineTo(shape.x - 50, shape.y - 50);
            canvasContext.lineTo(shape.x - 50, shape.y - 20);
            canvasContext.lineTo(shape.x - 80, shape.y - 20);
            canvasContext.lineTo(shape.x - 80, shape.y + 20);
            canvasContext.lineTo(shape.x - 50, shape.y + 20);
            canvasContext.lineTo(shape.x - 50, shape.y + 50);
            canvasContext.closePath();
          } else if (shape.type === 'line') {
            canvasContext.moveTo(shape.x - 50, shape.y);
            canvasContext.lineTo(shape.x + 50, shape.y);
          } else if (shape.type === 'rhombus') {
            canvasContext.moveTo(shape.x, shape.y - 50);
            canvasContext.lineTo(shape.x + 50, shape.y);
            canvasContext.lineTo(shape.x, shape.y + 50);
            canvasContext.lineTo(shape.x - 50, shape.y);
            canvasContext.closePath();
          }
        canvasContext.fill();
    });
}
function addShape(type, x, y, width, height) {
    const shape = {
        type,
        x,
        y,
        width,
        height,
        size: Math.min(width, height) / 2,
        color: getRandomColor()
    };
    shapes.push(shape);
    drawShapes();
}
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function handleMouseDown(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    for (let i = shapes.length - 1; i >= 0; i--) {
        const shape = shapes[i];
        if (
            mouseX >= shape.x &&
            mouseX <= shape.x + shape.width &&
            mouseY >= shape.y &&
            mouseY <= shape.y + shape.height
        ) {
            selectedShape = shape;
            isDragging = true;
            dragStartX = mouseX;
            dragStartY = mouseY;
            dragStartShapeX = shape.x;
            dragStartShapeY = shape.y;
            break;
        }
    }
}
function handleMouseUp() {
    selectedShape = null;
    isDragging = false;
}
function handleMouseMove(event) {
    if (!isDragging) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const dx = mouseX - dragStartX;
    const dy = mouseY - dragStartY;
    selectedShape.x = dragStartShapeX + dx;
    selectedShape.y = dragStartShapeY + dy;
    drawShapes();
}
function dragShape(event, shape) {
    event.dataTransfer.setData('shape', shape);
}
function allowDrop(event) {
    event.preventDefault();
}
function dropShape(event) {
    event.preventDefault();
    const shape = event.dataTransfer.getData('shape');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (shape === 'circle') {
        addShape('circle', x, y, 20, 20);
    } else if (shape === 'rectangle') {
        addShape('rectangle', x, y, 20, 20);
    } else if (shape === 'oval') {
        addShape('oval', x, y, 20, 20);
    } else if (shape === 'square') {
        addShape('square', x, y, 20, 20);
    } else if (shape === 'trapezoid') {
        addShape('trapezoid', x, y, 20, 20);
    } else if (shape === 'parallelogram') {
        addShape('parallelogram', x, y, 20, 20);
    }else if (shape === 'diamond'){
        addShape('diamond', x, y, 20, 20);
    }else if (shape === 'triangle'){
        addShape('triangle', x, y, 20, 20);
    }else if (shape === 'pentagon'){
        addShape('pentagon', x, y, 20, 20);
    }else if (shape === 'hexagon'){
        addShape('hexagon', x, y, 20, 20);
    }else if (shape === 'star'){
        addShape('star', x, y, 20, 20);
    }else if (shape === 'arrow-left'){
        addShape('arrow-left', x, y, 20, 20);
    }else if (shape === 'arrow-right'){
        addShape('arrow-right', x, y, 20, 20);
    }else if (shape === 'line'){
        addShape('line', x, y, 20, 20);
    }else if (shape === 'rhombus'){
        addShape('rhombus', x, y, 20, 20);
    }
}
function deleteShape() {
    if (selectedShape) {
        const index = shapes.indexOf(selectedShape);
        if (index > -1) {
            shapes.splice(index, 1);
        }
        selectedShape = null;
        drawShapes();
    }
}
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('dragover', allowDrop);
canvas.addEventListener('drop', dropShape);