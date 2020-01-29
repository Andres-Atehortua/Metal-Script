window.onload = () => {
    document.getElementById("myCanvas").style.display = "none"
    document.getElementById("startDemo").onclick = () => {
        document.getElementById("start").style.display = "none"
        document.getElementById("myCanvas").style.display = "block"
        Game.init()
    }
}