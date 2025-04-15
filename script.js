// Configuração inicial do canvas e elementos
const canvas = document.getElementById('turtle-canvas');
const ctx = canvas.getContext('2d');
const turtleImg = document.getElementById('turtle-img');
const penIndicator = document.getElementById('pen-indicator');

// Estado da tartaruga - armazena todas as propriedades
let turtle = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    angle: 0,
    penDown: true,
    color: '#000000',
    dotColor: '#FF0000',
    lineWidth: 2,
    dotSize: 6,
    stepSize: 20,
    turnAngle: 5
};

// Atualiza a posição visual da tartaruga e indicadores
function updateVisual() {
    turtleImg.style.left = (turtle.x - 15) + 'px';
    turtleImg.style.top = (turtle.y - 15) + 'px';
    turtleImg.style.transform = `rotate(${turtle.angle}deg)`;
    
    penIndicator.style.left = turtle.x + 'px';
    penIndicator.style.top = turtle.y + 'px';
    penIndicator.style.transform = `rotate(${turtle.angle}deg)`;
    penIndicator.style.backgroundColor = turtle.penDown ? 'red' : 'transparent';
    
    updateStatus();
}

// Função de movimento da tartaruga (para frente/trás)
function move(distance) {
    const rad = turtle.angle * Math.PI / 180;
    const newX = turtle.x + distance * Math.cos(rad);
    const newY = turtle.y + distance * Math.sin(rad);
    
    if (turtle.penDown) {
        ctx.lineTo(newX, newY);
        ctx.strokeStyle = turtle.color;
        ctx.lineWidth = turtle.lineWidth;
        ctx.stroke();
    }
    
    turtle.x = newX;
    turtle.y = newY;
    ctx.beginPath();
    ctx.moveTo(turtle.x, turtle.y);
    updateVisual();
}

// Move a tartaruga para frente
function forward() {
    move(turtle.stepSize);
    lastAction = 'Moveu para frente';
}

// Move a tartaruga para trás
function backward() {
    move(-turtle.stepSize);
    lastAction = 'Moveu para trás';
}

// Gira a tartaruga para direita
function right() {
    turtle.angle += turtle.turnAngle;
    lastAction = 'Virou à direita';
    updateVisual();
}

// Gira a tartaruga para esquerda
function left() {
    turtle.angle -= turtle.turnAngle;
    lastAction = 'Virou à esquerda';
    updateVisual();
}

// Marca um ponto na posição atual
function markDot() {
    ctx.beginPath();
    ctx.arc(turtle.x, turtle.y, turtle.dotSize/2, 0, Math.PI * 2);
    ctx.fillStyle = turtle.dotColor;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(turtle.x, turtle.y);
    lastAction = 'Marcou um ponto';
    updateStatus();
}

// Alterna o estado da caneta (levantada/baixada)
function togglePen() {
    turtle.penDown = !turtle.penDown;
    lastAction = `Caneta ${turtle.penDown ? 'baixada' : 'levantada'}`;
    updateVisual();
}

// Limpa o canvas e reposiciona a tartaruga
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    turtle.x = canvas.width / 2;
    turtle.y = canvas.height / 2;
    turtle.angle = 0;
    ctx.beginPath();
    ctx.moveTo(turtle.x, turtle.y);
    lastAction = 'Tela limpa';
    updateVisual();
}

// Variável para armazenar a última ação
let lastAction = '';

// Atualiza o painel de status
function updateStatus() {
    document.getElementById('status').innerHTML = `
        <strong>Status:</strong> ${lastAction || 'Pronto'} | 
        Posição: (${Math.round(turtle.x)}, ${Math.round(turtle.y)}) | 
        Ângulo: ${turtle.angle}° | 
        Caneta: ${turtle.penDown ? '↓' : '↑'}
    `;
}

// Configura os controles por teclado
document.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', ' ', 'p', 'P'].includes(e.key)) {
        e.preventDefault(); // Impede o comportamento padrão (rolagem)
        
        switch(e.key) {
            case 'ArrowUp': forward(); break;
            case 'ArrowDown': backward(); break;
            case 'ArrowRight': right(); break;
            case 'ArrowLeft': left(); break;
            case ' ': togglePen(); break;
            case 'p':
            case 'P': markDot(); break;
        }
    }
});

// Inicializa o canvas
clearCanvas();