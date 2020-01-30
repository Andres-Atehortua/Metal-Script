class Girl {

    constructor(ctx, posX, posY) {
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        this.width = 60
        this.height = 75
        this.image = new Image()
        this.image.src = "img/girl.png"
        this.image.frames = 4
        this.image.framesIndex = 0
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.posX,
            this.posY,
            this.width,
            this.height
        );
        this.animate(framesCounter)
    }

    animate(framesCounter) {
        if (framesCounter % 10 === 0) {
            this.image.framesIndex++;
            this.image.framesIndex > 5 ? this.image.framesIndex = 0 : null
        }
    }

    move() {
        this.posX -= 3.5
    }
}