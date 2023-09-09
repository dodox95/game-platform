<template>
    <div class="main-wrapper">
      <AppNavbar />
      <div class="content">
        <div class="game-card" v-for="game in games" :key="game.slug" @click="goToGame(game.slug)">
          <img :src="game.image" :alt="game.name" class="game-image" />
          <h3>{{ game.name }}</h3>
          <p>{{ game.description }}</p>
        </div>
      </div>
      <AppFooter />
    </div>
  </template>
  
  <script>
  import AppNavbar from '../components/AppNavbar.vue';
  import AppFooter from '../components/AppFooter.vue';
  
  export default {
    name: 'MainPage',
    components: {
      AppNavbar,
      AppFooter
    },
    
    data() {
      return {
        games: [
          {
            name: "PacMan",
            slug: "pacman",
            description: "A classic arcade game where you avoid ghosts and eat dots.",
            image: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          },
          {
            name: "Pong",
            slug: "pong",
            description: "The pioneer of arcade games where two players hit a ball back and forth.",
            image: "https://images.unsplash.com/photo-1570572137089-1655117ad216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          },
          {
            name: "Snake",
            slug: "snake",
            description: "Navigate a snake to eat apples and grow, but don't hit the walls or yourself.",
            image: "https://images.unsplash.com/photo-1570741066052-817c6de995c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1886&q=80"
          },
          {
            name: "Tetris",
            slug: "tetris",
            description: "Rotate and align falling blocks to clear rows and earn points.",
            image: "https://images.unsplash.com/photo-1634295912158-9c847b6b3a40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
          },
          {
            name: "Tic Tac Toe",
            slug: "tic-tac-toe",
            description: "A simple strategy game. Get three in a row to win.",
            image: "https://plus.unsplash.com/premium_photo-1673735396428-d51dc2a7a62d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          }
        ]
      };
    },
    methods: {
  goToGame(slug) {
    this.$router.push('/' + slug);
  }
}
  };
  </script>
  
  <style scoped>
  .main-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .content {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    padding: 16px;
  }
  
  .game-card {
    cursor: pointer;
    border: 1px solid #ddd;
    padding: 16px;
    width: 250px;
    height: 420px;
    text-align: center;
    border-radius: 8px;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .game-card:hover {
    transform: translateY(-10px);
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  }
  
  .game-card .game-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  </style>
  