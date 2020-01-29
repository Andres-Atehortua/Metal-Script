class Player {
    constructor(ctx, gameWidth, gameHeight, background, platform, enemiesShoot, enemyStatic, boss, girl) {

        this.ctx = ctx
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        // Tamaño del player
        this.width = 50
        this.height = 60
        // Vidas del jugador
        this.life = 100
        this.canJump = true
        // Imagen del player
        this.image = new Image()
        this.image.src = "img/playerOcioso/cc_player_idle.png"
        // Posicion del player
        this.posX = 10
        this.posY = this.gameHeight * 0.95 - this.height - 20
        this.posY0 = this.posY //Para usarla como suelo.

        // Velocidad del player
        this.velY = 12
        this.velX = .5
        // Propiedades de la imagen
        this.directions = {
            top: false,
            right: false,
            left: false,
            shoot: false
        }
        this.image.frames = 5
        this.image.framesIndex = 0
        // Enlazar todos los elementos necesarios para el movimiento
        this.background = background
        this.platform = platform
        this.bullets = []
        this.enemiesShoot = enemiesShoot
        this.enemyStatic = enemyStatic
        this.boss = boss
        this.girl = girl
        // Activar listeners
        this.setListeners()
    }
    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames), //Punto x donde empieza a recortar
            0, //Punto y donde empieza a recortar
            Math.floor(this.image.width / this.image.frames), //Punto x donde termina de recortar
            this.image.height, //Punto y donde termina de recortar
            this.posX,
            this.posY,
            this.width,
            this.height)

        this.animate(framesCounter)


        this.bullets.forEach(bullet => bullet.draw())
    }

    animate(framesCounter) {
        if (framesCounter % 10 == 0) {
            this.image.framesIndex++;
            this.image.framesIndex > 4.5 ? this.image.framesIndex = 0 : null
        }
    }

    move() {

        let gravity = 0.4

        if (this.posY < this.posY0) {
            this.posY += this.velY
            this.velY += gravity
        } else {
            this.canJump = true
            this.posY = this.posY0
            this.velY = 0;
        }

        if (this.directions.right) {

            this.posX += 1
            this.background.move(this.posX, this.velX, this.gameWidth)
            this.platform.forEach(elm => elm.move())
            this.enemiesShoot.forEach(enemy => enemy.move())
            this.enemyStatic.forEach(enemy => enemy.move())
            this.boss.forEach(boss => boss.move())
            this.girl.forEach(girl => girl.move())
        }

        if (this.directions.top && this.canJump) {
            this.canJump = false
            this.posY -= 5
            this.velY -= 12
        }

        this.directions.left ? this.posX -= 3 : null

        this.bullets.forEach(bullet => bullet.move())
    }

    setListeners() {
        document.onkeydown = e => {

            if (e.keyCode === 39) {
                this.directions.right = true
                this.image.src = "img/playerRunning/runningCreate.png"
                this.image.frames = 12
                this.move()
            }

            if (e.keyCode === 38) {
                this.directions.top = true
                this.image.src = "img/playerJumping/cc_player_jump-strip.png"
                this.image.frames = 13
                this.move()
            }

            if (e.keyCode === 37) {
                this.directions.left = true
                this.move()
            }

        }
        document.onkeyup = e => {

            if (e.keyCode === 39) {

                this.directions.right = false
                this.image.src = "img/playerOcioso/cc_player_idle.png"
                this.image.frames = 5
            }

            if (e.keyCode === 38) {
                this.directions.top = false
                this.image.src = "img/playerOcioso/cc_player_idle.png"
                this.image.frames = 5
            }

            if (e.keyCode === 37) {

                this.directions.left = false
                this.image.src = "img/playerOcioso/cc_player_idle.png"
                this.image.frames = 5
            }

            e.keyCode === 32 ? this.shoot() : null
        }
    }

    shoot() {
        this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.width, this.height, 9))
        this.image.src = "img/playerShooting/cc_player_pistol_shooting.png"
        this.image.frames = 11
    }

    clearBullets() {
        this.bullets = this.bullets.filter(bull => bull.posX <= this.posX + 450);
    }

    damage() {
        this.life -= 1
    }

    damageBullets() {
        this.life -= 25
        console.log("He pasado por aqui jajajajaja")
        if (this.life <= 0)
            return true
        else
            return false

    }

    die() {
        this.image.src = "img/playerDiying/cc_player_dying_strip.png"
        this.image.frames = 8
    }

}