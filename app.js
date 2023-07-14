console.log("HI");

let videoElement=document.querySelector("video");

let recordButton=document.querySelector(".inner-record");
let capturePhoto=document.querySelector(".inner-capture");


let isRecording=false;
let mediaRecorder;

/*
(function add(a,b){
    console.log(a+b);    
})(2,3);
iife(immediately invoked function) fxn immmediately fxn jo khud call ho jayega on loading js
*/

(async function()   // bina naam diye chal jayegaa
{
     let constraint={
        video:true,
        // audio:true,
     };
    
     let mediaStream= await navigator.mediaDevices.getUserMedia(constraint);
     videoElement.srcObject=mediaStream;
     mediaRecorder=new MediaRecorder(mediaStream);
    //  console.log(mediaStream);
     mediaRecorder.onstart=function(){
        console.log("on Start inside");
        isRecording=true;
     };
     mediaRecorder.ondataavailable=function()
     {
        console.log("on data avaialaible");
        // console.log(mediaRecorder);
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
  
})(); 