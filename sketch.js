new p5();
const cols = 25;
const rows = 25;
var grid = new Array(cols);
const cellwidth = 650 / cols;
const cellHeight = 650 / rows;
const squares = (cols * rows);
let [wallsX, wallsY] = addWalls();
let allowDiagonals = false;
let outputFailureP = undefined;
let outputSuccessP = undefined;
let outputSuccessContainer = undefined;
let outputFailureContainer = undefined;

// Lists
let openSet = [];
let closedSet = [];
let start;
let end;
let path;
let current;

function rmvFromOpen(arr, el){
    for(var i = arr.length; i >= 0; i--){
        if(arr[i] == el){
            arr.splice(i, 1);
        }
    }
}

function heuristic(a, b) {
    var d;
    d = abs(a.x - b.x) + abs(a.y - b.y);
    return d;
}

function addWalls(){
    const numWalls = 200;
    let wallX = [];
    let wallY = [];
    for(let i = 0; i < numWalls; i++){
        x = random(cols);
        y = random(rows);
        wallX.push(Math.floor(x));
        wallY.push(Math.floor(y));
    }
    return [wallX, wallY];
}

function placeWalls(start, end){
    for(let i = 0; i < wallsX.length; i++){
        currentX = wallsX[i];
        currentY = wallsY[i];
        disallowedWalls = [start, end];
        if(disallowedWalls.includes(grid[currentX][currentY])){
            continue;
        }else{
            grid[currentX][currentY].isWall = true;
        }
    }
}

function startPathfinding(){
    loop();
}
function clearPathfinding(){
    openSet = [];
    closedSet = [];
    path = [];
    outputFailureP.html("&nbsp;")
    outputSuccessP.html("")
    setup();
    draw();
}
function newWalls(){
    grid = [];
    [wallsX, wallsY] = [];
    [wallsX, wallsY] = addWalls();
    clearPathfinding();
}
function setup(){
    background(0);
    frameRate(15);
    outputFailureP = select("#failureResultP");
    outputSuccessP = select("#successResultP");
    outputSuccessContainer = select(".success");
    outputFailureContainer = select(".failure");
    // allowDiagonals = diagInput.value();
    let cnv = createCanvas(650, 650);
    cnv.parent('canvasContainer');
    console.log("A* Pathfinding");
    // Create 2D array of spaces
    for(var i = 0; i < cols; i++){
        grid[i] = new Array(rows);
    }
    // Define squares
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j] = new Square(i*cellwidth, j*cellHeight);
            
        }
    }
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    placeWalls(start, end);

    // Fill neighbors
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j].addNeighbors(grid);
        }
    }
    openSet.push(start); // Add start point to open list
    noLoop();
}

function draw(){
    if(openSet.length > 0){
        // Algorithm not done

        // find lowest F Cost
        let winner = 0;
        for(var i = 0; i < openSet.length; i++){
            if(openSet[i].fCost == openSet[winner].fCost){
                if(openSet[i].gCost > openSet[winner].gCost){
                    winner = i;
                }
            }
        }
        let current = openSet[winner];
        // Found End
        if(current == end){
            path = [];
            var tmp = current;
            path.push(tmp);
            while(tmp.previous){
                path.push(tmp.previous);
                tmp = tmp.previous;
            }
            outputFailureP.html("")
            outputSuccessP.html("")
            outputSuccessP.html("Solution Found - " + path.length + " Squares")
            outputSuccessContainer.addClass("show")
            noLoop(); 
        }
        rmvFromOpen(openSet, current);
        closedSet.push(current);

        const neighbors = current.neighbors;
        for(var i = 0; i < neighbors.length; i++){
            var neighbor = neighbors[i];
            if(!closedSet.includes(neighbor)){
                const tempG = current.gCost + heuristic(neighbor, current);
                if(!openSet.includes(neighbor)){
                    openSet.push(neighbor);
                } else if(tempG >= neighbor.gCost){
                    continue;
                }
                neighbor.gCost = tempG;
                neighbor.hCost = this.heuristic(neighbor, end);
                neighbor.fCost = neighbor.hCost + neighbor.gCost;
                neighbor.previous = current;
            }
        }
    } else{
        outputFailureP.html("")
        outputSuccessP.html("")
        outputFailureP.html("No Solution Found")
        outputFailureContainer.addClass("show")
    }

    stroke(0)
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j].show(color(255, 255, 255));
        }
    }

    for(var i = 0; i < closedSet.length; i++){
        closedSet[i].show(color(255, 0, 0));
    }

    for(var i = 0; i < openSet.length; i++){
        openSet[i].show(color(0, 255, 0));
    }

    if(path){
        noFill();
        stroke(0);
        beginShape();
        for(var i = 0; i < path.length; i++){
            path[i].show(color(0, 0, 255));
            // vertex(path[i].x * cellwidth, path[i].y*cellHeight);
        }
        endShape();
    }
    start.show(color(255, 0, 239));
    end.show(color(0, 247, 255));
}