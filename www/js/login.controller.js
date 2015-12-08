LoginController.$inject = ['dataService', '$state'];

function LoginController(dataService, $state) {
    var vm = this;
    vm.userName = '';
    vm.password = '';
    vm.start = start;

    dataService.heartbeat();

    function start() {

        if (vm.userName.length === 0) {
            vm.message = 'User name cannot be blank';
            return;
        };

        if (vm.password.length === 0) {
            vm.message = 'password cannot be blank';
            return;
        };

        vm.message = '';

        dataService.login(vm).then(function(data) {
            $state.go('players');
        }).catch(function(error) {
            vm.message = error;
        });
    }
}