class Background {
    constructor(ctx, w, h) {
        this.ctx = ctx
        this.width = w
        this.height = h
        this.image = new Image()
        this.image.src = "img/background/background1.png"
        this.image2 = new Image()
        this.image2.src = "img/background/background2.png"
        this.posX = 0
        this.posY = 0

        this.velX = 3.5
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        this.ctx.drawImage(this.image2, this.posX + this.width, this.posY, this.width, this.height)
    }

    move(playerPosX, gameWidth) {
        playerPosX >= gameWidth / 2 - 500 ? this.posX -= this.velX : 0;
    }
}