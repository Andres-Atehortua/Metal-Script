class Boss {

    constructor(ctx, width, height) {
        this.ctx = ctx
        this.width = width
        this.height = height
        this.posX = 4100
        this.posY = 470
        this.life = 400
        this.image = new Image()
        this.image.src = "img/cc_boss/boss_shoot.png"
        this.image.frames = 5
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
        if (framesCounter % 5 == 0) {
            this.image.framesIndex++;
            this.image.framesIndex > 4 ? this.image.framesIndex = 0 : null
        }
    }

    move() {
        this.posX -= 3.5
    }

    damage() {
        this.life -= 25
        if (this.life <= 0)
            return true
        else
            return false
    }

}