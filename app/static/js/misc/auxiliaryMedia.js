class AuxiliaryMedia {
    static renderState(state) {
        const auxiliaryMediaElement = document.getElementById("auxiliary_media");
        auxiliaryMediaElement.classList.add("d-none");

        if (!("image" in state.current_question)) {
            return;
        }

        if (state.current_question.image != null) {
            auxiliaryMediaElement.classList.remove("d-none");
            auxiliaryMediaElement.src =
                `/resources/${state.current_question.image}`;
        }
    }
}