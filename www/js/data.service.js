dataService.$inject = ['$http'];

function dataService($http) {
    return {
        register: register,
        login: login,
        logout: logout,
        heartbeat: heartbeat
    };

    function heartbeat() {
        return $http.get('/api/heartbeat');
    }

    function register(vm) {
        return $http.post('/api/register', vm);
    }

    function login(vm) {
        return $http.post('/api/login');
    }

    function logout(vm) {
        return $http.post('/api/logout', vm);
    }

    function getLeaderboard(vm) {
        return $http.get('/api/user/' + vm.userId + '/leaderboard');
    }
}