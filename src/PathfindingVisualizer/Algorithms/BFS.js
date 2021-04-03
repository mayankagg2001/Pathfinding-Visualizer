import React from 'react'


function check(i,j,end)
{
    if(i === end[0] && j === end[1]) 
    {   
        return true;
    }
    return false;

}

export function bfs(grid,start,end)
{   //let grid = grid.slice();
   //alert(start);
    //alert(end);
    //let visited = [];
    let parent = [];
    for(let i=0;i<grid.length;i++)
    {   let x = [];
        let x1 = [];
        for(let j=0;j<grid[0].length;j++)
        {   x1.push(start);
           // x.push(false);
        }
        //visited.push(x);
        parent.push(x1);
    }
let ans = [];
let temparr = [];
let temparr1 = [];
let i,j;
ans.push(start);
//temparr.push(start);
//console.log(end);
let check1 = false;
while(true && ans.length>0)
{   
    i = ans[0][0];
    j = ans[0][1];
    // temparr.push([i,j]);
    ans.shift();
    grid[i][j].visited = true;
    // if(check(i,j,end)) {check1=true;break;}


    if(i-1>=0 && grid[i-1][j].visited===false && grid[i-1][j].wall===false)
    {
        ans.push([i-1,j]);
        grid[i-1][j].visited = true;
        temparr.push([i-1,j]);
        parent[i-1][j] = [i,j];
        if(check(i-1,j,end)) {check1 = true;break;}
    }


    if(j+1<grid[0].length && grid[i][j+1].visited===false && grid[i][j+1].wall===false)
    {
        ans.push([i,j+1]);
        grid[i][j+1].visited = true;
        temparr.push([i,j+1]);
        parent[i][j+1] = [i,j];
        if(check(i,j+1,end)) {check1 = true;break;}
    }


    if(i+1<grid.length && grid[i+1][j].visited===false && grid[i+1][j].wall===false)
    {
        ans.push([i+1,j]);
        grid[i+1][j].visited = true;
        temparr.push([i+1,j]);
        parent[i+1][j] = [i,j];
        if(check(i+1,j,end)) {check1 = true;break;}
    }

    if(j-1>=0 && grid[i][j-1].visited===false && grid[i][j-1].wall===false)
    {
        ans.push([i,j-1]);
        grid[i][j-1].visited = true;
        temparr.push([i,j-1]);
        parent[i][j-1] = [i,j];
        if(check(i,j-1,end)) {check1 = true;break;}
    }
   
    

   

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
