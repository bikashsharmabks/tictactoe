var app = angular.module('tictactoe', ['ui.router', 'ngAnimate']);

app.config(config)
.constant('grid_size', 3)

.controller('RegisterController', RegisterController)
.controller('LoginController', LoginController)
.controller('PlayerController', PlayerController)
.controller('LeaderboardController', LeaderboardController)

.factory('dataService', dataService)
.factory('game', tictactoeService);