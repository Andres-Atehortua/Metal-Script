const Game = {
    name: 'Game App',
    description: 'Game of platforms :)',
    author: 'Andrés Felipe López Atehortua',
    license: undefined,
    version: '1.0',
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    soundTrack: new Audio("music/longTallSally.wav"),
    enemiesArray: [],
    enemyStaticArray: [],
    enemiesShoot: [],
    boss: [],
    girl: [],
    bullet: [],
    framesCounter: 0,
    score: 0,
    bossCanShoot: false,
    interval: undefined,

    init() {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = window.innerWidth
        this.height = window.innerHeight * 0.95;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        Scoreboard.init(this.ctx)
        this.start()
        this.soundTrack.volume = 0.4
        this.soundTrack.play()
    },

    start() {
        this.reset()
        this.interval = setInterval(() => {
            this.framesCounter++
            this.framesCounter > 800 ? this.framesCounter = 0 : null
            this.clear()
            this.framesCounter % 150 === 0 ? this.enemiesShoot.forEach(enemy => this.bullet.push(new Bullet(this.ctx, enemy.posX, enemy.posY, this.width, this.height, -9, "img/background/balaEnemigos.png", 40, 20))) : null
            if (this.player.posX >= 600) {
                this.bossCanShoot = true
            }
            if (this.bossCanShoot) {
                this.framesCounter % 100 === 0 ? this.boss.forEach(boss => this.bullet.push(new Bullet(this.ctx, boss.posX, boss.posY, this.width, this.height, -5, "img/background/balaBoss.png", 45, 15))) : null
            }
            this.drawAll()
            this.moveAll()
            this.player.clearBullets()
            this.isCollision()
            this.collisionEnemiesBullets(this.enemiesArray)
            this.collisionEnemiesBullets(this.enemyStaticArray)
            this.collisionEnemiesBullets(this.enemiesShoot)
            this.collisionEnemiesBullets(this.boss)
            this.generateEnemies()
            this.clearEnemies()
            if (this.collisionEnemies(this.enemiesArray) || this.collisionEnemies(this.enemyStaticArray) || this.collisionEnemies(this.enemiesShoot) || this.collisionEnemies(this.boss)) {
                this.player.damage()
                if (this.player.life <= 0) {
                    this.player.die()
                    this.lose()
                }
            }
            this.drawScore()
            if (this.collisionGirl()) {
                this.win()
            }
            this.clearBullets()
            this.collisionPlayerBullets()
        }, 1000 / this.fps)
    },
    reset() {
        this.background = new Background(this.ctx, 2500, this.height)
        this.platformArray = [
            new Platform(this.ctx, 145, 420, 80, 10),
            new Platform(this.ctx, 500, 400, 100, 10),
            new Platform(this.ctx, 900, 370, 100, 10),
            new Platform(this.ctx, 1300, 370, 100, 10),
            new Platform(this.ctx, 1500, 300, 100, 10),
            new Platform(this.ctx, 1700, 260, 100, 10),
            new Platform(this.ctx, 1920, 200, 100, 10),
            new Platform(this.ctx, 2140, 260, 100, 10),
            new Platform(this.ctx, 2360, 300, 100, 10),
            new Platform(this.ctx, 2580, 370, 100, 10),
            new Platform(this.ctx, 3000, 360, 100, 10),
            new Platform(this.ctx, 3000, 260, 100, 10),
            new Platform(this.ctx, 3000, 160, 100, 10),
            new Platform(this.ctx, 3400, 360, 100, 10),
            new Platform(this.ctx, 3400, 260, 100, 10),
            new Platform(this.ctx, 3400, 160, 100, 10),
            new Platform(this.ctx, 3800, 420, 80, 10)
        ]
        this.enemyStaticArray = [
            new EnemyStatic(this.ctx, 520, 335, "img/enemyleft/staticright.png"),
            new EnemyStatic(this.ctx, 920, 305, "img/enemyleft/staticenemy.png"),
            new EnemyStatic(this.ctx, 1520, 235, "img/enemyleft/staticenemy.png"),
            new EnemyStatic(this.ctx, 1720, 195, "img/enemyleft/staticenemy.png"),
            new EnemyStatic(this.ctx, 2160, 195, "img/enemyleft/staticright.png"),
            new EnemyStatic(this.ctx, 2380, 235, "img/enemyleft/staticright.png")
        ]
        this.enemiesShoot = [
            new EnemyShoot(this.ctx, 1285, 285),
            new EnemyShoot(this.ctx, 1880, 115),
            new EnemyShoot(this.ctx, 2990, 275),
            new EnemyShoot(this.ctx, 2990, 75),
            new EnemyShoot(this.ctx, 3390, 275),
            new EnemyShoot(this.ctx, 3390, 75)
        ]
        this.girl = [new Girl(this.ctx, 4200, 480)]
        this.boss = [new Boss(this.ctx, 100, 70)]
        this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.background, this.platformArray, this.enemiesShoot, this.enemyStaticArray, this.boss, this.girl)
    },
    drawAll() {
        this.background.draw()
        this.player.draw(this.framesCounter)
        this.platformArray.forEach(element => element.draw())
        this.enemiesArray.forEach(enemy => enemy.draw(this.framesCounter))
        this.enemyStaticArray.forEach(eachEnemy => eachEnemy.draw(this.framesCounter))
        this.enemiesShoot.forEach(enemy => enemy.draw(this.framesCounter))
        this.boss.forEach(boss => boss.draw(this.framesCounter, 60, 70))
        this.girl.forEach(girl => girl.draw())
        this.bullet.forEach(bullet => bullet.draw())
    },

    moveAll() {
        this.player.move()
        this.bullet.forEach(bullet => bullet.move())
        this.enemiesArray.forEach(enemy => enemy.move())
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    isCollision() {
        let collision = this.platformArray.find(obs => {

            return (
                this.player.posX + this.player.width >= obs.posX + 35 &&
                this.player.posY + this.player.height >= obs.posY - 20 &&
                this.player.posX + 5 <= obs.posX + obs.width &&
                this.player.posY + this.player.height <= obs.posY + obs.height &&
                this.player.velY > 0
            )
        })

        if (collision) {
            this.player.obj = collision
            this.player.posY0 = collision.posY - this.player.height
            this.player.posY = this.player.posY0
        } else {
            this.player.posY0 = this.height * 0.95 - this.player.height - 20
        }
    },

    collisionEnemies(arrayOfEnemies) {
        return arrayOfEnemies.some(enemy => {
            return (
                this.player.posX + this.player.width >= enemy.posX + 35 &&
                this.player.posY + this.player.height >= enemy.posY &&
                this.player.posY <= enemy.posY + enemy.height &&
                this.player.posX <= enemy.posX + enemy.width
            )
        })
    },

    collisionGirl() {
        return this.girl.some(girl => {
            return (
                this.player.posX + this.player.width >= girl.posX + 35 &&
                this.player.posY + this.player.height >= girl.posY + 35 &&
                this.player.posY <= girl.posY + girl.height &&
                this.player.posX <= girl.posX + girl.width
            )
        })
    },

    collisionEnemiesBullets(enemiesInArrays) {

        enemiesInArrays.forEach((enemy, idE) => {
            this.player.bullets.forEach((bullet, idB) => {
                if (enemy.posX + enemy.width >= bullet.posX &&
                    enemy.posY + enemy.height - 80 <= bullet.posY &&
                    enemy.posY + enemy.height >= bullet.posY &&
                    enemy.posX <= bullet.posX) {
                    if (enemy.damage()) {
                        enemiesInArrays.splice(idE, 1)
                        this.lastScream = document.createElement("audio")
                        this.lastScream.src = "music/gritoMuerte.wav"
                        this.lastScream.volume = 0.8
                        this.lastScream.play()
                        this.score++
                    }
                    this.player.bullets.splice(idB, 1)
                }
            })
        })
    },

    collisionPlayerBullets() {
        this.bullet.forEach((bullet, idx) => {
            if (this.player.posX + this.player.width - 25 >= bullet.posX &&
                this.player.posY + this.player.height - 75 <= bullet.posY &&
                this.player.posY + this.player.height >= bullet.posY &&
                this.player.posX <= bullet.posX) {
                if (this.player.damageBullets()) {
                    this.player.die()
                    this.lose()
                }
                this.bullet.splice(idx, 1)
            }
        })

    },

    generateEnemies() {
        this.framesCounter % 300 === 0 ? this.enemiesArray.push(new Enemy(this.ctx, this.width, this.height - 135)) : null
    },

    clearEnemies() {
        this.enemiesArray = this.enemiesArray.filter(enemy => enemy.posX >= -15);
    },

    drawScore() {
        Scoreboard.update(this.score, this.player.life)
    },

    clearBullets() {
        this.bullet = this.bullet.filter(bull => bull.posX >= 10);
    },
    win() {
        this.restartInterval()
        this.stopSoundTrack()
        this.ctx.font = "150px kaushan script"
        this.ctx.fillStyle = "#FFD700"
        this.ctx.fillText(("¡HAS RESCATADO"), 70, 240)
        this.ctx.fillText(("A LA PRINCESA!"), 100, 390)
        this.ctx.font = "45px kaushan script"
        this.ctx.fillStyle = "red"
        this.ctx.fillText((`Tu puntuación ha sido de ${this.score} asesinatos a sangre fria :(`), 180, 450)
        this.ctx.fillStyle = "#FFD700"
        this.ctx.font = "30px kaushan script"
        this.ctx.fillText(("El juego se reiniciará en 3 segundos..."), 10, 590)
        this.winSound = document.createElement("audio")
        this.winSound.src = "music/winPrinces.wav"
        this.winSound.volume = 1
        this.winSound.play()
        setTimeout(this.restartGame, 8000)
    },
    lose() {
        this.stopSoundTrack()
        this.image = new Image()
        this.image.src = "img/playerLosing/You-Died.png"
        this.image.onload = () => {
            this.ctx.drawImage(this.image, 0, 0, this.width, this.height)
            this.drawText()
            setTimeout(this.restartGame, 5000)
            this.restartInterval()
        }
        this.wastedSound = document.createElement("audio")
        this.wastedSound.src = "music/wasted.wav"
        this.wastedSound.volume = 1
        this.wastedSound.play()
    },

    stopSoundTrack() {
        this.soundTrack.pause()
    },

    restartGame() {
        window.location.reload(true)
    },

    restartInterval() {
        clearInterval(this.interval)
    },
    drawText() {
        this.ctx.font = "45px kaushan script"
        this.fillStyle = "white"
        this.ctx.fillText(`Eres más malo que el hambre, pero al menos has matado a ${this.score} enemigos.`, 10, 150)
        this.ctx.fillText(("El juego se reiniciará en 3 segundos..."), 10, 580)
    }
}