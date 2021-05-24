import React, { useState } from 'react';
import Node from "./Node/Node";
import './PathFindingVisualizer.css';
import {bfs} from "./Algorithms/BFS";
import {dfs} from "./Algorithms/DFS";
import {djikstra} from "./Algorithms/Djikstra's";
import { randommaze } from './Mazes/RandomMaze';
import { randomweight } from './Mazes/RandomWeight';
import {a_star} from "./Algorithms/A_Star";
import {basicrandommaze} from "./Mazes/BasicRandomMaze";
import {basicrandomweight} from "./Mazes/BasicRandomWeight";
export let isrunning = false;


function PathFindingVisualizer() {

    const h = window.innerHeight;
    const [w, setw] = useState(window.innerWidth);
    let colnumber = 60;
    let side = (w / colnumber > 11) ? w / colnumber : 11;
    colnumber = (side === w / colnumber) ? colnumber : w / 11;
    let rownumber = Math.floor(0.78 * h / side);
    let startnodey = 7;
    let startnodex = 10;
    let finishnodey = 7;
    let finishnodex = 30;
    let curstart = [7,15];
    let curtarget = [7,40];
    let ismarked = false;
    let currentalgo = "";
    //const [start,setstart] = useState([7,15])
    //const [target,settarget] = useState([7,40])
    const [grid1, setgrid1] = useState(generategrid);
    let grid = grid1;
    let prevr = -1;
    let prevc = -1;
    //const [pressed, setpressed] = useState(false);
    let pressed = false;
    //const [Enterpressed, setEnterpressed] = useState(false);
    let Enterpressed = false;
    //const [istart,setistart] = useState(false);
    let istart = false;
    //const [istarget,setistarget] = useState(false);
    let istarget = false;
    let isweighted = false;
    let iswall = false;
    let speed = 14;
    const fast = 14;
    const average = 40;
    const slow  = 215; 

    //window.addEventListener('resize', () => { setw(window.innerWidth); side = 0.98 * w / colnumber; });

    window.addEventListener('mouseup', () => { pressed = false; prevr = -1; prevc = -1;  });

    window.addEventListener('keyup', (e) => { if (e.key === "w") { Enterpressed = false; prevr = -1; prevc = -1; } });

    window.addEventListener('keydown', (e) => { if (e.key === "w") Enterpressed = true; });
    //window.addEventListener('keypress', (e) =>{ if (e.key === "Enter") setEnterpressed(true);setEnterpressed(false); });

    function generategrid() {
        let rows = [];
        for (let j = 0; j < rownumber; j++) {
            let cols = [];
            for (let i = 0; i < colnumber; i++) {
                const node = {
                    side: side,
                    leftmost: i === 0,
                    rightmost: i === colnumber - 1,
                    top: j === 0,
                    bottom: j === rownumber - 1,
                    rowindex: j,
                    columnindex: i,
                    visited: false,
                    wall: false,
                    weighted: false,
                    start: (j === startnodey && i === startnodex),
                    target: (j === finishnodey && i === finishnodex),
                    
                };
                cols.push(node);
            }
            rows.push(cols);
        }
        return rows;
    }

    function resetBoard() {
        // grid = generategrid();
        // for (let i = 0; i < rownumber; i++) {
        //     for (let j = 0; j < colnumber; j++) {
        //         document.getElementById(`${i}-${j}`).classList.remove("wall" ,"weighted");
        //     }
        // }
        if(isrunning) return;
        isrunning = false;
        ismarked = false;
        grid = generategrid();
        for (let i = 0; i < rownumber; i++) {
            for (let j = 0; j < colnumber; j++) {
                document.getElementById(`${i}-${j}`).classList.remove("wall" ,"weighted","visited","Shortestpath","start","target","visitednormal");
            }
        }
        document.getElementById(`${startnodey}-${startnodex}`).classList.add("start");
        document.getElementById(`${finishnodey}-${finishnodex}`).classList.add("target");
        //setgrid1(generategrid());
        pressed = false;
        Enterpressed = false;
        istarget = false;
        istart = false;
        prevr = -1;
        prevc = -1;
        isweighted = false;
        iswall = false;
    }

    function display(row) {
        const checktop = row[0].top;
        const checkbottom = row[0].bottom;
        return (
            <div className="row">
                {row.map(display1)}
            </div>
        );
    }

    function display1(col) {
        return <Node side={col.side} leftmost={col.leftmost} top={col.top}
            onMouseDown={(rowindex, columnindex) => handlemousedown(rowindex, columnindex)}
            //onMouseDown1 = {(rowindex,columnindex) => handlemousedown1(rowindex,columnindex)}
            rowindex={col.rowindex} columnindex={col.columnindex}
            wall={col.wall}
            pressed={pressed}
            onMouseUp={(rowindex,columnindex) => handlemouseup(rowindex,columnindex)}
            onMouseOver={(rowindex, columnindex) => handlemouseover(rowindex, columnindex)}
            onMouseOut = {(rowindex,columnindex) => handlemouseout(rowindex,columnindex)}
            //onMouseUp1 = {(rowindex,columnindex) => handlemouseup1(rowindex,columnindex)}
            start = {col.start}
            target = {col.target}
        />;
    }

    // function handlekeydown(r, c) {
    //     //console.log("pressed")
    //     setEnterpressed(true);
    //     toggleweight(r, c);
    // }


    function handlemousedown(r, c) {
        //console.log(grid[r][c]);
        //console.log(grid);
        if(isrunning) return;
        if(!Enterpressed && grid[r][c].start===true) 
        {   
            istart = true;
            istart = false;
            document.getElementById(`${r}-${c}`).classList.add("start");
            //console.log("Onstart");
            handlemouseover(r,c);
            istart = true;
            //console.log("onstart2");
            return;
        }
        else if(!Enterpressed && grid[r][c].target===true)
        {
            istarget = true;
            document.getElementById(`${r}-${c}`).classList.add("target");
            handlemouseover(r,c);

            return;
        }
        else if(!Enterpressed)
        {
        console.log("Onwall");
        //setpressed(true);
        pressed = true;
        togglewalls(r, c);
        return;
        }
        else
        {
            //setpressed(true);
            pressed = true;
            toggleweight(r,c);
            return;
        }
    }

    function handlemouseup(r,c) {
        if(isrunning) return;
        prevr = -1;
        prevc = -1;
        // console.log(grid[r][c]);
        // console.log(grid);
        // if(istart)
        // {setstart([r,c]);}

        // if(istarget)
        // {setstart([r,c]);}
        //console.log([startnodex,startnodey]);
        //console.log([finishnodex,finishnodey]);
        //document.getElementById(`${r}-${c}`).click();
       // setpressed(false);
       pressed = false; 
       istart = false;
       istarget = false;
        //setgrid1(grid);

    }

    function handlemouseover(r, c) {
        if(isrunning) return;
        //console.log(pressed);
        
        if(!pressed && !Enterpressed && !istart && !istarget) return;
        
        //if(!istarget && grid[r][c].target===true) return;

        //if(!istart && grid[r][c].start===true) return;

        if (prevr === r && prevc === c) return;

        //console.log("mousein");

        if (!Enterpressed && pressed) { 
            if(grid[r][c].target || grid[r][c].start) return;
            togglewalls(r, c); return; }
        
        if (Enterpressed && pressed) { toggleweight(r, c); return; }
        if (istart) {
            
            let rown = r;
            let coln = c;

            if(grid[r][c].target === true) {rown = curstart[0];coln = curstart[1];}
            console.log(grid[r][c].target)
            console.log(rown,coln);
            if(grid[rown][coln].wall) iswall = true;
            if(grid[rown][coln].weighted) isweighted=true;
           // setstart([r,c]);
            document.getElementById(`${rown}-${coln}`).classList.remove("wall","weighted");
             document.getElementById(`${rown}-${coln}`).classList.add("start");
            const newnode = grid[rown][coln];
            let newnode1 = {...newnode,wall:false,weighted:false,start:true};
            //grid[r][c] = newnode1;
            let newgrid = grid.slice();
            newgrid[rown][coln] = newnode1;
            grid = newgrid.slice();
            curstart = [rown,coln];
            if(ismarked===true && currentalgo=="bfs") breadthfirstsearch(0);
            if(ismarked===true && currentalgo=="dfs") depthfirstsearch(0);
            if(ismarked===true && currentalgo=="djikstra") djikstraalgo(0);
            if(ismarked===true && currentalgo=="astar") astaralgo(0);

            //setgrid1(newgrid);
            return;
        }
        if (istarget)
        {   let rown = r;
            let coln = c;

            if(grid[r][c].start === true) {rown = curtarget[0];coln = curtarget[1];}
            console.log(grid[r][c].start)
            console.log(rown,coln);
            if(grid[rown][coln].wall) iswall = true;
            if(grid[rown][coln].weighted) isweighted=true;
           // setstart([r,c]);
            document.getElementById(`${rown}-${coln}`).classList.remove("wall","weighted");
             document.getElementById(`${rown}-${coln}`).classList.add("target");
            const newnode = grid[rown][coln];
            let newnode1 = {...newnode,wall:false,weighted:false,target:true};
            //grid[r][c] = newnode1;
            let newgrid = grid.slice();
            newgrid[rown][coln] = newnode1;
            grid = newgrid.slice();
            curtarget = [rown,coln];
            if(ismarked===true && currentalgo=="bfs") breadthfirstsearch(0);
            if(ismarked===true && currentalgo=="dfs") depthfirstsearch(0);
            if(ismarked===true && currentalgo=="djikstra") djikstraalgo(0);
            if(ismarked===true && currentalgo=="astar") astaralgo(0);
            //setgrid1(newgrid);
            return;
        }
        //console.log([r,c]);
        
    }

    // function handlemousedown1(r,c)
    // {
    //   setistart(true);
    //   document.getElementById(`${r}-${c}`).classList.add("start");
    // }

    function handlemouseout(r,c)
    {   if(isrunning) return;
        if(!istart && !istarget) return;
        
        if(istart) 
        { 
        let rown = r;
        let coln = c;
        if(grid[r][c].target) {rown = curstart[0];coln = curstart[1];}    
        let ele = document.getElementById(`${rown}-${coln}`).classList;
        ele.remove("start")
        if(iswall) ele.add("wall");
        if(isweighted) ele.add("weighted");
        const newnode = grid[rown][coln];
        let newnode1 = {...newnode, weighted:isweighted , wall:iswall, start:false};
        //grid[r][c] = newnode1;
        let newgrid = grid.slice();
        newgrid[rown][coln] = newnode1;
        grid = newgrid.slice();
        //setgrid1(newgrid);
        iswall = false;
        isweighted = false;
        //console.log("mouseout")
        return;
    }
    if(istarget)
    {   
        let rown = r;
        let coln = c;
        if(grid[r][c].start) {rown = curtarget[0];coln = curtarget[1];}
        let ele = document.getElementById(`${rown}-${coln}`).classList;
        ele.remove("target")
        if(iswall) ele.add("wall");
        if(isweighted) ele.add("weighted");
        const newnode = grid[r][c];
        let newnode1 = {...newnode, weighted:isweighted , wall:iswall, target:false};
        //grid[r][c] = newnode1;
        let newgrid = grid.slice();
        newgrid[rown][coln] = newnode1;
        grid = newgrid.slice();
        //setgrid1(newgrid);
        iswall = false;
        isweighted = false;
        //settarget([r,c]);
        return;   
    }
    }

    // function handlemouseup1(r,c)
    // {
    //     setistart(false);
    // }

    function togglewalls(r, c) {
        let copygrid = grid.slice();
        const copynode = grid[r][c];
        let newnode = {
            ...copynode,
            weighted:false,
            wall: !copynode.wall,
        };
        copygrid[r][c] = newnode;
        document.getElementById(`${r}-${c}`).classList.remove("weighted");
        document.getElementById(`${r}-${c}`).classList.toggle("wall");
        grid[r][c] = newnode;
        prevr = r;
        prevc = c;
    }

    function toggleweight(r, c) {
        let copygrid = grid.slice();
        const copynode = grid[r][c];
        let newnode = {
            ...copynode,
            wall:false,
            weighted: !copynode.weighted,
        };
        copygrid[r][c] = newnode;
        document.getElementById(`${r}-${c}`).classList.remove("wall");
        document.getElementById(`${r}-${c}`).classList.toggle("weighted");
        grid[r][c] = newnode;
        prevr = r;
        prevc = c;
    }






    function breadthfirstsearch(type)
    {   if(isrunning) return;
        if(!ismarked || type==1)
        isrunning = true;
        console.log(speed)
        currentalgo = "bfs";

        let count = 0;
        //let count1 = 0;
        let startnodey1 = curstart[1];
        let startnodex1 = curstart[0];
        let targetnodex1 = curtarget[1];
        let targetnodey1 = curtarget[0];
        for(let i=0;i<rownumber;i++)
        {
            for(let j=0;j<colnumber;j++)
            {
                if(grid[i][j].wall) count++;
                if(grid[i][j].start) {startnodex1=j;startnodey1=i;}
                if(grid[i][j].target) {targetnodex1=j;targetnodey1=i;}
                grid[i][j].visited = false;
                document.getElementById(`${i}-${j}`).classList.remove("weighted");
            }
        }

        const arr = bfs(grid,[startnodey1,startnodex1],[targetnodey1,targetnodex1])
        //console.log(arr);
        if(!ismarked || type==1)
        {const timetaken = animate(arr[0]);
        animate2(arr[1],timetaken,arr[2]);
        ismarked = true;
        }
        else
        {   
            instantanimate(arr[0]);
            instantanimate2(arr[1],arr[2]);
        }
        //console.log("Function done");
        
        
        
        //console.log(arr);
        //alert("No of walls"+count);
        //alert("No of start"+count1);
        //alert("Dimension of start node "+[startnodey1,startnodex1]);
        //alert("dimension of end node "+ [targetnodey1,targetnodex1]);

    }

    function depthfirstsearch(type)
    {   if(isrunning) return;
        if(!ismarked|| type==1)
        isrunning = true;
        let count = 0;
        // ismarked = true;
        //let count1 = 0;
        currentalgo="dfs";
        let startnodey1 = 0;
        let startnodex1 = 0;
        let targetnodex1 = 0;
        let targetnodey1 = 0;
        for(let i=0;i<rownumber;i++)
        {
            for(let j=0;j<colnumber;j++)
            {
                if(grid[i][j].wall) count++;
                if(grid[i][j].start) {startnodex1=j;startnodey1=i;}
                if(grid[i][j].target) {targetnodex1=j;targetnodey1=i;}
            }
        }

        const arr = dfs(grid,[startnodey1,startnodex1],[targetnodey1,targetnodex1])
        // console.log(arr);
        if(!ismarked || type==1)
        {const timetaken = animate(arr[0]);
        animate2(arr[1],timetaken,arr[2]);
        ismarked = true;
        }
        else
        {   
            instantanimate(arr[0]);
            instantanimate2(arr[1],arr[2]);
        }
    }


    function djikstraalgo(type)
    {   if(isrunning) return;
        if(!ismarked || type==1)
        isrunning = true;
        // ismarked = true;
        let count = 0;
        //let count1 = 0;
        currentalgo="djikstra";
        let startnodey1 = 0;
        let startnodex1 = 0;
        let targetnodex1 = 0;
        let targetnodey1 = 0;
        for(let i=0;i<rownumber;i++)
        {
            for(let j=0;j<colnumber;j++)
            {
                if(grid[i][j].wall) count++;
                if(grid[i][j].start) {startnodex1=j;startnodey1=i;}
                if(grid[i][j].target) {targetnodex1=j;targetnodey1=i;}
            }
        }

        const arr = djikstra(grid,[startnodey1,startnodex1],[targetnodey1,targetnodex1])
        if(!ismarked || type==1)
        {const timetaken = animate(arr[0]);
        animate2(arr[1],timetaken,arr[2]);
        ismarked = true;
        }
        else
        {   
            instantanimate(arr[0]);
            instantanimate2(arr[1],arr[2]);
        }
    }


    function astaralgo(type)
    {   if(isrunning) return;
        if(!ismarked || type==1)
        isrunning = true;
        // ismarked = true;
        let count = 0;
        //let count1 = 0;
        currentalgo="astar";
        let startnodey1 = 0;
        let startnodex1 = 0;
        let targetnodex1 = 0;
        let targetnodey1 = 0;
        for(let i=0;i<rownumber;i++)
        {
            for(let j=0;j<colnumber;j++)
            {
                if(grid[i][j].wall) count++;
                if(grid[i][j].start) {startnodex1=j;startnodey1=i;}
                if(grid[i][j].target) {targetnodex1=j;targetnodey1=i;}
            }
        }

        const arr = a_star(grid,[startnodey1,startnodex1],[targetnodey1,targetnodex1])
        // console.log(arr);
        if(!ismarked || type==1)
        {const timetaken = animate(arr[0]);
        animate2(arr[1],timetaken,arr[2]);
        ismarked = true;
        }
        else
        {   
            instantanimate(arr[0]);
            instantanimate2(arr[1],arr[2]);
        }
    }

    function animate(arr)
    {   var curr = 0;
        const time = speed;

        for(let i=0;i<rownumber;i++)
        {
            for(let j=0;j<colnumber;j++)
            {
                document.getElementById(`${i}-${j}`).classList.remove("visited","Shortestpath","visitednormal");
            }
        }


        for(let i=0;i<arr.length;i++)
        {
            const y = arr[i][0];
            const x = arr[i][1];
            setTimeout(()=>{document.getElementById(`${y}-${x}`).classList.add("currently");
            },curr+time);
            curr = curr+time;
            setTimeout(()=>{
            document.getElementById(`${y}-${x}`).classList.remove("currently");
            document.getElementById(`${y}-${x}`).classList.add("visited");
            },curr+time);
        }
        return curr;
    }

    function instantanimate(arr)
    {   //console.log("instantanimate")
    // console.log(arr);
        for(let i=0;i<rownumber;i++)
        {
            for(let j=0;j<colnumber;j++)
            {
                document.getElementById(`${i}-${j}`).classList.remove("visited","Shortestpath","visitednormal");
            }
        }

        for(let i=0;i<arr.length;i++)
        {
            const y = arr[i][0];
            const x = arr[i][1];
            document.getElementById(`${y}-${x}`).classList.add("visitednormal");
        }

    }

    function animate2(arr,timetaken,check)
    {   
        var curr = timetaken;
        // const time = (speed*5>250)?250:speed*5;
        const time = 100;
        if(check)
        {for(let i=arr.length-1;i>=0;i--)
        {
            const y = arr[i][0];
            const x = arr[i][1];
            setTimeout(()=>{
                document.getElementById(`${y}-${x}`).classList.remove("visited");
                document.getElementById(`${y}-${x}`).classList.add("Shortestpath");
                
        
        },timetaken+time);
        timetaken = timetaken+time;
        }
    setTimeout(()=>{isrunning=false;},timetaken+time);
    }
        if(!check) setTimeout(()=>{alert("NO SHORTEST PATH FOUND");isrunning = false;},timetaken+time);
    }

    function instantanimate2(arr,check)
    {   //console.log("instantanimate2");
     // console.log(arr);    
    //if(check){
     for(let i=arr.length-1;i>=0;i--)
        {
            const y = arr[i][0];
            const x = arr[i][1];
           
                document.getElementById(`${y}-${x}`).classList.remove("visitednormal");
                document.getElementById(`${y}-${x}`).classList.add("Shortestpath");
                
        
       
        }
    //}
    if(!check)
    {
        alert("NO SHORTEST PATH FOUND");
    }
    


    }


    
    function changespeed(e){
        let v = parseInt(e.target.value)
        speed = v;
    }




    





    return (
        <div className="Grid_visualize">

            <div class="header__text">
                <h1>Pathfinding Visualizer</h1>
            </div>
            <div className="header">
                
                
                <button className="button" onClick={() => resetBoard()}>Clear Board</button>
                <button className="button" onClick={() => breadthfirstsearch(1)}>Breadth First Search</button>
                <button className="button" onClick = {()=>depthfirstsearch(1)}>Depth First Search</button>
                <button className="button" onClick={()=>djikstraalgo(1)}>Djikstra's Algorithms</button>
                <button className="button" onClick = {()=>astaralgo(1)}>A* Algorithm</button>
                <button className="button" onClick={()=>randommaze(grid)}>Random Walls</button>
                <button className="button" onClick={()=>randomweight(grid)}>Random Weights</button>
                <button className="button" onClick={()=>basicrandommaze(grid)}>Random Wall Maze</button>
                <button className="button" onClick={()=>basicrandomweight(grid)}>Random Weight Maze</button>
                <div className="button">
                <label for="select" id="labeltext">Speed:</label>
                <select name="Speed"  onChange = {(e)=>{changespeed(e)}} className="select" id="select" >
                    <option value={fast} >Fast</option>
                    <option value = {average}>Average</option>
                    <option value={slow}>Slow</option>
                </select>
                </div>
                
            </div>
            <div className="text">
                <p><b>NOTE : </b>Click on the grid to add a wall . Click on grid while pressing w to add a weighted node . You can change position of start and target node anytime by dragging with mouse</p>
            </div>
            <div className="grid" 
            
            >{grid.map((display))}
            </div>
        </div>
    );
}

export default PathFindingVisualizer;
