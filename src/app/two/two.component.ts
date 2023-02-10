import { Component } from '@angular/core';

@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.css']
})
export class TwoComponent {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  
  currentTurn = 'X';
  xScore = 0;
  oScore = 0;
  
  playTurn(row: number, col: number){
    if (this.board[row][col] === ''){
      this.board[row][col] = this.currentTurn;
      if (this.checkWin(this.currentTurn)){
        if (this.currentTurn === 'X'){
          this.xScore++;
        } else {
          this.oScore++;
        }
        if (confirm(this.currentTurn + ' kazandı! Bir daha oynamak ister misin?')){
          this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
          ];
        }
        } else if (this.checkDraw()){
          if (confirm('Beraberlik! Bir daha oynamak ister misin?')) {
            this.board = [
              ['', '', ''],
              ['', '', ''],
              ['', '', '']
            ];
          }
        } else {
          this.currentTurn = this.currentTurn === 'X' ? 'O' : 'X';
        }
      }
  }
  
  checkWin(player: string){
    // Check rows
    for (let i = 0; i < 3; i++){
      if (this.board[i][0] === player && this.board[i][1] === player && this.board[i][2] === player){
        return true;
      }
    }
  
    // Check columns
    for (let i = 0; i < 3; i++){
      if (this.board[0][i] === player && this.board[1][i] === player && this.board[2][i] === player){
        return true;
      }
    }
  
    // Check diagonals
    if (this.board[0][0] === player && this.board[1][1] === player && this.board[2][2] === player){
      return true;
    }
    if (this.board[0][2] === player && this.board[1][1] === player && this.board[2][0] === player){
      return true;
    }
      return false;
  }
  
  checkDraw() {
    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        if (this.board[i][j] === ''){
          return false;
        }
      }
    }
    return true;
  }
}
   


