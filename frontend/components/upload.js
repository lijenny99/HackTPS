const firebase = require("./firebase")
const storage = firebase.storage();

let storageRef = storage.ref();

function upload_recording(file) {
    /*
    Available references needed:
    file.name();
    file.size();
    file.type();
    */
    let folderRef = storageRef.child("recordings");
    let fileRef = folderRef.child(file.name);
    let metadata = {
        contentType: file.type,
        name: file.name,
        size: file.size
    };

    let uploadTask = fileRef.put(file).then((snapshot) => {
        console.log(`File with details ${metadata} uploaded!`);
    }).catch((err) => {
        console.log(`Error ${err}`);
    })

}