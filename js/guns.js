class Bullet {
    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeigth, velX, src = "img/background/pencil.png", width = 35, heigth = 5) {
        this.ctx = ctx
        this.posX = playerPosX + 20
        this.posY = playerPosY + 23
        this.width = width
        this.heigth = heigth
        this.velX = velX
        this.image = new Image()
        this.image.src = src
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.heigth)
    }

    move() {
        this.posX += this.velX
    }

}