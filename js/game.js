const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    obstacles: [],
    framesCounter: 0,
    score: undefined,

    init() {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = window.innerWidth
        this.height = window.innerHeight * 0.95;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.start()
    },
    start() {
        this.reset()
        this.interval = setInterval(() => {
            this.framesCounter++
            this.framesCounter > 800 ? this.framesCounter = 0 : null
            this.clear()
            this.drawAll()
            this.moveAll()

        }, 1000 / this.fps)
    },
    reset() {
        this.background = new Background(this.ctx, 9000, this.height)
        this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.background)

    },
    drawAll() {
        this.background.draw()
        this.player.draw(this.framesCounter)
    },
    moveAll() {
        this.player.move()
    },
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }



}