// ativando js quando html carregar
document.addEventListener('DOMContentLoaded', () => {
   const dino = document.querySelector('.dino')
   const grid = document.querySelector('.grid')
   const body = document.querySelector('body')
   const alert = document.getElementById('alert')
 
   // variáveis
   let jumping = false
   let gravity = 0.9
   let gameOver = false
   //variavel que guarda a posição vertical eixo Y do dino
   let dinopy = 0
 
   // Entrada de dados
   document.addEventListener('keyup', jumpcontrol)
 
    // controlando o pulo
   function jumpcontrol(tecla){
     if(tecla.keyCode == 32 || tecla.keyCode == 38){
       if(!jumping){
         jumping = true
         jump()
       }
     }
   }
    //configurando o pulo 
   function jump(){
     let count = 0
     let timerId = setInterval(()=>{
       // configurando a caída
       if(count == 15){
         clearInterval(timerId)
         let downTimerId = setInterval(()=> {
           if(count == 0){
             clearInterval(downTimerId)
             jumping = false
           }
           dinopy -= 5
           count--
           dinopy = dinopy * gravity
           dino.style.bottom = dinopy + 'px'
         }, 15)
       }
       //Configurando subida do pulo
       dinopy +=35
       count++
       dinopy = dinopy * gravity
       //dino sobe 30 px
       dino.style.bottom = dinopy + 'px'
     },15)
   }
   function gerarObstaculo(){
     //rendomTime vai receber um tempo aleatório entre 0 4000 milissegundo 
     let randomTime = Math.random()*4000
     //obstaclepx vai controlar posição dos obstáculo horizontal eixo X
     let obstaclepx = 1000
     //fazendo referência a div para colocar os obstáculos
     const obstacle = document.createElement('div')
     /* se o jogo não acabou vou referencia a classe obstáculo q esta nas css.
      e depois adiciona um clone a grid do jog */
      if(!gameOver) obstacle.classList.add('obstacle')
      grid.appendChild(obstacle)
      obstacle.style.left = obstaclepx + 'px'

      //tratando movimento dos obstáculos
      //se a posição do obstáculo estiver entre 0 e 60 então ta na area do dinossauro 
      // e se a posição do dinossauro for menor que 60 quer dizer que não pulou
      let timerId = setInterval(()=> {
        // colisão com o dino
        //se obstaculo estiver entre 0 60 na vertical e o dino estiver abaixo de 60 px na horizontal.
        if(obstaclepx > 0 && obstaclepx < 60 && dinopy < 60) {
          clearInterval(timerId)
          alert.innerHTML = 'Fim de jogo'
          gameOver = true
          // removendo tudo da tela até o reload da página
          body.removeChild(body.firstChild)
          while(grid.firstChild) {
            grid.removeChild(grid.lastChild)
          }
        }
        obstaclepx -= 3    // de 10 em 10 milissegundo estou tirando 3 pixels da posição obstáculos
        obstacle.style.left = obstaclepx + 'px'
      }, 10)
      // chamando a própria função infinitamente e criando cactus aleatórios
      if(!gameOver) setTimeout(gerarObstaculo, randomTime)
   }
   gerarObstaculo()
})
