class Platform {
    constructor(ctx, posX, posY, width, height) {
        this.ctx = ctx
        this.width = width
        this.height = height
        this.posX = posX
        this.posY = posY

        this.image = new Image()
        this.image.src = "img/background/platform.jpg"

    }
    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }
    move() {
        this.posX -= 3.5
    }
}