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

//we will be counting every swap  while we are sorting the table 

// Complete the lilysHomework function below.
function lilysHomework(arr) {
    var ans = 0;
        for (let i = 0; i < arr.length - 1; i += 1) {
          let minIndex = i;
    
          // Find minimum element in the rest of array.
          for (let j = i + 1; j < arr.length; j += 1) {
            
            if (arr[j] < arr[minIndex]) {
              minIndex = j;
            }
          }
    
          // If new minimum element has been found then swap it with current i-th element.
          if (minIndex !== i) {
            arr[minIndex] = [arr[i], arr[i] =  arr[minIndex]][0];
            ans++;
          }
        }
    
        return ans;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = lilysHomework(arr);

    ws.write(result + "\n");

    ws.end();
}
