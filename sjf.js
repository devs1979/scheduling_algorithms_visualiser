let proInfo=null;
const storedDataa =localStorage.getItem("pInfo");
proInfo = JSON.parse(storedDataa);

proInfo=proInfo.data;

//console.log(proInfo);

let proc=[];let size=proInfo.length;

// uniqueColors = ["#FFB6C1", "#66CDAA", "#3CB371", "#FF7F50", "	#DC143C", "#708090","#C71585","#4B0082","#008B8B","	#BDB76B"];
const mp = new Map();
 for(let i=0;i<proInfo.length;i++){
     
    mp.set(proInfo[i].pid,i);
 }


for(let i=0;i<size;i++){
     
    const obj={
        pid:proInfo[i].pid,
        at:Number(proInfo[i].at),
        bt:Number(proInfo[i].bt),
        ct:-1,
        tat:-1,
        wt:-1,
        inQ:false,
        isCt:false
   }
   proc.push(obj);
}

for(let i=0;i<size-1;i++){
      
    for(let j=0;j<size-i-1;j++){
          
          if(proc[j].at>proc[j+1].at){
              
                //changing at
                let temp=proc[j];
                proc[j]=proc[j+1];
                proc[j+1]=temp;
              
          }
    }
}
// console.log(proc);

 let programExecuted=0;
let timer=0;
let gChart=[];


const sjf=()=>{
       
    let mini=999999;let indx=-1;
      for(let i=0;i<size;i++){
         
           if(proc[i].at<=timer && proc[i].isCt==false && proc[i].bt<mini){
                
               mini=proc[i].bt;
               indx=i;
           }
      } 

      if(indx==-1){
      
        for(let i=0;i<size;i++){
         
            if(proc[i].isCt==false){
                
                let save=timer;
                timer=proc[i].at;
                indx=i;

                if(gChart.length==0){
                     const obj={
                        pid:"idle",
                        start:0,
                        end:timer
                     }
                     gChart.push(obj);
                }else{
                    const obj={
                        pid:"idle",
                        start:save,
                        end:timer
                     }
                     gChart.push(obj);
                }
                break;
            }
       }
    }

    let save=timer;
    timer+=proc[indx].bt;
    proc[indx].ct=timer;
    proc[indx].tat=proc[indx].ct-proc[indx].at;
    proc[indx].wt=proc[indx].tat-proc[indx].bt;
    proc[indx].isCt=true;
    programExecuted++;

    let obj={
        pid:proc[indx].pid,
        start:save,
        end:proc[indx].ct,
        bt:proc[indx].bt,
        at:proc[indx].at,
        ct:proc[indx].ct,
        tat:proc[indx].tat,
        wt:proc[indx].wt
  }
  gChart.push(obj);
      
}

while(programExecuted!=size) sjf();

//console.log(gChart);

function breakSum(sum) {
    const x = Math.floor(Math.random() * (sum + 1)); // Random x between 0 and sum
    const y = sum - x;
    return { x, y };
  }
  


let tableBody3=document.getElementById("tableBody3");
let gSize=gChart.length; 
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


let table = document.getElementById("myTable1");
let table2 = document.getElementById("myTable2");
let wait=0;
let tatime=0;
async function myAsyncFunction() {
      
    for(let i=0;i<gSize;i++){
     
        let id=gChart[i].pid;let start=gChart[i].start;let end=gChart[i].end;let bt=gChart[i].bt;let at=gChart[i].at;
        let cTime=gChart[i].ct;let tatTime=gChart[i].tat;let wtTime=gChart[i].wt;
        await new Promise(resolve => setTimeout(resolve, 500));
          let row=-1;
           
            
          if(id=="idle"){
                 
            let table3=document.getElementById("table3");
            let c1=table3.rows[0].cells[i];c1.textContent=id; c1.style.backgroundColor="white";
          let c2=table3.rows[1].cells[i];c2.textContent=start+"-"+end; 
          continue;
          }
          for(let i=0;i<size;i++){
                
            let pidCell=table2.rows[i+2].cells[0];
                 if(id==table.rows[i+1].cells[0].textContent){
                pidCell.style.backgroundColor=uniqueColors[(i)%10];
                continue;
                   }
                  pidCell.style.backgroundColor="";

          }

          for(let i=0;i<size;i++){
              
            const cellValue = table.rows[i+1].cells[0].textContent;
            if(cellValue==id){row=i+1;break;}
        }
       // console.log(id,"ki")
       let responseCell=table2.rows[row+1].cells[3];
       if(responseCell.textContent=="--") {responseCell.textContent=start-at;}
        let statusBar=document.getElementById(id);
        let wide=100;

        let pair=breakSum(wide);
        let oldWidth=statusBar.offsetWidth;

         statusBar.style.width= oldWidth+pair.x+"%";
         statusBar.textContent = oldWidth+pair.x+"%"
  
         await new Promise(resolve => setTimeout(resolve, 500));

        let pairr=breakSum(wide-pair.x);
         statusBar.style.width= pair.x+pairr.x+"%";
         statusBar.textContent = pair.x+pairr.x+"%";

         await new Promise(resolve => setTimeout(resolve, 500));
          statusBar.style.width= wide+"%";
          statusBar.textContent = wide+"%";
       let remBurstCell=table2.rows[row+1].cells[2];
       remBurstCell.textContent=0;

   


      const ct = table.rows[row].cells[4];
      const tat = table.rows[row].cells[5];
      const wt = table.rows[row].cells[6];
    
        //console.log("daru")
      ct.textContent =cTime;
      tat.textContent = tatTime;
      wt.textContent =wtTime;

      wait+=wtTime;
      tatime+=tatTime;
    
     

       let table3=document.getElementById("table3");
       let c1=table3.rows[0].cells[i];c1.textContent=id; c1.style.backgroundColor=uniqueColors[(mp.get(id))%10];
     let c2=table3.rows[1].cells[i];c2.textContent=start+"-"+end; 
    }

    let avgWt=wait/size;
    let avgTat=tatime/size;
    let tatValue=document.getElementById("tatValue");
    tatValue.innerText=`${avgTat.toFixed(2)} ms`;
    
    let wtValue=document.getElementById("wtValue");
    wtValue.innerText=avgWt.toFixed(2)+" ms";

    let playButton=document.getElementById("play-again-button");
playButton.style.display = "block"; 

let playAnother=document.getElementById("play-another");
playAnother.style.display = "block";
  
for(let i=0;i<size;i++){
  let pidCell=table2.rows[i+2].cells[0];
  pidCell.style.backgroundColor=uniqueColors[(i)%10];
}


  }
  
  myAsyncFunction();

