let ctx, canvas;

const img = new Image();
img.src = 'https://i.etsystatic.com/21680765/r/il/b11a1c/3220593545/il_570xN.3220593545_is29.jpg';

function resizeCanvas() {
    if (canvas == null)
        canvas = document.getElementById("canvas");
    if (ctx == null && canvas != null)
        ctx = canvas.getContext("2d");
    if (ctx == null)
        return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    redraw();
}

window.addEventListener('resize', resizeCanvas);

function drawFunny(x,y,dir) {
    const size = 40;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(dir * (Math.PI / 180));
    ctx.drawImage(img, size / -2, size / -2, size, size);
    ctx.restore();
}

const funnies = [];

function makeFunny() {
    funnies.push([
        Math.random(),
        Math.random(),
        0,
        (Math.random() - .5) * 2,
        (Math.random() - .5) * 2,
    ]);
}

function redraw() {
    if (canvas == null)
        canvas = document.getElementById("canvas");
    if (ctx == null && canvas != null) {
        resizeCanvas()
        ctx = canvas.getContext("2d");
    }
    if (ctx == null)
        return;
    ctx.fillStyle = '#200033';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (img.complete) {
        for (let i = 0; i < funnies.length; i++) {
            const funny = funnies[i];
            drawFunny(funny[0] * canvas.width, funny[1] * canvas.height, funny[2]);
            funny[0] += funny[3] * .0035;
            funny[1] += funny[4] * .0035;
            if (funny[0] < 0)
                funny[3] = -funny[3];
            if (funny[1] < 0)
                funny[4] = -funny[4];
            if (funny[0] > 1)
                funny[3] = -funny[3];
            if (funny[1] > 1)
                funny[4] = -funny[4];
            if (funny[4] < .01 && funny[1] > .9)
                funny[4] += -.001;
            if (funny[1] > 1.01) {
                funny[4] = -4;
                funny[1] -= .01;
            }
            funny[4] += .01;
        }
    }
}

for (let i = 0; i < 100; i++) {
    makeFunny();
}
setInterval(redraw, 10);
