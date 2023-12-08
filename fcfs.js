
let prInfo=null;
const storeddData =localStorage.getItem("pInfo");
prInfo = JSON.parse(storeddData);

//console.log(prInfo.data);

let nn=prInfo.data.length;
let inpt=prInfo.data;
//console.log(inpt[0].at);
let process=[]
for(let i=0;i<nn;i++){
    
     const obj={
        pid:inpt[i].pid,
        at:Number(inpt[i].at),
        bt:Number(inpt[i].bt),
        ct:0,
        tat:0,
        wt:0,
        rt:0

     }
     process.push(obj);

}
// uniqueColors = ["#FFB6C1", "#66CDAA", "#3CB371", "#FF7F50", "	#DC143C", "#708090","#C71585","#4B0082","#008B8B","	#BDB76B"];
const mp = new Map();
 for(let i=0;i<nn;i++){
     
    mp.set(inpt[i].pid,i);
 }

//console.log(prInfo.data);

for(let i=0;i<nn-1;i++){ 
    for(let j=0;j<nn-i-1;j++){ 
        if(process[j].at>process[j+1].at){ 
            let temp; 
            //sorting burst times 
            temp = process[j].bt; 
            process[j].bt = process[j+1].bt; 
            process[j+1].bt = temp; 
            //sorting arrival times 
            temp = process[j].at; 
            process[j].at = process[j+1].at; 
            process[j+1].at = temp; 
            //sorting their respective IDs 
            temp = process[j].pid; 
            process[j].pid = process[j+1].pid; 
            process[j+1].pid = temp; 
        } 
    } 
} 
//console.log(process);

let gianttChart=[];
let sum = 0; 
sum = sum + process[0].at; 
if(0<process[0].at){ 

    let obj={
       pid:"idle",
       start:0,
       end: process[0].at,
   }  
   gianttChart.push(obj);
}
for(let i = 0;i<nn;i++){ 
     
    let save=sum;
    sum = sum + process[i].bt; 
    process[i].ct = sum; 
     process[i].tat = process[i].ct - process[i].at; 
     process[i].wt = process[i].tat - process[i].bt; 
     
     let obj2=null;
     if(i+1<nn && sum<process[i+1].at){ 

         obj2={
            pid:"idle",
            start:process[i].ct,
            end: process[i+1].at,
        }  
        let t = process[i+1].at-sum; 
        sum = sum+t; 
    }
       const obj={
        pid:process[i].pid,
        tat:process[i].tat,
        start:save,
        end:process[i].ct,
        at:process[i].at,
        bt:process[i].bt,
        wt:process[i].wt
    } 

    gianttChart.push(obj);
   if(obj2!=null) gianttChart.push(obj2);
} 


let wait=0;
let tatime=0;

//     let id=prInfo.data[i].pid;
//     for(let j=0;j<nn;j++){ 
//         if(process[j].pid==id){ 
//             const ct = table.rows[i+1].cells[4];
//             const tat = table.rows[i+1].cells[5];
//             const wt = table.rows[i+1].cells[6];

//             ct.textContent = process[j].ct;
//             tat.textContent = process[j].tat;
//             wt.textContent = process[j].wt;
//             wait+= process[j].wt;
//             tatime+=process[j].tat;
//         } 
//     } 

// let avgWt=wait/nn;
// let avgTat=tatime/nn;
// let tatValue=document.getElementById("tatValue");
// tatValue.innerText=`${avgTat.toFixed(2)} ms`;

// let wtValue=document.getElementById("wtValue");
// wtValue.innerText=avgWt.toFixed(2)+" ms";

// let execValue=document.getElementById("execValue");
// execValue.innerText="hi";

//console.log(process);

