var app = angular.module('sewaPinjamApp',['ngRoute']);
 
app.run(function(){
	//
});

app.controller('BerandaCtrl', function($scope, $filter){
	//
	alert("Welcome Guys!");

	var ref = new Firebase("https://sewapinjam.firebaseio.com/");

	// var akun = ref.child("akun");
	$scope.nama = "Hei";
	$scope.akuns = {};

	$scope.get_akuns = function(){
		var anak = ref.child("akun");
		anak.on("value", function(res){
			var hasil = res.val();
			$scope.akuns = hasil;
			alert($scope.akuns.fulana.nama);
			$scope.nama = $scope.akuns.fulana.nama;
		});
	}

	// $scope.get_akuns();
});