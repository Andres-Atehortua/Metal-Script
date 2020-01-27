class Player {
    constructor(ctx, width, height, background) {
        this.ctx = ctx
        this.gameWidth = width
        this.gameHeight = height
        // Tamaño del player
        this.width = 50
        this.height = 65
        // Imagen del player
        this.image = new Image()
        this.image.src = "img/playerOcioso/cc_player_idle.png"
        // Posicion del player
        this.posX = 10
        this.posY = this.gameHeight * 0.95 - this.height - 45
        this.posY0 = this.posY //Para usarla como suelo.
        // Velocidad del player
        this.velY = 10
        this.velX = 1
        // Propiedades de la imagen
        this.directions = {
            top: false,
            right: false,
            left: false
        }
        this.image.frames = 5
        this.image.framesIndex = 0
        this.background = background
        this.setListeners()
    }
    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames), //Punto x donde empieza a recortar
            0, //Punto y donde empieza a recortar
            Math.floor(this.image.width / this.image.frames), //Punto x donde termina de recortar
            this.image.height, //Punto y donde termina de recortar
            this.posX,
            this.posY,
            this.width,
            this.height)
        this.animate(framesCounter)
    }
    animate(framesCounter) {
        if (framesCounter % 15 == 0) {
            this.image.framesIndex++; //Cambiamos el frame de la imagen cada 5 fps.
            if (this.image.framesIndex > 4) {
                this.image.framesIndex = 0;
            }
        }
    }
    move() {
        let gravity = 0.5;
        if (this.posY < this.posY0) {
            this.posY += this.velY;
            this.velY += gravity;
        } else {
            this.posY = this.posY0;
            this.velY = 0;
        }

        if (this.directions.right) {
            this.posX += 1
            this.background.move(this.posX, this.velX, this.gameWidth)
        }
        if (this.directions.top) {

            this.posY -= 20
            this.velY -= 2
        }
        if (this.directions.left) {
            this.posX -= 1
        }
    }
    setListeners() {
        document.onkeydown = e => {
            if (e.keyCode === 39) {
                this.directions.right = true
                this.move()

            } else if (e.keyCode === 38) {
                this.directions.top = true
                this.move()

            } else if (e.keyCode === 37) {
                this.directions.left = true
                this.move()
            }
        }
        document.onkeyup = e => {
            if (e.keyCode === 39) {
                this.directions.right = false
            } else if (e.keyCode === 38) {
                this.directions.top = false
            } else if (e.keyCode === 37) {
                this.directions.left = false
            }
        }

    }
}