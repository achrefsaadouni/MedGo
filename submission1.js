'use strict';

const fs = require('fs');

      
const N=20000;
 
var st = [];

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


 

//update the node at index pos with val while updating each range where pos is contained
function update(idx,left,right,pos,val){
	if (left>pos || right<pos)
		return;
	if (left==right && left==pos){
		st[idx]=val;
		return;
	}
	var mid=parseInt((left+right)/2);
	update(idx*2,left,mid,pos,val);
	update(idx*2+1,mid+1,right,pos,val);
	if (st[(idx*2)]>st[(idx*2)+1])
		st[idx]=st[(idx*2)];
	else
		st[idx]=st[(idx*2)+1];
}

//get the maximum value of the array in the given range (qleft-qright)
function get(idx,left,right,qleft,qright){
	if (left>qright || right<qleft)
		return 0;
	if (left>=qleft && right<=qright)
		return st[idx];
	var mid=parseInt((left+right)/2);
	var x1=get(idx*2,left,mid,qleft,qright);
	var x2=get(idx*2+1,mid+1,right,qleft,qright)
	if (x1>x2)
		return x1;
	else
		return x2;
}




// i used Segment Tree as a solution to this problem , i sorted the array then i updated each value one by one 
//while getting the maximum at the right side of the array


// Complete the minimumLoss function below.
function minimumLoss(price) {

 
for(var i=0;i<4*N;i++)
    st[i]=0;
    
    var v=[]
	for(var i=0;i<n;i++)
        v[i]={first : a[i], second : i};
	v.sort(function(a, b){return a.first-b.first});
	var ans=1e18;
	for(var i=0;i<n;i++){
		var x=v[i];
		update(1,0,n-1,x.second,x.first);
		var y=get(1,0,n-1,x.second+1,n-1);
		if (y!=0){
			if (x.first-y<ans)
				ans=x.first-y;
		}
	}
return ans ;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const price = readLine().split(' ').map(priceTemp => parseInt(priceTemp, 10));

    let result = minimumLoss(price);

    ws.write(result + "\n");

    ws.end();
}
