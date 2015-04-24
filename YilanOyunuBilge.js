var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;
document.body.appendChild(canvas);

var snakeBody = [];
snakeBodyHead = { x: 50, y: 50, "renk": "lightgreen", "speed": 20 };
snakeBody.push(snakeBodyHead);
var yem = { x: null, y: null, "renk": "orange" };


var keyDown = {};
addEventListener("keydown", function (e) {
    keyDown[e.keyCode] = true;
});
addEventListener("keyup", function (e) {
    delete keyDown[e.keyCode];
});
var puan = 0;
var update = function () {
    var yerDegistir = function () {
        for (var i = snakeBody.length - 1; i > 0; i--) {

            snakeBody[i].x = snakeBody[i - 1].x;
            snakeBody[i].y = snakeBody[i - 1].y;
        }
    }
    if (37 in keyDown && snakeBodyHead.x > 20) {
        yerDegistir();
        snakeBodyHead.x -= snakeBodyHead.speed;
    }
    else if (38 in keyDown && snakeBodyHead.y > 20) {
        yerDegistir();

        snakeBodyHead.y -= snakeBodyHead.speed;
    }
    else if (39 in keyDown && snakeBodyHead.x < canvas.width - 20) {
        yerDegistir();

        snakeBodyHead.x += snakeBodyHead.speed;
    }
    else if (40 in keyDown && snakeBodyHead.y < canvas.height - 20) {
        yerDegistir();

        snakeBodyHead.y += snakeBodyHead.speed;
    }
    if (Math.abs(snakeBodyHead.x - yem.x) < 20 && Math.abs(snakeBodyHead.y - yem.y) < 20) {
        puan++;
        snakeBody[snakeBody.length] = { x: null, y: null, "renk": "darkgreen" }
        yerDegistir();
        snakeBodyHeadX = snakeBodyHead.x;
        snakeBodyHeadY = snakeBodyHead.y;
        reset();
    }


}

var snakeBodyHeadX = 50;
var snakeBodyHeadY = 50;

var reset = function () {
    snakeBodyHead.x = snakeBodyHeadX;
    snakeBodyHead.y = snakeBodyHeadY;
    yem.x = Math.round(Math.random() * 580 + 10);
    yem.y = Math.round(Math.random() * 380 + 10);
}

var Ciz = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillStyle = snakeBodyHead.renk;
    ctx.arc(snakeBodyHead.x, snakeBodyHead.y, 10, 0, 360);
    ctx.fill();
    ctx.closePath();


    ctx.beginPath();
    ctx.fillStyle = yem.renk;
    ctx.arc(yem.x, yem.y, 10, 0, 360);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.font = "16pt Verdana";
    ctx.fillText("Puan:" + puan, 10, 20);


    if (snakeBody.length >= 2) {
        for (var i = 0; i < snakeBody.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = snakeBody[i].renk;
            ctx.arc(snakeBody[i].x, snakeBody[i].y, 10, 0, 360);
            ctx.fill();
            ctx.closePath();
        }
    }
}

var main = function () {
    update();
    Ciz();
    requestAnimationFrame(main);
}
reset();
main();