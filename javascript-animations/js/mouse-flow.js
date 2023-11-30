const canvas = document.getElementById('cw');
const context = canvas.getContext('2d');
context.globalAlpha = 0.5;

const cursor = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

let particlesArray = [];

generateParticles(101);
setSize();
anim();
addEventListener('mousemove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
})
addEventListener('touchmove', (e) => {
    cursor.x = e.touches[0].clientX;
    cursor.y = e.touches[0].clientY;
}, { passive: false })
addEventListener('resize', () => setSize());

function generateParticles(n) {
    particlesArray = [];
    for (let i = 0; i < n; i++) {
        particlesArray.push(new Particle(
            innerWidth / 2,
            innerHeight / 2,
            4,
            generateColor(),
            0.02
        ));
    }
}

function generateColor() {
    let hexset = '0123456789ABCDEF';
    let finalHexString = "#";
    for (let i = 0; i < 6; i++) {
        finalHexString += hexset[Math.floor(Math.random() * 16)];
    }
    return finalHexString;
}

function setSize() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
    generateParticles(101);
}

function Particle(x, y, particleTrainWidth, color, rotateSpeed) {
    this.x = x;
    this.y = y;
    this.particleTrainWidth = particleTrainWidth;
    this.color = color;
    this.theta = Math.random() * Math.PI * 2;
    this.rotateSpeed = rotateSpeed;
    this.t = Math.random() * Math.PI * 2;
    this.rotate = () => {
        const ls = {
            x: this.x,
            y: this.y
        }
        this.theta += this.rotateSpeed;
        this.x = cursor.x + Math.cos(this.theta) * this.t;
        this.y = cursor.y + Math.sin(this.theta) * this.t;
        context.beginPath();
        context.lineWidth = this.particleTrainWidth;
        context.strokeStyle = this.color;
        context.moveTo(ls.x, ls.y);
        context.lineTo(this.x, this.y);
        context.stroke();
    }
}

function anim() {
    requestAnimationFrame(anim);
    context.fillStyle = "rgba(0,0,0,0.05)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => {
        particle.rotate();
    });
}
