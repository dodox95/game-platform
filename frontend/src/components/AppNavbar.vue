<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Home</a>
      <button
        class="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-for="game in games" :key="game.slug">
            <a class="nav-link" :href="'#' + game.slug">{{ game.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  </template>
  
  <script>
  export default {
    name: "AppNavbar",
    data() {
      return {
        games: [
        { name: "PacMan", slug: "pacman" },
        { name: "Pong", slug: "pong" },
        { name: "Snake", slug: "snake" },
        { name: "Tetris", slug: "tetris" },
        { name: "Tic Tac Toe", slug: "tic-tac-toe" }
      ]
      };
    }
  };
  </script>
  