window.onload = () => {
    document.getElementById("myCanvas").style.display = "none"
    document.getElementById("footer").style.display = "none"
    document.getElementById("startDemo").onclick = () => {
        document.getElementById("start").style.display = "none"
        document.getElementById("myCanvas").style.display = "block"
        document.getElementById("footer").style.display = "block"
        Game.init()
    }
}