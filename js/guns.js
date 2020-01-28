class Bullet {
    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeigth) {
        this.ctx = ctx

        this.posX = playerPosX + playerWidth - 15
        this.posY = playerPosY + playerHeigth - 45
        this.width = 35
        this.heigth = 5
        this.velX = 9
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