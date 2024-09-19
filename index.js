const express = require("express")
const fs = require("fs");
const path = require("path")
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
         res.json({message:"Something went wrong"});
         return console.log(err);
        }
        res.json({message:"File created successfully"});
        console.log("File saved");
    
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



