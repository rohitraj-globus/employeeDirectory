(function(){
	angular.module("app",[]).controller("homeController",function($scope,$http){
		$scope.users=[];
		$scope.userObj={name:"",email:"",dob:"",dept:"",gender:"",age:""};
		$scope.isLoggedIn=false;
		$scope.errorMsg=false;
		$scope.showList=true;
		$scope.showAdd=false;


		//get collection list
		$scope.getUsers=function(){
			console.log("fetch user list from database");
			$http.get("/api/userModel").success(function(data,status){
				$scope.users=data;
			});
		};
		$scope.getUsers();
	
		var pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");

		//update user details
		$scope.createUser=function(){
			console.log("create user",$scope.userObj);	
			if(($scope.userObj.name !=="") && pattern.test($scope.userObj.email) && ($scope.userObj.dob !=="") && ($scope.userObj.dept !=="") && ($scope.userObj.gender !=="")){
				$http({url:"/api/userModel",method:"POST",data:$scope.userObj}).success(function(dat,status){
					$scope.users.push(dat);
					$scope.message=$scope.userObj.name+" has been entered in db Successfully";
					$('#errorModal').modal('toggle');
					$scope.viewList();
					$scope.userObj={name:"",email:"",dob:"",dept:"",gender:"",age:""};
				}).error(function(err){
					console.log("error in creating user in db: ",err);
					$scope.message="Error in creating user in db: "+err;
					$('#errorModal').modal('toggle');	
				});	
			}
		};

		//delete user from collection
		$scope.deleteUser=function(user){
			$http({url:"/api/deleteUserModel/"+user._id,method:"DELETE",data:user}).success(function(data,status){
				console.log("deleted user from DB");	
				$scope.getUsers();
				$scope.message="\""+user.name+"\" Deleted Successfully";
				$('#errorModal').modal('toggle');
			}).error(function(err){
				console.log("error in deleting user from db: ",err);
				$scope.message="Error in deleting user from db: "+err;
				$('#errorModal').modal('toggle');
			});

		};

		//Authinticate user. Currently hardcoding username and password, It will be connected after project completion.
		$scope.ChekAuth=function(username,password){
			if(username==="admin" && password==="admin")
			{
				$scope.isLoggedIn=true;
				$scope.errorMsg=false;
				$('#myModal').modal('toggle');
			}
			else{
				$scope.isLoggedIn=false;
				$scope.errorMsg=true;
			}
		};
		
		//logout admin from application.
		$scope.logout=function(username,password){
			$scope.errorMsg=false;
			$scope.isLoggedIn=false;
		};

		//Hide add employee.
		$scope.viewList=function(){
			$scope.showList=true;
			$scope.showAdd=false;
		};

		//Hide view employee list.
		$scope.addList=function(){
			$scope.showList=false;
			$scope.showAdd=true;
		};

		//calculate age of an employee.
		$scope.calculateAge=function(dob){
			var datOfBirth = new Date(dob);
			var currentDate = new Date();
			var age=currentDate.getFullYear()-datOfBirth.getFullYear();
			if(currentDate.getFullYear()-datOfBirth.getFullYear()>0){
				if(currentDate.getMonth()-datOfBirth.getMonth()==0){
					if(currentDate.getDate()-datOfBirth.getDate()<0){
						age=age-1;
					}
				}
				else if(currentDate.getMonth()-datOfBirth.getMonth()<0){
				age=age-1;
				}
			}
			$scope.userObj.age=age;
		};

		//sort column on header click
		$scope.sortColumnBy = function (propertyName) {
			$scope.chatReverse = ($scope.columnName === propertyName) ? !$scope.chatReverse : false;
			$scope.columnName = propertyName;
			event.preventDefault();
		};
	});
})();