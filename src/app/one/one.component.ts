import { Component } from '@angular/core';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent {
  turn = 'X';
  computerTurn(): boolean{
    return this.turn === 'O';
  }
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  
  xScore = 0;
  oScore = 0;
  currentTurn = 'X';
  

  playTurn(row: number, col: number){
    if (this.turn === 'X') {
      if (this.board[row][col] === ''){
        this.board[row][col] = 'X';
        if (this.checkWin('X')){
          alert('X kazandı! Bir daha oynamak ister misin?');
          this.resetBoard();
        } else if (this.isDraw()){ 
          alert('Beraberlik! Bir daha oynamak ister misin?');
          this.resetBoard();
          } else{
            this.turn = 'O';
            this.computerPlay();
          }
      } else{
          throw new Error('Hata');
        }
    }
  }


  checkWin(player: string){
    // Check rows
    for (let i = 0; i < 3; i++){
      if (this.board[i].every(cell => cell === player)){
        if (player === 'X'){
          this.xScore++;
        } else{
          this.oScore++;
        }
        return true;
      }
    }
    // Check columns
    for (let i = 0; i < 3; i++){
      let col = [this.board[0][i], this.board[1][i], this.board[2][i]];
      if (col.every(cell => cell === player)){
        if (player === 'X'){
          this.xScore++;
        } else{
          this.oScore++;
        }
        return true;
      }
    }
    // Check diagonals
      let diagonal1 = [this.board[0][0], this.board[1][1], this.board[2][2]];
      let diagonal2 = [this.board[0][2], this.board[1][1], this.board[2][0]];
      if (diagonal1.every(cell => cell === player) || diagonal2.every(cell => cell === player)){
        if (player === 'X'){
          this.xScore++;
        } else{
          this.oScore++;
        }
        return true;
      }
      return false;
  }
  

  isDraw(){
    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        if (this.board[i][j] === ''){
          return false;
        }
      }
    }
    return true;
  }
  

  resetBoard(){
      this.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
      this.turn = this.checkWin('X') ? 'X' : (this.checkWin('O') ? 'O' : 'X');
    }

    computerPlay() {
      let bestScore = -Infinity;
      let move: [number, number] = [-1, -1];
    
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (this.board[row][col] === '') {
            this.board[row][col] = 'O';
            let score = this.minimax(0, false);
            this.board[row][col] = '';
    
            if (score > bestScore) {
              bestScore = score;
              move = [row, col];
            }
          }
        }
      }
    
      this.board[move[0]][move[1]] = 'O';
    
      if (this.checkWin('O')) {
        alert('O kazandı! Bir daha oynamak ister misin?');
        this.resetBoard();
      } else if (this.isDraw()) {
        alert('Beraberlik! Bir daha oynamak ister misin?');
        this.resetBoard();
      } else {
        this.turn = 'X';
      }
    }
    
    minimax(depth: number, isMaximizing: boolean): number {
      if (this.checkWin('X')) {
        return -10 + depth;
      } else if (this.checkWin('O')) {
        return 10 - depth;
      } else if (this.isDraw()) {
        return 0;
      }
    
      let bestScore = isMaximizing ? -Infinity : Infinity;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (this.board[row][col] === '') {
            this.board[row][col] = isMaximizing ? 'O' : 'X';
            let score = this.minimax(depth + 1, !isMaximizing);
            this.board[row][col] = '';
    
            if (isMaximizing) {
              bestScore = Math.max(bestScore, score);
            } else {
              bestScore = Math.min(bestScore, score);
            }
          }
        }
      }
    
      return bestScore;
    }
    



}




