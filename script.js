const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const formContainer = document.getElementById('formContainer');

const options = ['Bacio', 'Schiaffo', 'Verità o Obbligo', 'Wanna marry me?'];
const colors = ['#FF6347', '#FFD700', '#ADFF2F', '#1E90FF'];
const arcSize = (2 * Math.PI) / options.length;
let startAngle = 0;
let spinTime = 0;
let spinTimeTotal = 0;

function drawRouletteWheel() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const outsideRadius = canvas.width / 2 - 10;
    const textRadius = outsideRadius - 50;
    const insideRadius = 20;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.font = '16px Arial';

    for (let i = 0; i < options.length; i++) {
        const angle = startAngle + i * arcSize;
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.arc(centerX, centerY, outsideRadius, angle, angle + arcSize, false);
        ctx.arc(centerX, centerY, insideRadius, angle + arcSize, angle, true);
        ctx.stroke();
        ctx.fill();
        ctx.save();

        ctx.fillStyle = "#000";
        ctx.translate(centerX + Math.cos(angle + arcSize / 2) * textRadius,
                      centerY + Math.sin(angle + arcSize / 2) * textRadius);
        ctx.rotate(angle + arcSize / 2 + Math.PI / 2);
        const text = options[i];
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
    }
}

function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    const spinAngle = easeOut(spinTime, 0, spinTimeTotal, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    requestAnimationFrame(rotateWheel);
}

function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

function startSpin() {
    spinTime = 0;
    spinTimeTotal = Math.random() * 3000 + 4000;
    rotateWheel();
}

function stopRotateWheel() {
    const degrees = startAngle * 180 / Math.PI + 90;
    const arcd = arcSize * 180 / Math.PI;
    const index = Math.floor((360 - (degrees % 360)) / arcd);
    const result = options[index];
    alert(result);

    if (result === 'Wanna marry me?') {
        formContainer.style.display = 'block';
    }
}

spinButton.addEventListener('click', startSpin);

drawRouletteWheel();
