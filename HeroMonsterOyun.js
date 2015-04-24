var tuval = document.createElement("canvas");
var firca = tuval.getContext("2d");
tuval.width = 550;
tuval.height = 550;
document.body.appendChild(tuval);

var bgImage = new Image();
bgImage.src = "img/background.png";
var heroImage = new Image();
heroImage.src = "img/hero.png";
var monsterImage = new Image();
monsterImage.src = "img/monster.png";

var keyDown = {};
addEventListener("keydown", function (e) {
    keyDown[e.keyCode] = true;
});
addEventListener("keyup", function (e) {
    delete keyDown[e.keyCode]
});

var hero = { hiz: 5 };
var heroX = tuval.width / 2;
var heroY = tuval.height / 2;
var monster = {};
var yakalaMons = 0;

var reset = function () {
    hero.x = heroX;
    hero.y = heroY;//Math.floor((Math.random()*(max-min))+min)//Belli aralıkta
    monster.x = Math.round(Math.random() * 470) + 20;//20-490 arası
    monster.y = Math.round(Math.random() * 460) + 30;//30-490 arası
}

var update = function () {
    //Sol+yukarı çapraz
    if (37 in keyDown && 38 in keyDown && hero.x > 30 && hero.y > 20) {
        hero.x -= hero.hiz;
        hero.y -= hero.hiz;
    }
        //yukarı+sağ çapraz
    else if (38 in keyDown && 39 in keyDown && hero.x < 500 && hero.y > 20) {
        hero.x += hero.hiz;
        hero.y -= hero.hiz;
    }
        //sağ+aşağı çapraz
    else if (39 in keyDown && 40 in keyDown && hero.x < 490 && hero.y < 490) {
        hero.x += hero.hiz;
        hero.y += hero.hiz;
    }
        //aşağı+sol çapraz
    else if (40 in keyDown && 37 in keyDown && hero.x > 30 && hero.y < 490) {
        hero.x -= hero.hiz;
        hero.y += hero.hiz;
    }
        //sola sadece
    else if (37 in keyDown && hero.x > 30) {
        hero.x -= hero.hiz;
    }
        //yukarı
    else if (38 in keyDown && hero.y > 20) {
        hero.y -= hero.hiz;
    }
        //sağa
    else if (39 in keyDown && hero.x < 490) {
        hero.x += hero.hiz;
    }
        //aşağı
    else if (40 in keyDown && hero.y < 490) {
        hero.y += hero.hiz;
    }
    //Eğer canavar heroya yakın bir yerde çıkarsa reset yaptırmamız gerekir.
    if(Math.abs(hero.x-monster.x)<32 && Math.abs(hero.y-monster.y)<32){
        heroX = hero.x;
        heroY = hero.y;
        yakalaMons++;
        reset();
    }

}

var render = function () {
    firca.drawImage(bgImage, 0, 0, tuval.width, tuval.height);
    firca.drawImage(heroImage, hero.x, hero.y);
    firca.drawImage(monsterImage, monster.x, monster.y);
    //Skor kısmı
    firca.fillStyle = "white";
    firca.textAlign = "left";
    firca.textBaseline = "top";
    firca.font = "arial";
    firca.fillText("Skor: " + yakalaMons, 20, 20);
}

var main = function () {
    update();
    render();
    requestAnimationFrame(main);
}
reset();
main();