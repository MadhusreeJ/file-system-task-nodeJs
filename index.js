const express = require("express")
const fs = require("fs");
const path = require("path");
const { message } = require("statuses");
const app = express();

const port = process.env.PORT || 3000;
app.listen(port,()=>{
console.log("Webser running");
})
 

app.get("/createfile",(req,res) =>{
    const d = new Date();
    let date = d.toJSON().slice(0,10);
    let time = d.getHours() + "-" + d.getMinutes()
    const file = path.join('saved_files', `${date}_${time}.txt`);
    let data = d.toString();

    fs.writeFile(file, data, function (err) {
        if (err) {
         res.send("Something went wrong");
         return console.log(err);
        }
        const responseData= {
            message : "File created successfully",
            fileData : data
        }
        res.json(responseData);
        console.log("File created successfully");
    
      });

})


app.get("/retrievefiles",(req,res)=>{
    const folder ='saved_files'
    fs.readdir(folder, (err, files) => {
        if (err) {
          console.log(err);
          res.send('Something went wrong');
        } else {
          const allTextFiles = files.filter((file) => path.extname(file) === '.txt');
          res.json(allTextFiles);
          console.log("Successfully retrieved text files")
        }
      });
})



