class Canvascrack extends Gameshow {
    constructor() {
        super();
    }

    renderState(state) {
        // Pass to super method
        super.renderState(state);

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
}

canvascrack = new Canvascrack();