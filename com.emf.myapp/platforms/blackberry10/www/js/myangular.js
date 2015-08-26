var app = angular.module('sewaPinjamApp',['ngRoute']);
 
app.run(function(){
	//
});

app.factory("KelolaSvc", function($http){
	return{
		all: function(alamat){
			var req = $http.get('https://sewapinjam.firebaseio.com/'+alamat+'.json');
			return req;
		},
		create: function(alamat, data){
			var req = $http.post('https://sewapinjam.firebaseio.com/'+alamat+'.json', data);
			return req;
		},
		get: function(alamat, id){
			var req = $http.get('https://sewapinjam.firebaseio.com/'+alamat+'/'+id+'.json');
			return req;
		},
		update: function(alamat, id, data){
			var req = $http.patch('https://sewapinjam.firebaseio.com/'+alamat+'/'+id+'/.json', data);
			return req;
		},
		delete: function(alamat, id){
			var req = $http.delete('https://sewapinjam.firebaseio.com/'+alamat+'/'+id+'.json');
			return req;
		}
	}
});

app.controller('BerandaCtrl', function($scope, $filter, KelolaSvc){
	
	//

});

app.controller('LoginCtrl', function($scope, $filter, KelolaSvc){
	
	// variabel
	$scope.akuns = {};
	$scope.barangs = {};
	$scope.notifs = {};
	$scope.temp_akun = {
		nama: "",
		email: "",
		telp: "",
		alamat: "",
		password: ""
	};
	$scope.login = {
		email: "",
		password: ""
	}

	// fungsi
	$scope.fresh_akun = function(){
		$scope.temp_akun = {
			nama: "",
			email: "",
			telp: "",
			alamat: "",
			password: ""
		};
	}
	$scope.fresh_login = function(){
		$scope.login = {
			email: "",
			password: ""
		}
	}
	$scope.get_akuns = function(){
		var req = KelolaSvc.all('akun');
		req.success(function(res){
			$scope.akuns = res;
		});
	}
	$scope.get_barangs = function(){
		var req = KelolaSvc.all('barang');
		req.success(function(res){
			$scope.barangs = res;
		});
	}
	$scope.get_notifs = function(){
		var req = KelolaSvc.all('notifikasi');
		req.success(function(res){
			$scope.notifs = res;
		});
	}

	$scope.get_akuns();
	$scope.get_barangs();
	$scope.get_notifs();

	$scope.get_akun = function(emailnya){
		var terfilter = [];
		angular.forEach($scope.akuns, function(item){
			if(item.email === emailnya){
				terfilter.push(item);
			}
		});
		$scope.temp_akun = terfilter[0];
	}
	$scope.add_akuns = function(){
		var req = KelolaSvc.create('akun', $scope.temp_akun);
		req.success(function(res){
			alert("Akun Tersimpan!");
			window.location.href = "#page-login";
		});
	}
	$scope.login_akun = function(){
		$scope.get_akun($scope.login.email);
		if($scope.temp_akun){
			if($scope.login.password === $scope.temp_akun.password){
				alert("Selamat Datang, "+$scope.temp_akun.nama);
				window.location.href = "#page-beranda";
			}else{
				alert("Password salah!");
			}
		}else{
			alert("Akun tidak terdaftar!");
		}
	}

});