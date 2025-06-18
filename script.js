const DEFAULT_COLOR = '#fefefe';
const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'color';

let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;

function setColor(newColor) {
  currentColor = newColor;
}

function setMode(newMode) {
  currentMode = newMode;
}

function setSize(newSize) {
  currentSize = newSize;
}

function updateSize(value) {
  document.querySelector('.size').textContent = `${size} x ${size}`
}

function changeSize(value) {
  setSize(value);
  updateSize(value);
  reloadGrid();
}

function reloadGrid() {
  clearGrid();
  createGrid(currentSize);
}

function clearGrid() {
  grid.innerHTML = '';
}

const colorBtn = document.querySelector('#colorBtn');
const eraserBtn = document.querySelector('#eraserBtn');
const clearBtn = document.querySelector('#clearBtn');
const sizeBtn = document.querySelector('#sizeBtn');
const grid = document.querySelector('.grid');

colorBtn.addEventListener("click", () => {
  setMode('color');
});
eraserBtn.addEventListener("click", () => {
  setMode('eraser');
});
clearBtn.addEventListener("click", () => {
  reloadGrid();
});
sizeBtn.addEventListener("click", () => {
  prompt("Enter size: ");
});

let mouseDown = false;
document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false;

function createGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement('div');
    gridElement.classList.add('grid-element');
    gridElement.addEventListener('mouseover', changeColor);
    gridElement.addEventListener('mousedown', changeColor);
    grid.appendChild(gridElement);
  }
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return;
  if (currentMode === 'color') {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  }
  else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#ffffff';
  }
}

createGrid(DEFAULT_SIZE);