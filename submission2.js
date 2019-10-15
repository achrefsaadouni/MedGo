'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}


// Complete the lilysHomework function below.
function lilysHomework(arr) {
    var n = arr.length;

    var ans1=0,ans2=0;
    var copy=arr.slice();
    var copy2=arr.slice();
    copy.sort(function(a, b){return a-b});
    var pos = [];
    for(var i=0;i<n;i++)pos[arr[i]]=i;
    for(var i=0;i<n;i++){
        if(copy2[i]!=copy[i]){
            ans1++;
            pos[copy2[i]]=pos[copy[i]];
            copy2[i] = [copy2[pos[copy[i]]], copy2[pos[copy[i]]] =  copy2[i]][0];
            pos[copy[i]]=i;
        }
    }

    copy=arr.slice();
    copy2=arr.slice();
    copy.sort(function(a, b){return b-a});

    for(var i=0;i<n;i++)pos[arr[i]]=i;


    for(var i=0;i<n;i++){
        if(copy2[i]!=copy[i]){
            ans2++;
            pos[copy2[i]]=pos[copy[i]];
            copy2[i] = [copy2[pos[copy[i]]], copy2[pos[copy[i]]] =  copy2[i]][0];
            pos[copy[i]]=i;
        }
    }

   if (ans1>ans2)return ans2;
   else 
return ans1;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = lilysHomework(arr);

    ws.write(result + "\n");

    ws.end();
}
