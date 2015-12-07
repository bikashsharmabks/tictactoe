'use strict';

function tictactoeService(){
  return new Game();
}

var Board = function(grid){
  grid = grid || 3;
  this.grid = grid;
  this.X = 1;
  this.O = -1;
  this.board = [];
  this.winning_combos = this.calculateWinningCombos();
  this.winning_combo = null;
}

Board.prototype = {
  calculateWinningCombos:function(){
    var combos = [];
    for (var i = 0, c = [], d = []; i < this.grid; i++){
      for (var j = 0, a = [], b = []; j < this.grid; j++){
        a.push(i * this.grid + j);
        b.push(j * this.grid + i);
      }
      combos.push(a, b);
      c.push(i * this.grid + i);
      d.push((this.grid - i - 1) * this.grid + i);
    }
    combos.push(c, d);
    return combos;
  },

  isFull:function(){
    for(var i = 0; i < this.grid * this.grid; i++) {
          if (!this.board[i]) {
              return false;
          }
        }
        return true;
  },

  checkWinner:function(){
    var j, x, o, k;
    for (var combo in this.winning_combos){
      j = x = o = this.grid;
      while(j--){
        k = this.winning_combos[combo][j];
        if(this.board[k] > 0) x--;
        if(this.board[k] < 0) o--;
      }
      if (!x) {
        this.winning_combo = this.winning_combos[combo];
        return this.X; // x won
      }
      if (!o) {
        this.winning_combo = this.winning_combos[combo];
        return this.O; // o won
      }
    }
  },

  move:function(index, player){
    if(this.canMove(index)){
      this.board[index] = player.symbol === 'x' ? this.X : this.O;
      if (player.symbol === 'x') {
         document.getElementById('x-snd').play();
       } else {
         document.getElementById('o-snd').play();
       }
    }
  },

  canMove:function(index){
    return typeof this.board[index] === "undefined";
  },

  compute_next_move:function(){
    return this.negamaxSearch(0, 1, -100, 100);
  },

  renderSquare:function(index){
    var square_symbol = "";
    if(this.board[index]){
      square_symbol = this.board[index] === this.X ? "x" : "o";
    }
    return square_symbol;
  },

  // negamax search with alpha-beta pruning
  // http://en.wikipedia.org/wiki/Negamax
  // http://en.wikipedia.org/wiki/Alpha-beta_pruning
  negamaxSearch: function(depth, player, alpha, beta){
    var size = 100;
    var intelligence = 6;
    var undef;
    var i = this.grid * this.grid, min = -size, max, value, next;
    if (value = this.checkWinner(depth)) // either player won
      return value * player;
    if (intelligence > depth){ // recursion cutoff
      while(i--){
        if (!this.board[i]){
          this.board[i] = player;
          value = -this.negamaxSearch(depth + 1, -player, -beta, -alpha);
          this.board[i] = undef;
          if (max === undef || value > max) max = value;
          if (value > alpha) alpha = value;
          if (alpha >= beta) return alpha; // prune branch
          if (max > min){ min = max; next = i; } // best odds for next move
        }
      }   
    } 
    return depth ? max || 0 : next; // 0 is tie game
  }
}

var Game = function(params){
  // defaults
  this.computer_first = false;
  this.grid = 3;
  this.board = null;

  // players
  this.manual_player = new Player('o', false);
  this.computer_player = new Player('x', true);
  this.current_player = this.manual_player;

  // results
  this.winner = null;
  this.tie = false;
  this.winning_combo = [];
}

Game.prototype = {
  start: function(grid, computer_first){
    this.grid = grid;
    this.computer_first = computer_first;
    this.board = new Board(this.grid);
    this.current_player = this.manual_player;
    this.winner = null;
    this.tie = false;
    this.winning_combo = [];

    if(this.computer_first){
      this.current_player = this.computer_player;
      this.computer_move();
    }
  },
  move: function(index){
    if(this.board.canMove(index)){
      this.board.move(index, this.current_player);
      this.current_player = this.current_player.is_computer ? this.manual_player : this.computer_player;
      this.checkWinner();
      if(!this.winner){
        if(this.current_player.is_computer){
          this.computer_move();
        }
        this.checkWinner(); 
        if((!this.winner)&&(this.board.isFull())){
          this.tie = true;
        } 
      } 
    }
  },
  checkWinner:function(){
    var winner = this.board.checkWinner();
    if(typeof winner !== "undefined"){
      this.winner = winner;
    }
  },
  computer_move:function(){
    var next_move = this.board.compute_next_move();
    if(typeof next_move === "undefined") {
      this.tie = true;
    } else {
      this.board.move(next_move, this.current_player);
      this.current_player = this.current_player.is_computer ? this.manual_player : this.computer_player;
    }
  }
};

var Player = function(symbol, is_computer){
  symbol = symbol || "x";
  is_computer = is_computer || false;

  this.symbol = symbol;
  this.is_computer = is_computer;
}