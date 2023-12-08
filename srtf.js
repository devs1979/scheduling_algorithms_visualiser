let proInfo=null;
const storedDataa =localStorage.getItem("pInfo");
proInfo = JSON.parse(storedDataa);

proInfo=proInfo.data;
//console.log(proInfo);

// uniqueColors = ["#FFB6C1", "#66CDAA", "#3CB371", "#FF7F50", "	#DC143C", "#708090","#C71585","#4B0082","#008B8B","	#BDB76B"];
const mp = new Map();
 for(let i=0;i<proInfo.length;i++){
     
    mp.set(proInfo[i].pid,i);
 }


let proc=[];let size=proInfo.length;
for(let i=0;i<size;i++){
     
    const obj={
        pid:proInfo[i].pid,
        at:Number(proInfo[i].at),
        bt:Number(proInfo[i].bt),
        ct:-1,
        tat:-1,
        wt:-1,
        inQ:false,
        isCt:false,
        rbt:Number(proInfo[i].bt)
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

let programExecuted=0;
let timer=0;
let gChart=[];


const srtf=()=>{
       
    let mini=999999;let indx=-1;
    for(let i=0;i<size;i++){
       
         if(proc[i].at<=timer && proc[i].isCt==false && proc[i].rbt<mini){
              
             mini=proc[i].rbt;
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
    timer++;
    proc[indx].rbt--;

    if(proc[indx].rbt==0){
        proc[indx].ct=timer;
        proc[indx].tat=proc[indx].ct-proc[indx].at;
        proc[indx].wt=proc[indx].tat-proc[indx].bt;
        proc[indx].isCt=true;
        programExecuted++;
    }
    
  
   if(gChart.length!=0 && gChart[gChart.length-1].pid==proc[indx].pid) {
    gChart[gChart.length-1].end=timer;
     
    if(proc[indx].rbt==0){
        gChart[gChart.length-1].ct=proc[indx].ct;
        gChart[gChart.length-1].tat=proc[indx].tat;
        gChart[gChart.length-1].wt=proc[indx].wt;
        gChart[gChart.length-1].rbt=0;
     }
   }else{
        
    if(gChart.length==0 || gChart[gChart.length-1].pid!=proc[indx].pid){
        let obj={
            pid:proc[indx].pid,
            start:save,
            end:timer,
            bt:proc[indx].bt,
            at:proc[indx].at,
            ct:-1,
            tat:-1,
            wt:-1,
            rbt:proc[indx].rbt
      }
      if(proc[indx].rbt==0){
         obj.ct=proc[indx].ct;
         obj.tat=proc[indx].tat;
         obj.wt=proc[indx].wt;
         obj.rbt=0;
      }
      gChart.push(obj);
    }
   }
   
}


while(programExecuted!=size)  srtf();

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
       // console.log("daru")
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
