
import {isrunning} from "../PathFindingVisualizer";

export function basicrandommaze(grid)
{
    if(isrunning) return;

let r = grid.length;
let c = grid[0].length;

for(let i=0;i<r;i++)
{
    for(let j=0;j<c;j++)
    {
        grid[i][j].weighted = false;
        grid[i][j].wall = false;
        grid[i][j].visited = false;
        document.getElementById(`${i}-${j}`).classList.remove("weighted","wall","visited","Shortestpath","visitednormal");
    }
}

let randompos = []; 
for(let i=0;i<325;i++)
{
    randompos.push([Math.floor(Math.random()*r),Math.floor(Math.random()*c)]);
}

for(let i=0;i<randompos.length;i++)
{   if(grid[randompos[i][0]][randompos[i][1]].start || grid[randompos[i][0]][randompos[i][1]].target ) continue; 
    grid[randompos[i][0]][randompos[i][1]].wall = true;
    document.getElementById(`${randompos[i][0]}-${randompos[i][1]}`).classList.add("wall");
}

}