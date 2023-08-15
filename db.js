let db;
let dbOpenRequest=indexedDB.open("Gallery",1);

dbOpenRequest.onupgradeneeded=(e)=>{
    // alert("Inside on upgrade");
    db=e.target.result;
    // console.log(db);
    db.createObjectStore("Media",{keyPath : "mid"});
};

dbOpenRequest.onsuccess=(e)=>
{
    // alert("Inside on success");
    db=e.target.result;
}

dbOpenRequest.onerror=()=>
{
    console.log(e.target.result.message);
}