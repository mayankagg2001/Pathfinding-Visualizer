import {isrunning} from "../PathFindingVisualizer";

export function randommaze(grid)
{ if(isrunning) return;
let r = grid.length;
let c = grid[0].length;

let randompos = []; 
for(let i=0;i<60;i++)
{
    randompos.push([Math.floor(Math.random()*r),Math.floor(Math.random()*c)]);
}

for(let i=0;i<randompos.length;i++)
{   if(grid[randompos[i][0]][randompos[i][1]].start || grid[randompos[i][0]][randompos[i][1]].target || grid[randompos[i][0]][randompos[i][1]].weighted ) continue; 
    grid[randompos[i][0]][randompos[i][1]].wall = true;
    document.getElementById(`${randompos[i][0]}-${randompos[i][1]}`).classList.add("wall");
}

}