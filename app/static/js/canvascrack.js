class Canvascrack extends Gameshow {
    constructor() {
        super();
        this.latestState = null;
    }

    renderState(state) {
        // If latest state doesn't exist, update it
        if (this.latestState == null) {
            this.latestState = state;
            Scores.renderState(state);
        }

        // Pass to super method
        super.renderState(state);

        // Transition from questions to review stage
        if (state.review_stage && !this.latestState.review_stage) {
            Sound.playSound("bumper");
        }

        if (state.crack_response_time && !this.latestState.crack_response_time) {
            Sound.playSound("choice");
        }

        if (state.review_stage_inner == 1 && this.latestState.review_stage_inner != 1) {
            Sound.playSound("crack_response");
        }

        if (state.review_stage_inner == 2 && this.latestState.review_stage_inner != 2) {
            Sound.playSound("sweep");
        }

        Questions.renderState(state);

        if (gameMode == "crack") {
            Crack.renderState(state);
        }
        Scores.updateState(state, this.latestState);
        AuxiliaryMedia.renderState(state);

        // Host/client-specific rendering
        if (gameMode == "presenter") {
            this.renderStateHost(state);
        }
        else {
            this.renderStateGame(state);
        }

        // Update latest state
        this.latestState = state;
    }

    renderStateHost(state) {
        document.getElementById("button_advance").onclick = () => { this.advance(); };
    }

    renderStateGame(state) {

    }

    challengerRespond(answerIndex) {
        this.websocket.emit("challenger_response", answerIndex);
    }

    crackRespond(answer) {
        this.websocket.emit("crack_response", answer);
    }

    advance() {
        this.websocket.emit("advance");
    }
}

canvascrack = new Canvascrack();