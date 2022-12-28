class Crack {
    static renderState(state) {
        const crackPanel = document.getElementById("crackpanel");
        crackPanel.classList.remove("d-none");

        if (!state.crack_response_time) {
            crackPanel.classList.add("d-none");
        }

        document.getElementById("button_follow").onclick = () => { canvascrack.crackRespond(true); };
        document.getElementById("button_no_follow").onclick = () => { canvascrack.crackRespond(false); };
    }
}