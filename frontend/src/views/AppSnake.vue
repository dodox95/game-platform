<template>
  <div class="game-wrapper">
    <canvas ref="gameCanvas"></canvas>
  </div>
</template>

<script>
export default {
  name: "AppSnake",
  data() {
    return {
      score: 0,
      canvas: null,
      ctx: null,
      gridSize: 20,
      snake: [],
      food: null,
      direction: "right",
      gameInterval: null
    };
  },
  mounted() {
    this.canvas = this.$refs.gameCanvas;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 400;
    this.canvas.height = 400;

    this.initializeGame();
    document.addEventListener("keydown", this.handleArrowKeys);
  },
  methods: {
    initializeGame() {
      // Reset score and direction.
      this.score = 0;
      this.direction = "right";

      // Start the snake from the middle of the canvas.
      const middleX = Math.floor((this.canvas.width / this.gridSize) / 2);
      const middleY = Math.floor((this.canvas.height / this.gridSize) / 2);
      this.snake = [
        { x: middleX, y: middleY },
        { x: middleX - 1, y: middleY },
        { x: middleX - 2, y: middleY }
      ];

      this.spawnFood();

      // Setting the initial game speed.
      this.gameInterval = this.startGameWithInterval(150);
    },

    startGameWithInterval(interval) {
      if (this.gameInterval) clearInterval(this.gameInterval);
      return setInterval(this.updateGame, interval);
    },

    spawnFood() {
      let foodPosition;
      let isFoodOnSnake = true;
      while (isFoodOnSnake) {
        foodPosition = {
          x: 1 + Math.floor(Math.random() * ((this.canvas.width / this.gridSize) - 2)),
          y: 1 + Math.floor(Math.random() * ((this.canvas.height / this.gridSize) - 2))
        };
        isFoodOnSnake = this.snake.some(s => s.x === foodPosition.x && s.y === foodPosition.y);
      }
      this.food = foodPosition;
    },

    updateGame() {
      const head = { ...this.snake[0] };

      switch (this.direction) {
        case "right": head.x++; break;
        case "left": head.x--; break;
        case "up": head.y--; break;
        case "down": head.y++; break;
      }

      if (this.isCollision(head)) {
        clearInterval(this.gameInterval);
        const playAgain = confirm('Game Over! Do you want to play again?');
        if (playAgain) {
          this.initializeGame();
        } else {
          this.$router.push('/');
        }
        return;
      }

      this.snake.unshift(head);

      if (head.x === this.food.x && head.y === this.food.y) {
        this.spawnFood();
        this.score++;

        clearInterval(this.gameInterval);

        // Adjusting the interval based on the current score.
        const newInterval = 150 - (this.score * 5); // Reduce the interval by 5ms for each point.
        if (newInterval > 50) {
          this.gameInterval = this.startGameWithInterval(newInterval);
        } else {
          this.gameInterval = this.startGameWithInterval(50);
        }
      } else {
        this.snake.pop();
      }

      this.drawGame();
    },

    isCollision(pos) {
      if (pos.x < 1 || pos.x >= (this.canvas.width / this.gridSize) - 1 ||
          pos.y < 1 || pos.y >= (this.canvas.height / this.gridSize) - 1) {
        return true;
      }
      if (this.snake.some(s => s.x === pos.x && s.y === pos.y)) {
        return true;
      }
      return false;
    },

    drawGame() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Draw walls
      this.ctx.fillStyle = "#333";
      this.ctx.fillRect(0, 0, this.canvas.width, this.gridSize); // Top Wall
      this.ctx.fillRect(0, this.canvas.height - this.gridSize, this.canvas.width, this.gridSize); // Bottom Wall
      this.ctx.fillRect(0, 0, this.gridSize, this.canvas.height); // Left Wall
      this.ctx.fillRect(this.canvas.width - this.gridSize, 0, this.gridSize, this.canvas.height); // Right Wall

      // Draw snake
      for (let cell of this.snake) {
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(cell.x * this.gridSize, cell.y * this.gridSize, this.gridSize, this.gridSize);
      }

      // Draw food
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize, this.gridSize);

      // Display score at the top
      this.ctx.font = "20px Arial";
      this.ctx.fillStyle = "#fff";
      this.ctx.fillText("Score: " + this.score, 166, 17);
    },

    handleArrowKeys(e) {
      switch (e.key) {
        case "ArrowUp": if (this.direction !== 'down') this.direction = "up"; break;
        case "ArrowDown": if (this.direction !== 'up') this.direction = "down"; break;
        case "ArrowLeft": if (this.direction !== 'right') this.direction = "left"; break;
        case "ArrowRight": if (this.direction !== 'left') this.direction = "right"; break;
      }
    }
  }
};
</script>

<style scoped>
.game-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}
</style>