let table2 = document.getElementById("myTable2");let itr=0;let gSize=gianttChart.length;
let table = document.getElementById("myTable1");
     
  
    function breakSum(sum) {
        const x = Math.floor(Math.random() * (sum + 1)); // Random x between 0 and sum
        const y = sum - x;
        return { x, y };
      }
      
    let tableBody3=document.getElementById("tableBody3");
       
    var newRow = tableBody3.insertRow();
    for(let i=0;i<gSize;i++){
        var cell = newRow.insertCell(i);
       // cell.id="giantData";
        cell.style.textAlign = "center";
    }
     newRow = tableBody3.insertRow();
    for(let i=0;i<gSize;i++){
        var cell = newRow.insertCell(i);
        cell.id="giantData";
        cell.style.textAlign = "center";
    }
    async function myAsyncFunction() {
        for (let itr = 0; itr < gSize; itr++) {
          // Your code for each iteration goes here
          await new Promise(resolve => setTimeout(resolve, 500));
          let id=gianttChart[itr].pid;let row=-1;
          
          if(id=="idle"){
                 
            let table3=document.getElementById("table3");
            let c1=table3.rows[0].cells[itr];c1.textContent=gianttChart[itr].pid; c1.style.backgroundColor="white";
          let c2=table3.rows[1].cells[itr];c2.textContent=gianttChart[itr].start+"-"+gianttChart[itr].end; 
          continue;
          }  

          for(let i=0;i<nn;i++){
                
            let pidCell=table2.rows[i+2].cells[0];
                 if(id==table.rows[i+1].cells[0].textContent){
                pidCell.style.backgroundColor=uniqueColors[(i)%10];
                continue;
                   }
                  pidCell.style.backgroundColor="";

          }
              for(let i=0;i<nn;i++){
              
            const cellValue = table.rows[i+1].cells[0].textContent;
            if(cellValue==id){row=i+1;break;}
        }
          let statusBar=document.getElementById(id);
          let wide=((gianttChart[itr].end-gianttChart[itr].start)/gianttChart[itr].bt)*100;
         // console.log(wide);
         let pair=breakSum(wide);
         let oldWidth=statusBar.offsetWidth;

          statusBar.style.width= oldWidth+pair.x+"%";
          statusBar.textContent = oldWidth+pair.x+"%";
          let responseCell=table2.rows[row+1].cells[3];
          responseCell.textContent=gianttChart[itr].start-gianttChart[itr].at;
   
          await new Promise(resolve => setTimeout(resolve, 500));

         let pairr=breakSum(wide-pair.x);
          statusBar.style.width= pair.x+pairr.x+"%";
          statusBar.textContent = pair.x+pairr.x+"%";

          await new Promise(resolve => setTimeout(resolve, 500));
           statusBar.style.width= wide+"%";
           statusBar.textContent = wide+"%";
           statusBar.textAlign="center"
            
           let remBurstCell=table2.rows[row+1].cells[2];
          remBurstCell.textContent=0;

        //   let pidCell=table2.rows[row+1].cells[0];
        //   pidCell.style.backgroundImage = 'url("tick.png")'; // Replace with your tick image URL
        //   pidCell.style.backgroundSize = 'cover'; // Adjust image size as needed
        //   pidCell.style.backgroundRepeat = 'no-repeat';
        //   pidCell.style.backgroundPosition = 'center';
          //pidCell.style.color = 'transparent';
          
         // console.log('Iteration ' + i);
      
          // Introduce a 2-second delay using await and setTimeout
         // await new Promise(resolve => setTimeout(resolve, 2000));

                  
         for(let j=0;j<nn;j++){ 
             if(table.rows[j+1].cells[0].textContent==id){ 
                 const ct = table.rows[j+1].cells[4];
                 const tat = table.rows[j+1].cells[5];
                 const wt = table.rows[j+1].cells[6];
     
                 ct.textContent =gianttChart[itr].end;
                 tat.textContent = gianttChart[itr].tat;
                 wt.textContent =gianttChart[itr].wt;
                 wait+= process[j].wt;
                 tatime+=process[j].tat;
             } 
         }
         let table3=document.getElementById("table3");
          let c1=table3.rows[0].cells[itr];c1.textContent=gianttChart[itr].pid; c1.style.backgroundColor=uniqueColors[(mp.get(gianttChart[itr].pid))%10];
        let c2=table3.rows[1].cells[itr];c2.textContent=gianttChart[itr].start+"-"+gianttChart[itr].end; 
        } 
 let avgWt=wait/nn;
let avgTat=tatime/nn;
await new Promise(resolve => setTimeout(resolve, 100));
let tatValue=document.getElementById("tatValue");
tatValue.innerText=`${avgTat.toFixed(2)} ms`;

let wtValue=document.getElementById("wtValue");
wtValue.innerText=avgWt.toFixed(2)+" ms";
        
let playButton=document.getElementById("play-again-button");
playButton.style.display = "block"; 

let playAnother=document.getElementById("play-another");
playAnother.style.display = "block";

for(let i=0;i<nn;i++){
    let pidCell=table2.rows[i+2].cells[0];
    pidCell.style.backgroundColor=uniqueColors[(i)%10];
  }

      }
      
      myAsyncFunction();






