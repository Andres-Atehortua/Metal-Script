class Bullet {
    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeigth, velX) {
        this.ctx = ctx
        this.posX = playerPosX + 20
        this.posY = playerPosY + 23
        this.width = 35
        this.heigth = 5
        this.velX = velX
        this.image = new Image()
        this.image.src = "img/background/pencil.png"
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.heigth)
    }

    move() {
        this.posX += this.velX
    }

}