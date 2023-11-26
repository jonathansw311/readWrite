// include fs for writing a file
const fs = require('fs');
//so we can read a file line by line
const readline = require('readline')
//have to include axios
const axios = require('axios');



//sets up file stream to read one line at a time
async function readlines(){
    const fileStream = fs.createReadStream(file1)
    const r1 = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

r1.on(
    'line', function(line){
        getUrlData(line)
    }
)

}
//gets the file name based off the url
function getFileName(line){
    const parsedUrl = new URL(line)
    return parsedUrl.hostname
}
//gets the url data from the line in the file
async function getUrlData(line){
    
    try{
    const res = await axios.get(line)
        writeDataFile(res.data, line)
    }
    catch(err){
        console.log(`Error, could not download ${line}`)
    }
}


    //Writes the url data into a file named after the url
    function writeDataFile(filedata, line){
        //parses the url into a file name
        fileName = getFileName(line)
        fs.writeFile( fileName, filedata,  'utf8',  function(err){
            if(err){
                console.log("ERROR:", err)
                process.kill(1)
            }
            else{
                console.log(`Wrote to ${fileName} `)
            }
        })
    }

let file1 = process.argv[2]
readlines(file1);
