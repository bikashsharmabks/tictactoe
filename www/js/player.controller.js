PlayerController.$inject = ['dataService', '$state'];

function PlayerController(dataService, $state) {
    var vm = this;
    vm.logout = logout;

    dataService.heartbeat();

    function logout() {
        dataService.logout(vm)
        .then(function(data) {
            $state.go('login');
        })
        .catch(function(error) {

        });
    }
}