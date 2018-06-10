const office = require("officegen");
const firebase = require("./firebase");
const storage = firebase.storage();

function gen_doc(data) {
    let docx = office({
        'type': 'docx',
        'orientation': 'portrait',
        'subject': 'Incident Report',
        'description': 'Incident Report TPS'
    });

    let doc = docx.createP();
    doc.options.align = 'left';
    doc.addText('TPS Incident Report', { bold: true });
    doc.addLineBreak();
    Object.keys(data).map(key => {
        doc.addText(`${toString(key)} : ${data[key]}`);
        doc.addLineBreak();
    })
    fileRef = `/tmp/${data.id}_report.docx`
    let out = fs.createWriteStream(fileRef);
    doc.generate(out);
    out.on('close', function () {


    }
    );
}

function upload_file(file) {
    const storageRef = storage.ref();
    let tmpRef = storageRef.child('tmp');

    let fileRef = tmpRef.child(fileRef.name);

}