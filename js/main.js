console.log("Javascript is alive!");

window.addEventListener("load", initApp, false);

var KEYSTATE = [];
var KEY = {LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, ENTER: 13, SPACE: 32, X: 88, Z: 90 };
var ctx;    // Main canvas context

/*************************************************/
function initApp () {
    console.log("Initializing...");

    // Initialize the amazing JGL and create a new sprite list
//    jgl = new Jgl;

    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,800,480);
    ctx.font = "40px _sans";
    ctx.fillStyle = "#00AA00";

    document.addEventListener("keydown", processKeyDown);
    document.addEventListener("keyup", processKeyUp);

    loadResources();
    generateMaze();
    //gameLoop();
}

/*************************************************/
function processKeyDown(ev) {
    KEYSTATE[ev.keyCode] = true;

    switch (ev.keyCode)
    {
        case KEY.SPACE:
            break;

        default:
            console.log("Pressed key: " + ev.keyCode);
    }
}

/*************************************************/
function processKeyUp(ev) {
    KEYSTATE[ev.keyCode] = false;
}

/*************************************************/
function loadResources() {
    // Load images, sounds, etc.

    //spriteList = jgl.newSpriteList();

    //var jetImage = new Image();
    //jetImage.src = "images/jet.png";

    /* Example of loading and defining an animated sprite
    var explosionImg = jgl.newImage("./images/explosion.png", function() {
        explSprite = spriteList.newSprite({
            id: 'explosion',
            width: 88, height: 90,
            image: explosionImg,
            animate: true,
            autoLoop: false,
            autoDeactivate: true,
            currentFrame: 0,
            startFrame: 0,
            endFrame: 39,
            active: false
        });

        // Define animation frames
        for (var frame = 0; frame < 40; frame++) {
            explSprite.setAnimFrame(frame, explosionImg, frame * 88, 0, 88, 90);
        }
        explSprite.setHotSpot(44, 44);
    });
    */

}

/*************************************************/
function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    // Update sprites

    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,800,480);
    ctx.fillStyle = "#00AA00";
    ctx.fillText("Canvas Text", parseInt(Math.random() * 400), parseInt(Math.random() * 470));

    // Redraw sprites
    //spriteList.drawSprites(ctx);

    // Draw images
    //ctx.drawImage(jet, 0, 0);

}

/*************************************************/
function generateMaze() {
    var cols = 49;
    var rows = 29;
    var dirTable = [
        {x: 2, y: 0},
        {x: 0, y: -2},
        {x: -2, y: 0},
        {x: 0, y: 2}
    ];

    var current = {x: 2, y: 1};
    var next = {x: 0, y: 0};

    var wallCh = 8;
    var pathCh = 7;

    var map = [];

    // Set array to all 'wall' values
    for (var r = 0; r <= rows; r++) {
        var rowArray = [];
        for (var c = 0; c <= cols; c++) {
            rowArray.push(wallCh);
        }
        map.push(rowArray);
    }

    // Stick a marker in the first location of the maze
    map[current.y][current.x] = 4;

    // Generate the maze
    var dir = oldDir = parseInt(Math.random() * 4);
    do {
        next.x = current.x + dirTable[dir].x;
        next.y = current.y + dirTable[dir].y;

        if (next.x > 0 && next.x < cols && next.y > 0 && next.y < rows && map[next.y][next.x] == wallCh) {
            map[next.y][next.x] = dir;
            map[current.y + (dirTable[dir].y / 2)][current.x + (dirTable[dir].x / 2)] = pathCh;
            current.x = next.x;
            current.y = next.y;
            dir = parseInt(Math.random() * 4);
            oldDir = dir;
        } else {
            dir = (++dir) % 4;
            if (dir == oldDir) {
                dir = map[current.y][current.x];
                map[current.y][current.x] = pathCh;
                if (dir < 4) {
                    current.x -= dirTable[dir].x;
                    current.y -= dirTable[dir].y;
                    dir = parseInt(Math.random() * 4);
                    oldDir = dir;
                }
            }
        }
    } while (dir < 4);
    // Clear the screen
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,800,480);
    ctx.fillStyle = "#ffffff";

    // Draw the maze by converting the data we stored in our array into canvas fill-rects
    for (r = 0; r < rows; r++) {
        for (c = 1; c <= cols; c++) {
            if (map[r][c] == wallCh) {
                ctx.fillRect(c*16, r*16, 16, 16);
            }
        }
    }
}
