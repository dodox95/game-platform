<template>
    <div class="game-wrapper">
      <div class="board">
        <div 
          v-for="(cell, index) in board" 
          :key="index" 
          :class="['cell', cell]"
          @click="makeMove(index)">
        </div>
      </div>
      <div v-if="winner" :class="{ 'win': winner === 'player', 'lose': winner === 'computer' }">
        {{ winnerMessage }}
      </div>
      <div v-if="winner">
        <button @click="resetGame">Play Again?</button>
        <button @click="goHome">Go Home</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        board: Array(9).fill(null), 
        currentPlayer: 'player', 
        winner: null
      };
    },
    computed: {
      winnerMessage() {
        if (this.winner === 'player') return 'You Win!';
        if (this.winner === 'computer') return 'You Lost!';
        return '';
      }
    },
    created() {
      if (Math.random() < 0.5) { 
        this.currentPlayer = 'computer';
        this.computerMove();
      }
    },
    methods: {
      makeMove(index) {
        if (this.board[index] || this.winner) return;
        
        this.board[index] = this.currentPlayer === 'player' ? 'X' : 'O';
        
        if (this.checkWinner()) {
          this.winner = this.currentPlayer;
          return;
        }
        
        this.switchPlayer();
        if (this.currentPlayer === 'computer') {
          this.computerMove();
        }
      },
      checkWinner() {
        const winningCombos = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8],
          [0, 3, 6], [1, 4, 7], [2, 5, 8],
          [0, 4, 8], [2, 4, 6]
        ];
        for (const combo of winningCombos) {
          if (this.board[combo[0]] && this.board[combo[0]] === this.board[combo[1]] && this.board[combo[0]] === this.board[combo[2]]) {
            return true;
          }
        }
        return false;
      },
      switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'player' ? 'computer' : 'player';
      },
      computerMove() {
        // Here, for simplicity, computer picks a random empty cell
        const emptyCells = this.board.reduce((acc, val, idx) => val ? acc : [...acc, idx], []);
        const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        this.makeMove(move);
      },
      resetGame() {
        this.board = Array(9).fill(null);
        this.winner = null;
        if (Math.random() < 0.5) {
          this.currentPlayer = 'computer';
          this.computerMove();
        } else {
          this.currentPlayer = 'player';
        }
      },
      goHome() {
        this.$router.push('/');
      }
    }
  };
  </script>
  
  <style scoped>
  /* For simplicity, only the basics are styled here. You can extend these styles to make it more modern. */
  .game-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: Arial, sans-serif;
  }
  
  .board {
    display: grid;
    grid-template-columns: repeat(3, 60px);
    gap: 5px;
  }
  
  .cell {
    width: 60px;
    height: 60px;
    border: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    cursor: pointer;
  }
  
  .cell.X::before {
    content: "X";
  }
  
  .cell.O::before {
    content: "O";
  }
  
  .win {
    color: green;
  }
  
  .lose {
    color: red;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  