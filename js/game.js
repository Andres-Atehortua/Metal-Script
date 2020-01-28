const Game = {
    name: 'Game App',
    description: 'Game of platforms :)',
    author: 'Andrés',
    license: undefined,
    version: '1.0',
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    enemiesArray: [],
    framesCounter: 0,
    score: undefined,

    init() {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = window.innerWidth
        this.height = window.innerHeight * 0.95;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.start()
    },
    start() {
        this.reset()
        this.interval = setInterval(() => {
            this.framesCounter++
            this.framesCounter > 800 ? this.framesCounter = 0 : null
            this.clear()
            this.drawAll()
            this.moveAll()
            this.player.clearBullets()
            this.isCollision()
            this.generateEnemies()
            this.clearEnemies()
            if (this.collisionEnemies()) {
                this.player.life -= 1
                console.log(this.player.life)
                if (this.player.life <= 0)
                    console.log("PONER ALGO AQUI PARA PERDER POR COLISION")
            }


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
            new Platform(this.ctx, 3400, 160, 100, 10)
        ]
        this.enemiesShoot = new EnemyShoot(this.ctx, 100, 430)
        this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.background, this.platformArray, this.enemiesShoot)
    },
    drawAll() {
        this.background.draw()
        this.player.draw(this.framesCounter)
        this.platformArray.forEach(element => {
            element.draw()
        })
        this.enemiesArray.forEach(enemy => enemy.draw(this.framesCounter))
        this.enemiesShoot.draw(this.framesCounter)
    },
    moveAll() {
        this.player.move()
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
    collisionEnemies() {
        return this.enemiesArray.some(enemy => {
            return (
                this.player.posX + this.player.width >= enemy.posX + 35 &&
                this.player.posY + this.player.height >= enemy.posY &&
                this.player.posX <= enemy.posX + enemy.width

            )
        })
    },
    generateEnemies() {
        this.framesCounter % 300 === 0 ? this.enemiesArray.push(new Enemy(this.ctx, this.width, this.height - 125)) : null
    },
    clearEnemies() {
        this.enemiesArray = this.enemiesArray.filter(enemy => enemy.posX >= -15);
    }
}