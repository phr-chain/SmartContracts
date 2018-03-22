
var ipfsAPI = require('ipfs-api');


let ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' });

// expect file content
export function uploadFile(fileContent) {

    // let fileReader = new FileReader();
    // fileReader.readAsBinaryString(fileContent)
    //  var fileData = fileReader.result;

    return new Promise((resolve, reject) => {
        // fileReader.onload = () => {
        //     let data = fileReader.result;
        //     let buffer = Buffer.from(data);
        //     let content = []
        //     content.push({
        //         path: "file 1",
        //         content: buffer
        //     });

            ipfs.add(new Buffer(fileContent,"binary"), (err, res) => {
                if (err){
                    console.log(err);
                    reject(err);
                    
                }
                else{
                    console.log(res[0].hash);
                    resolve(res[0].hash);
                }
            });
       // }
     });
}



        export function downloadFile(fileAddress) {
            return new Promise((resolve, reject) => {

                ipfs.files.cat(fileAddress,(err, file)=>{

                    if(err){
                        debugger;
                        reject(err);
                    }
                    else{
                        debugger;
                        resolve(file);
                    }

                })           
            });
        }