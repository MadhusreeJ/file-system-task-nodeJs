const express = require("express")
const fs = require("fs");
const path = require("path")
const app = express();

const port = process.env.PORT || 3000;
app.listen(port,()=>{
console.log("Webser running");
})
 
const d = new Date();
let date = d.toJSON().slice(0,10);
let time = d.getHours() + "-" + d.getMinutes()

app.get("/createfile",(req,res) =>{
    fs.writeFile(`D:/Daily task/Node/Node_Day1/saved_files/${date}_${time}.txt`,`${d}`, function (err) {
        if (err) {
         res.json({message:"Something went wrong"});
         return console.log(err);
        }
        res.json({message:"File created successfully"});
        console.log("File saved");
    
      });
})


const folder = 'D:/Daily task/Node/Node_Day1/saved_files/';
app.get("/retrievefiles",(req,res)=>{
    fs.readdir(folder, (err, files) => {
        if (err) {
          console.log(err);
          res.send('Something went wrong');
        } else {
          const allTextFiles = files.filter((file) => path.extname(file) === '.txt');
          res.json(allTextFiles);
        }
      });
})



