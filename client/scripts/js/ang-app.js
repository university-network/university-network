(function () {
    var app = angular.module('university-network', []);
    app.controller("StudentController", function () {
        this.products = student;
    });
    var student = [
        {
            name: 'degget',
            email: 'degget@animal.com',
            group_id: 1,
            was_absent: true
        },
        {
            name: 'norbert',
            email: 'norbert@animal.com',
            group_id: 1,
            was_absent: false
        }
    ]
})();

