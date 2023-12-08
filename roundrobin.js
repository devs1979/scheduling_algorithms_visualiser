let proInfo=null;
const storedDataa =localStorage.getItem("pInfo");
proInfo = JSON.parse(storedDataa);

//console.log(proInfo);
proInfo=proInfo.data;

let proc=[];let size=proInfo.length;

// uniqueColors = ["#FFB6C1", "#66CDAA", "#3CB371", "#FF7F50", "	#DC143C", "#708090","#C71585","#4B0082","#008B8B","	#BDB76B"];
const mp = new Map();
 for(let i=0;i<proInfo.length;i++){
     
    mp.set(proInfo[i].pid,i);
 }

for(let i=0;i<size;i++){
     
      const obj={
           pid:i+1,
           pidd:proInfo[i].pid,
           at:Number(proInfo[i].at),
           bt:Number(proInfo[i].bt),
           rbt:Number(proInfo[i].bt),
           ct:-1,
           tat:-1,
           wt:-1,
           inQ:false,
           isCt:false
      }
      proc.push(obj);
}
//console.log(proc)

const gChart=[];
 
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
 

let programExecuted=0;
let timer=0;

let tQuanta=Number(proInfo[0].pr);//console.log(proInfo[0].pr,"ko")
let readyQueue=[];


const output=()=>{
     
    
          
      //  console.log(proc);
    
}

const checkForNewArrivals=()=>{
          
    //console.log(timer,"timer");
    for(let i=0;i<size;i++){
         
        if(proc[i].at<=timer && proc[i].inQ==false && proc[i].isCt==false){

            proc[i].inQ=true;
            readyQueue.push({indx:i,inTime:timer,pid:proc[i].pidd});
        }
    }
}

const updateQueue=()=>{
     
    let recv=readyQueue.shift();//kyunki js m queue nhi hota array se hi kam chlao shift krke
   // console.log(i);
   let i=recv.indx;
   let inTime=recv.inTime;
      let obj={
            pid:recv.pid,
            start:timer,
            end:0,
            rbt:0,
            bt:0,
            at:0,
            ct:0,
            tat:0,
            wt:0
      }
   if(proc[i].rbt<=tQuanta){
       
    proc[i].isCt=true;
    timer+=proc[i].rbt;
    proc[i].ct=timer;
    proc[i].tat=proc[i].ct-proc[i].at;
    proc[i].wt=proc[i].tat-proc[i].bt;
    proc[i].rbt=0;
    programExecuted++;

    if(programExecuted!=size){

        checkForNewArrivals();
    }
    obj.end=timer;
    obj.rbt=proc[i].rbt;
    obj.bt=proc[i].bt;
    obj.at=proc[i].at;
    obj.ct=proc[i].ct;
    obj.tat=proc[i].tat;
    obj.wt=proc[i].wt
   }
   else{
     
       proc[i].rbt-=tQuanta;
       timer+=tQuanta;//console.log(timer);

       if(programExecuted<size){

        checkForNewArrivals();
    }
       readyQueue.push({indx:i,inTime:timer,pid:proc[i].pidd});
       //console.log(readyQueue,"kk")
       obj.end=timer;
       obj.rbt=proc[i].rbt;
       obj.bt=proc[i].bt;
       obj.at=proc[i].at;
   }

   gChart.push(obj);
}
const roundRobin=()=>{
      
    // readyQueue.push(0);
    // timer+=proc[0].at;
    // proc[0].inQ=true;
    for(let i=0;i<size;i++){
         
        if(proc[i].inQ==false && proc[i].isCt==false){
            
            timer=proc[i].at;
            if(gChart.length==0){
                if(timer!=0){
                    const obj={
                        pid:"idle",
                        start:0,
                        end:timer
                    }
                    gChart.push(obj);
                }
            }else{
                if(gChart[gChart.length-1].ct<timer){
                       
                    const obj={
                        pid:"idle",
                        start:gChart[gChart.length-1].ct,
                        end:timer
                    }
                    gChart.push(obj);
                }
            }
            readyQueue.push({indx:i,inTime:timer,pid:proc[i].pidd});
            proc[i].inQ=true;
            break;
        }
    }
   
     while(readyQueue.length!=0){
         
           updateQueue();
          // console.log(8);
             //break;
    }

    output();

}
 
//roundRobin();
while(programExecuted!=size) roundRobin();
//console.log(gChart);


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
     
        let id=gChart[i].pid;let start=gChart[i].start;let end=gChart[i].end;let rbt=gChart[i].rbt;let bt=gChart[i].bt;let at=gChart[i].at;
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
        let statusBar=document.getElementById(id);
        let wide=((bt-rbt)/bt*100).toFixed(2);

        await new Promise(resolve => setTimeout(resolve, 500));
       statusBar.style.width= wide+"%";
       statusBar.textContent = wide+"%";
       let remBurstCell=table2.rows[row+1].cells[2];
       remBurstCell.textContent=rbt;

       let responseCell=table2.rows[row+1].cells[3];
      if(responseCell.textContent=="--") {responseCell.textContent=start-at;}


      const ct = table.rows[row].cells[4];
      const tat = table.rows[row].cells[5];
      const wt = table.rows[row].cells[6];
    
      if(Number(rbt)==0){
      //  console.log("daru")
      ct.textContent =cTime;
      tat.textContent = tatTime;
      wt.textContent =wtTime;

      wait+=wtTime;
      tatime+=tatTime;
    }
     

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
