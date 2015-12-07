LeaderboardController.$inject = ['dataService', '$state'];

function LeaderboardController(dataService, $state) {
    var vm = this;
    dataService.heartbeat();
}