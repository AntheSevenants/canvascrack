class Canvascrack extends Gameshow {
    constructor() {
        super();
    }

    renderState(state) {
        // Pass to super method
        super.renderState(state);

        Questions.renderState(state);
        Crack.renderState(state);

        // Host/client-specific rendering
        if (host) {
            this.renderStateHost(state);
        }
        else {
            this.renderStateGame(state);
        }
    }

    renderStateHost(state) {

    }

    renderStateGame(state) {

    }

    challengerRespond(answerIndex) {
        this.websocket.emit("challenger_response", answerIndex);
    }

    crackRespond(answer) {
        this.websocket.emit("crack_response", answer);
    }
}

canvascrack = new Canvascrack();