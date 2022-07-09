const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

const mongoose= require("mongoose");
const internal = require('stream');

// const date = require(__dirname+"/date.js");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set('view engine','ejs');

mongoose.connect('mongodb+srv://admin-divanshu:mannusoja@cluster0.morxraw.mongodb.net/todov2DB',{ useNewUrlParser: true })


const itemsSchema= {
    name: String
}

const Item = mongoose.model("Item",itemsSchema);

const item1= new Item({
    name: "Welcome buddy"
})

const item2= new Item({
    name: "+ button to save"
})

const item3= new Item({
    name: "Click on check box for deleting"
})

const defaultItems= [item1,item2,item3];



// Item.save();


app.get("/",function (req,res) {

    // let day = date();


    Item.find({},function(err,founditems){


        if(founditems.length===0){

            Item.insertMany(defaultItems,function (err) {
                if(err){
                    
                    console.log(err);
                }
                else{
                    console.log("Success");
                }
            
            })
            res.redirect("/");

        }
        else{
            res.render("list",{
        
                listTitle:"Tasks",
        
                newListItem:founditems
            
            });
        }

    });
});

app.post("/", function(req,res){
    const itemName= req.body.newItem;

    const item= new Item({
        name: itemName
    });
    item.save();
    res.redirect("/");

})

app.post("/delete",function(req,res){

    const checkeditemId = req.body.checkbox;

    Item.findByIdAndRemove(checkeditemId,function(err){
        if(!err){
            console.log("Success");
            res.redirect("/");
        }
    })

})
  


app.listen(3000,function(){
console.log("Server started on port 3000");
});

