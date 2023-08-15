dbOpenRequest.onupgradeneeded=(e)=>{
    // console.log(e.target.result);
     db=e.target.result;
}

dbOpenRequest.onsuccess=(e)=>{
    db=e.target.result;
    fetchMedia();
}


dbOpenRequest.onerror=(e)=>{
    console.log("no db exist"+e.target.result.message);
}


function fetchMedia()
{   
    let txnObject=db.transaction("Media","readonly");
   
    // txnObject.onerror=(e)=>
    // {   
    //     console.log(e.target.error.message);
    // }
    
    let mediaTable=txnObject.objectStore("Media");
    // console.log(mediaTable);
    let cursorObject=mediaTable.openCursor();
    cursorObject.onsuccess=(e)=>
    {
        let cursor=cursorObject.result;
        if(cursor)
        {   
            let mediaObj=cursor.value;
            if(mediaObj.type=="photo")
            {
                appendPhoto(mediaObj);
            }
            else{
                appendVideo(mediaObj);
            }
            cursor.continue();
        }
       
    }
};

function appendPhoto(mediaObj)
{
    let mediaDiv=document.createElement("div");
    mediaDiv.classList.add("media-div");
    mediaDiv.innerHTML=`
    <img src="${mediaObj.url}" class="media-img">
    <div class="media-button">
    <div class="download-media">Download</div>
    <div class="delete-media">Delete</div>
    </div>
    `;
    mediaDiv.querySelector(".download-media").addEventListener("click", () => downloadMedia(mediaObj));
    mediaDiv.querySelector(".delete-media").addEventListener("click", () => deleteMedia(mediaObj,mediaDiv));

    document.querySelector(".gallery").append(mediaDiv);
}

function appendVideo(mediaObj)
{
    let mediaDiv = document.createElement("div");
    mediaDiv.classList.add("media-div");
    mediaDiv.innerHTML = `
        <video src="${mediaObj.url}" autoplay controls loop preload="auto" class="media-video"></video>
        <div class="media-button">
            <div class="download-media">Download</div>
            <div class="delete-media">Delete</div>
        </div>
    `;
    mediaDiv.querySelector(".download-media").addEventListener("click", () => downloadMedia(mediaObj));
    mediaDiv.querySelector(".delete-media").addEventListener("click", () => deleteMedia(mediaObj, mediaDiv));

    document.querySelector(".gallery").append(mediaDiv);
}
function downloadMedia(mediaObj)
{   
    console.log("why enter");
    let aTag=document.createElement("a");
    if(mediaObj.type=="photo")
    {
        aTag.download=`Image_${Date.now()}.jpg`;
        aTag.href=mediaObj.url;
    }
    else{
        aTag.download=`Video${Date.now()}.mp4`;
        aTag.href=URL.createObjectURL(mediaObj.url);
    }
 aTag.click();
}
function deleteMedia(mediaObj,mediaDiv)
{
    //    let txnObject=db 
    let txnObject = db.transaction("Media", "readwrite");
    let mediaTable = txnObject.objectStore("Media");

    let deleteRequest = mediaTable.delete(mediaObj.mid);

    deleteRequest.onsuccess = () => {
        mediaDiv.remove();
    };

    deleteRequest.onerror = (event) => {
        console.error("Error deleting media:", event.target.error);
    };

    txnObject.oncomplete = () => {
        // Database operation completed
        // Now it's safe to remove the div
        mediaDiv.remove();
    };
}
