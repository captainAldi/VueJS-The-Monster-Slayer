new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true
      this.playerHealth = 100
      this.monsterHealth = 100
      this.turns=[]
    },
    attack: function () {
      var damage = this.calculateDamage(3, 10)
      this.monsterHealth -= damage
      this.turns.unshift({
        isPlayer: true,
        text: 'Player menyerang dengan ' + damage
      })
      if(this.checkWin()) {
        return
      }

      this.monsterAttack()
    },
    monsterAttack: function() {
      var damage = this.calculateDamage(5, 12)
      this.playerHealth -= damage
      this.checkWin()
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster menyerang dengan ' + damage
      })
    },
    specialAttack: function () {
      var damage = this.calculateDamage(12, 10)
      this.monsterHealth -= damage
      this.turns.unshift({
        isPlayer: true,
        text: 'Player menyerang dengan Speacial Attack' + damage
      })
      if(this.checkWin()) {
        return
      }

      this.monsterAttack()
    },
    heal: function () {
      if(this.playerHealth <= 90){
        this.playerHealth += 10
      } else {
        this.playerHealth = 100
      }
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heal dengan 10'
      })
      this.monsterAttack()
    },
    giveUp: function () {
      this.gameIsRunning = false
    },
    calculateDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min)
    },
    checkWin: function () {
        if(this.monsterHealth <= 0){
          if(confirm('Anda Menang ! Pertandingan Baru ?')){
            this.startGame()
          } else {
            this.gameIsRunning = false;
          }
          return true
        } else if (this.playerHealth <= 0){
          if(confirm('Anda Kalah ! Game Baru ?')){
            this.startGame()
          } else {
            this.gameIsRunning = false
          }
          return true
        }
        return false
      }
    }
})