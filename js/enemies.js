class Enemy {
    constructor(ctx, posX, posY) {
        this.ctx = ctx
        this.width = 65
        this.height = 75
        this.posX = posX
        this.posY = posY
        this.life = 100
        this.image = new Image()
        this.image.src = "img/enemyleft/runningleftenemy.png"
        this.image.frames = 8
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
        if (framesCounter % 10 == 0) {
            this.image.framesIndex++;
            this.image.framesIndex > 7 ? this.image.framesIndex = 0 : null
        }
    }
    move() {
        this.posX -= 4
    }
    damage() {
        this.life -= 25

        if (this.life <= 0)
            return true
        else
            return false
    }


}