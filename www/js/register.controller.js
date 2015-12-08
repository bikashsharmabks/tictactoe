RegisterController.$inject = ['dataService', '$state', '$timeout'];

function RegisterController(dataService, $state, $timeout) {
    var vm = this;
    vm.userName = '';
    vm.password = '';
    vm.confirmPassword = '';
    vm.register = register;

    dataService.heartbeat();

    function register() {

        if (vm.userName.length === 0) {
            vm.message = 'User name cannot be blank';
            return;
        };

        if (vm.password.length <= 8) {
            vm.message = 'password cannot be less than 8 character';
            return;
        };

        if (vm.password != vm.confirmPassword) {
            vm.message = 'password doesnt match';
            return;
        };

        vm.message = '';
        dataService.register(vm).then(function(data) {

            vm.message = vm.userName + ' you registered';
            $timeout(function() {
                $state.go('login');
            }, 1000);

        }).catch(function(error) {
            vm.message = error;
        });
    }
}