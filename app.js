// console.log("HI");

let videoElement=document.querySelector("video");

let recordButton=document.querySelector(".inner-record");
let capturePhoto=document.querySelector(".inner-capture");

let zoomIn=document.querySelector(".zoomIn");
let zoomOut=document.querySelector(".zoomOut");
let galleryBtn=document.querySelector(".galleryBtn");


let minZoom=1;
let maxZoom=3;
let currentZoom=1;


let filters=document.querySelectorAll(".filter");
let filterSelected="none";
let isRecording=false;
let mediaRecorder;



galleryBtn.addEventListener("click",()=>
{
   window.location.assign("gallery.html");
});
/*
(function add(a,b){
    console.log(a+b);    
})(2,3);
iife(immediately invoked function) fxn immmediately fxn jo khud call ho jayega on loading js
*/

(async function(){   // bina naam diye chal jayegaa{
     let constraint={
        video:true,
        // audio:true,
     };
    
     // for recording fxn
     let mediaStream= await navigator.mediaDevices.getUserMedia(constraint);
     videoElement.srcObject=mediaStream;
     mediaRecorder=new MediaRecorder(mediaStream);
    //  console.log(mediaStream);
     mediaRecorder.onstart=function(){
        console.log("on Start inside");
        isRecording=true;
     };
     mediaRecorder.ondataavailable=function(e)
     {
        console.log(e.data);
        let videoObject=new Blob([e.data],{type :"video/mp4"}) 
        console.log(videoObject);
        addMedia(videoObject,"video");
        // console.log(mediaRecorder);
      //   let videoUrl=URL.createObjectURL(videoObject);
      //   console.log(videoUrl);
      //   let aTag=document.createElement("a");// 1981 january se kinte second pass hua date.now ye karega;
      //   aTag.download=`Video${Date.now()}.mp4`; // create unique aTagEkement and type
      //   aTag.href=videoUrl;
      //   aTag.click();   
      //   console.log(videoUrl);
     }

     mediaRecorder.onstop=function()
     {
        console.log("on stop avaialaible");
     }
     recordButton.addEventListener("click",function()
     {
        if(isRecording)
        {
            mediaRecorder.stop();
            isRecording=false;
            console.log("stopped");
            recordButton.classList.remove("animate-record");
            return;
        }
        else
        {
            mediaRecorder.start();
            isRecording=true;
            recordButton.classList.add("animate-record");
        }
     });
     
     capturePhoto.addEventListener("click",function()
     {
            capturePhoto.classList.add("animate-capture");
            setTimeout(()=>   // helps in creating delay
            {  
               capturePhoto.classList.remove("animate-capture");
            },1000); 
            let canvas = document.createElement("canvas");
            
            canvas.height=640;
            canvas.width=480;
      
            const ctx = canvas.getContext("2d");
            if(currentZoom!==1)
            {
               ctx.translate(canvas.width/2,canvas.height/2);
               ctx.scale(currentZoom,currentZoom);
               ctx.translate(-canvas.width/2,-canvas.height/2);
            }
            ctx.drawImage(videoElement,0,0,canvas.width,canvas.height);

            // drawImage jo hai voh 0,0 se start hota hai toh ham center se scale karte hai
           
            // ctx.fillStyle = "green";
             if(filterSelected!="none")
             { 
               ctx.fillStyle=filterSelected;
               ctx.fillRect(0,0,canvas.width,canvas.height);
             }

            // let aTag=document.createElement("a");// 1981 january se kinte second pass hua date.now ye karega;
            //   aTag.download=`Image${Date.now()}.jpg`; // create unique aTagEkement and type
            //   aTag.href=canvas.toDataURL("image/jpg");
            //   aTag.click();   
             let canvasUrl=canvas.toDataURL("image/jpg");
            addMedia(canvasUrl,"photo");

     });
     

     filters.forEach((f) => {
      // console.log(f);
      f.addEventListener("click", function(e) {
         let currentFilterSelected = e.target.style.backgroundColor;
         if(currentFilterSelected==filterSelected)
         {   
            document.querySelector(".filter-div").remove();
            filterSelected="none";
            return;
         }

         let filterDiv=document.createElement("div");
         filterDiv.classList.add("filter-div");
         filterDiv.style.backgroundColor=currentFilterSelected;
         
         if(filterSelected==="none")
         {
            document.body.append(filterDiv);
            filterSelected=currentFilterSelected;
         }
         else{
            document.querySelector(".filter-div").remove();
            document.body.append(filterDiv);
            filterSelected=currentFilterSelected;
         }
     });
  });
zoomIn.addEventListener("click",()=>
{
   if(currentZoom+0.1>maxZoom)
   {
      return;
   }
   currentZoom=currentZoom+0.1;
   videoElement.style.transform=`scale(${currentZoom})`;

});

zoomOut.addEventListener("click",()=>
{
   if(currentZoom-0.1<minZoom)
   {
      return;
   }
   currentZoom=currentZoom-0.1;
   videoElement.style.transform=`scale(${currentZoom})`;

});
function addMedia(mediaurl,type)
{
      let txnObject=db.transaction("Media","readwrite");
      let mediaTable=txnObject.objectStore("Media");
      mediaTable.add({
         mid :Date.now(),
         type:type, 
         url :mediaurl,
      })
      txnObject.onerror=function(e)
      {
         console.log("transaction failed" ,e.target.result.message);
      }
   }

})(); 


// mom
// 1. settimeOut working explained(in capture fxn line 72.)
// 2. iife (immediately invoked fxn)(a fxn called immedialtely on page loading)
// 3. async fxn that waits untils the task is being fully completed (can be used ithout giving name of fxn)
// 4. href download working explained in  line 35- 47
// 5. usage of api's getUserMedia,canvas api's 
// 6. canva focus on a part of webpage and works on that specific part
// 7. Blob stands for binary large object that stores large amount of data
