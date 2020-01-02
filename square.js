class Square {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.neighbors = [];
        this.previous = undefined;
        this.fCost = 0;
        this.gCost = 0;
        this.hCost = 0;
        this.vhCost = 0;
        this.isWall = false;
    }
    
    show(colour){
        if(!this.isWall){
            fill(colour);
        } else{
            fill(169, 169, 169)
        }
        
        rect(this.x, this.y, cellwidth, cellHeight);
        // textSize(32);
        // text(this.gCost, this.x, this.y, cellwidth, cellHeight);
    }
    location(){
        return [this.x, this.y];
    }
    addNeighbors(grid){
        let xIndex = this.x / cellwidth;
        let yIndex = this.y / cellHeight;
        if(xIndex < cols - 1){
            if(!grid[xIndex + 1][yIndex].isWall){
                this.neighbors.push(grid[xIndex + 1][yIndex])
            }
        }

        if(xIndex > 0){
            if(!grid[xIndex - 1][yIndex].isWall){
                this.neighbors.push(grid[xIndex - 1][yIndex])
            }
        }

        if(yIndex < rows - 1){
            if(!grid[xIndex][yIndex + 1].isWall){
                this.neighbors.push(grid[xIndex][yIndex + 1])
            }
        }

        if(yIndex > 0){
            if(!grid[xIndex][yIndex - 1].isWall){
                this.neighbors.push(grid[xIndex][yIndex - 1])
            } 
        }
        // Diagonals
        if((xIndex < cols - 1) && (yIndex < rows - 1)){
            if(!grid[xIndex + 1][yIndex + 1].isWall){
                this.neighbors.push(grid[xIndex + 1][yIndex + 1])
            } 
        }
        if((xIndex < cols - 1) && (yIndex > 0)){
            if(!grid[xIndex + 1][yIndex - 1].isWall){
                this.neighbors.push(grid[xIndex + 1][yIndex - 1])
            } 
        }
        if((yIndex < rows - 1) && (xIndex > 0)){
            if(!grid[xIndex - 1][yIndex + 1].isWall){
                this.neighbors.push(grid[xIndex - 1][yIndex + 1])
            } 
        }
        if((xIndex > 0) && yIndex > 0){
            if(!grid[xIndex - 1][yIndex - 1].isWall){
                this.neighbors.push(grid[xIndex - 1][yIndex - 1])
            } 
        }
    }
    // calculateGCost(start){
    //     // distance from start
    //     const startX = start.location()[0];
    //     const startY = start.location()[1];
    //     const actualX = this.x / cellwidth;
    //     const actualY = this.y / cellHeight;
    //     // Pythoagorean Distance Calculation
    //     // const gCost = Math.floor(Math.hypot(startX - actualX, startY - actualY));
    //     // Manhattan Distance Calculation
    //     const gCost = Math.abs(actualX - startX) + Math.abs(actualY - startY);
    //     this.gCost = gCost;
    // }
    // calculateHCost(end){
    //     const endX = end.location()[0] / cellwidth;
    //     const endY = end.location()[1] / cellHeight;
    //     const actualX = this.x / cellwidth;
    //     const actualY = this.y / cellHeight;
    //     // Pythoagorean Distance Calculation
    //     // const hCost = Math.hypot(endX - actualX, endY - actualY);
    //     // Manhattan Distance Calculation
    //     const hCost = Math.abs(endX - actualX) + Math.abs(endY - actualY);
    //     this.hCost = hCost;
    // }
    // calculateFCost(start, end){
    //     this.calculateGCost(start);
    //     this.calculateHCost(end);
    //     this.fCost = this.gCost + this.hCost;
    // }
}