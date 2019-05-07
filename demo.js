TestApp = angular.module('TestApp', ['TestApp.controllers', 'smart-table', 'ui.bootstrap']);

angular.module('TestApp.controllers', []).controller('testController',  ['$scope', '$http', '$uibModal', function($scope, $http, $modal) {
	$scope.loading = false;
	var modalInstance = null;

	$scope.getData = function() {
		$scope.loading = true;
		$http.get("/demos/api/v1/employees")
		.then(function(response){
			$scope.employees = response.data;
			$scope.loading = false;
		});
	}

	$scope.viewRecord = function(id){
		   if(id > 0) {
			  $http.get("/demos/api/v1/employees?id="+id)
				.then(function(response){
					modalInstance = $modal.open({
					  animation: false,
					  templateUrl: 'view/view_record.html',
					  controller: 'empViewCtrl',
					  scope: $scope,
					  size: '',
					  resolve: {
						  record: function () {
							  return response.data;
						  }
					  }
				   });
				});

		   }


	}

	$scope.addRecord = function(){
		modalInstance = $modal.open({
		  animation: false,
		  templateUrl: 'view/add_record.html',
		  controller: 'addEmpCtrl',
		  scope: $scope,
		  size: '',
		  resolve: {
		  }
	   });

	}

	$scope.editRecord = function(id){
		   if(id > 0) {
			  $http.get("/demos/api/v1/employees/?id="+id)
				.then(function(response){
					modalInstance = $modal.open({
					  animation: false,
					  templateUrl: 'view/update_record.html',
					  controller: 'updateEmpCtrl',
					  scope: $scope,
					  size: '',
					  resolve: {
						  record: function () {
							  return response.data;
						  }
					  }
				   });
				});
		   }

	}

	$scope.cancelModal = function(){
	 modalInstance.dismiss('cancel');
	}

	$scope.saveRecord = function(params) {
		console.log(params);
		$http.post("/demos/api/v1/employees", params)
			.then(function(response){
				console.log(response);
				$scope.getData();
			});
	}

	$scope.updateRecord = function(params) {
		$http.put("/demos/api/v1/employees/?id="+params.id, params)
			.then(function(response){
			  console.log(response);
			  $scope.getData();
			});
	}
	$scope.deletRecord = function(id) {
		if (confirm('Are you sure you want to delete this?')) {
			 $http.delete("/demos/api/v1/employees/?id="+id)
			.then(function(response){
				console.log(response);
			});
		}

	}
	$scope.getData();
}]);

TestApp.controller('empViewCtrl',  ['$scope', '$http', 'record', function($scope, $http, record) {
	function init(){
        $scope.employee = record[0];
    }
	init();

}]);

TestApp.controller('addEmpCtrl',  ['$scope', '$http', function($scope, $http) {
	$scope.saveEmp = function () {
            $scope.datas = {};

            if(!angular.isDefined($scope.employee_name) || $scope.employee_name === '') {
                alert('employee name is empty');
                return;
            }
            else if(!angular.isDefined($scope.employee_age) || $scope.employee_age === '') {
                alert('employee age is empty');
                return;
            }else if(!angular.isDefined($scope.employee_salary) || $scope.employee_salary === '') {
                alert('employee salary is empty');
                return;
            } else {
				$scope.datas.employee_name = $scope.employee_name;
				$scope.datas.employee_age = $scope.employee_age;
				$scope.datas.employee_salary = $scope.employee_salary;
				console.log($scope.datas);
			}
            $scope.cancelModal();
            $scope.saveRecord($scope.datas);
        };

}]);

TestApp.controller('updateEmpCtrl',  ['$scope', '$http', 'record', function($scope, $http, record) {
	$scope.employee = {};
	function init(){
		$scope.employee.employee_name = record[0].employee_name;
		$scope.employee.employee_age = parseInt(record[0].employee_age);
		$scope.employee.employee_salary = parseInt(record[0].employee_salary);

		$scope.employee.id = parseInt(record[0].id);
    }
	$scope.updateEmp = function () {
		$scope.cancelModal();
		if(!angular.isDefined($scope.employee.employee_name) || $scope.employee.employee_name === '') {
                alert('employee name is empty');
                return;
            }
            else if(!angular.isDefined($scope.employee.employee_age) || $scope.employee.employee_age === '') {
                alert('employee age is empty');
                return;
            }else if(!angular.isDefined($scope.employee.employee_salary) || $scope.employee.employee_salary === '') {
                alert('employee salary is empty');
                return;
            }
		$scope.updateRecord($scope.employee);
	}
	init();

}]);
