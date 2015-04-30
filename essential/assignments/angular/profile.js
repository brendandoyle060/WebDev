var app = angular.module("NG", []);

app.controller("NGController", function ($scope, $http) {
    $scope.edited = { };

    $scope.addCourse = { };

    $http.get('/api/course')
        .success(function (response) {
            $scope.courseList = response;
        });

    $scope.addDialog = function () {
        $("#createCourse").modal("show");
    };

    $scope.addCourse = function (addCourse) {
        $http.post('/api/course', addCourse)
            .success(function (response) {
                $scope.courseList = response;
            });
        $scope.addCourse = {  };
    };

    $scope.confirmRemove = function (id) {
        angular.element('#modalFade').modal('show')
            .one('click', '#confirmremove', function (e2) {
                $scope.removeCourse(id);
            });
    };

    $scope.removeCourse = function (id) {
        $http.delete('/api/course/' + id)
            .success(function (response) {
                $scope.courseList = response;
            });
    };

    $scope.edit = function (id) {
        var c = $scope.listOfCourses[id];
        angular.copy(c, $scope.edited);
        angular.element('#editCourse').modal('show')
            .one('click', '#confirmed', function (e2) {
                $http.put('/api/course/' + id, $scope.edited)
                    .success(function (response) {
                        $scope.listOfCourses = response;
                    });
            });
    }
});
