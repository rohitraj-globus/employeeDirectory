var express= require("express"),
bodyParser=require("body-parser"),
mongoose=require("mongoose"),
userModelController=require(__dirname+"/server/controllers/userModel.controller.js");

mongoose.Promise=global.Promise;
mongoose.connect("mongodb://rohit:rohit@ds137230.mlab.com:37230/employee_directory");

var app=express();
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

app.get("/",function(req,res){
	res.sendFile(__dirname+"/public/home.html");
});

//RESTFUL API'S
app.get("/api/userModel",userModelController.getUsers);
app.put("/api/updateUserModel/:_id",userModelController.updateUser);
app.delete("/api/deleteUserModel/:_id",userModelController.deleteUser);
app.post("/api/userModel",userModelController.createUser);

var port = process.env.PORT || 8080;
app.listen(port, function(){
  console.log("HTTP server is up & Running on port " + port);
});
