function config($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");

	$stateProvider.
	//index
	state('index', {
		url: '/',
		templateUrl: 'partials/index.html'
	}).
	//register
	state('register', {
		url: '/register',
		templateUrl: 'partials/register.html',
		controller: 'RegisterController',
		controllerAs: 'vm'
	}).
	//login
	state('login', {
		url: '/login',
		templateUrl: 'partials/login.html',
		controller: 'LoginController',
		controllerAs: 'vm'
	}).
	//players
	state('players', {
		url: '/players',
		templateUrl: 'partials/players.html',
		controller: 'PlayerController',
		controllerAs: 'vm'
	}).
	//game
	state('game', {
		url: '/game',
		templateUrl: 'partials/game.html',
		controller: 'GameController'
	}).
	//game
	state('leaderboard', {
		url: '/leaderboard',
		templateUrl: 'partials/leaderboard.html',
		controller: 'LeaderboardController',
		controllerAs: 'vm'
	});
}