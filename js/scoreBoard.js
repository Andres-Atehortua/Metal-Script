const Scoreboard = {
    ctx: undefined,

    init(ctx) {
        this.ctx = ctx;
        this.ctx.font = "30px sans-serif";
    },

    update(score, life) {
        this.ctx.fillStyle = "blue";
        this.ctx.fillText(`SCORE: 0${score}`, 50, 50);
        this.ctx.fillStyle = "red";
        this.ctx.fillText(`HEALTH: ${life}%`, 1070, 50);
        this.ctx.fillStyle = "grey";
        this.ctx.fillText(`AMMO: NaN ∞`, 550, 50);
    }
};