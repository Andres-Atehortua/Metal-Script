class Background {
    constructor(ctx, w, h) {
        this.ctx = ctx
        this.width = w
        this.height = h
        this.image = new Image()
        this.image.src = "img/background/backgroundmodified.png"
        this.posX = 0
        this.posY = 0

        this.velX = 2
    }

    draw() {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }

    move(playerPosX, playerVelX, gameWidth) {
        console.log(playerPosX, playerVelX, gameWidth)
        playerPosX >= gameWidth / 2 - 490 ? this.posX -= (playerVelX * 5) : 0;
        console.log("Move")

    }
}