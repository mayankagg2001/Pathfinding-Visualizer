import React from 'react'


function check(i,j,end)
{
    if(i === end[0] && j === end[1]) 
    {   
        return true;
    }
    return false;

}

export function a_star(grid,start,end)
{   console.log("reached");
    let gridcopy = grid.slice();
    let visited = [];
    let parent = [];
    let g = [];
    let h = [];
    for(let i=0;i<grid.length;i++)
    {   let x = [];
        let x1 = [];
        let x2 = [];
        let x3 = [];
        for(let j=0;j<grid[0].length;j++)
        {   x1.push(start);
            x.push(false);
            x2.push(0);
            x3.push(Math.abs(i-end[0])+Math.abs(j-end[1]));
        }
        visited.push(x);
        parent.push(x1);
        g.push(x2);
        h.push(x3);
    }
let ans = [];
let temparr = [];
let temparr1 = [];
let i,j;
ans.push([start,g[start[0]][start[1]]+h[start[0]][start[1]]]);
temparr.push(start);
//console.log(end);
let check1 = false;
while(true && ans.length>0)
{   console.log("in loop");
    i = ans[0][0][0];
    j = ans[0][0][1];
    let w = ans[0][1];
    ans.shift();
    visited[i][j] = true;
    temparr.push([i,j]);
    if(check(i,j,end)) {check1 = true;break;}
    
    if(j-1>=0 && visited[i][j-1]===false && gridcopy[i][j-1].wall===false)
    {   let weight = 1;
        
        if(gridcopy[i][j-1].weighted) weight = 10;

        g[i][j-1] = g[i][j]+weight;
        ans.push([[i,j-1],g[i][j-1]+h[i][j-1]]);
        visited[i][j-1] = true;
    //    temparr.push([i,j-1]);
        parent[i][j-1] = [i,j];
        // if(check(i,j-1,end)) {check1 = true;break;}
    }

    if(i+1<gridcopy.length && visited[i+1][j]===false && gridcopy[i+1][j].wall===false)
    {
        let weight = 1;
        if(gridcopy[i+1][j].weighted) weight = 10;
        g[i+1][j] = g[i][j]+weight;
        ans.push([[i+1,j],g[i+1][j]+h[i+1][j]]);
        visited[i+1][j] = true;
        // temparr.push([i+1,j]);
        parent[i+1][j] = [i,j];
        // if(check(i+1,j,end)) {check1 = true;break;}
    }

    if(j+1<gridcopy[0].length && visited[i][j+1]===false && gridcopy[i][j+1].wall===false)
    {
        let weight = 1;
        if(gridcopy[i][j+1].weighted) weight = 10;
        g[i][j+1] = g[i][j]+weight;
        ans.push([[i,j+1],g[i][j+1]+h[i][j+1]]);
        visited[i][j+1] = true;
        // temparr.push([i,j+1]);
        parent[i][j+1] = [i,j];
        // if(check(i,j+1,end)) {check1 = true;break;}
    }


    

    if(i-1>=0 && visited[i-1][j]===false && gridcopy[i-1][j].wall===false)
    {
        let weight = 1;
        if(gridcopy[i-1][j].weighted) weight = 10;
        g[i-1][j] = g[i][j]+weight;
        ans.push([[i-1,j],g[i-1][j]+h[i-1][j]]);
        visited[i-1][j] = true;
        // temparr.push([i-1,j]);
        parent[i-1][j] = [i,j];
        // if(check(i-1,j,end)) {check1 = true;break;}
    }
    ans.sort((a,b)=>{
        return (a[1]-b[1]);
    })

}

let curr = end;
while(curr!==start)
{
    temparr1.push(curr);
    curr = parent[curr[0]][curr[1]];
}
return [temparr,temparr1,check1];
//console.log(temparr1);
//return temparr;

console.log("function reached");
}
