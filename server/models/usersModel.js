var mongoose= require("mongoose");
 
module.exports=mongoose.model("users",{
		name:String,
		email:String,
		dob:String,
		dept:String,
		gender:String,
		age:Number});