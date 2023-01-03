class AuxiliaryMedia {
    static generateResourceUrl(resource) {
        return `/resources/${resource}`;
    }

    static renderState(state) {
        const auxiliaryMediaElement = document.getElementById("auxiliary_media");
        auxiliaryMediaElement.classList.add("d-none");

        if ("image" in state.current_question) {
            if (state.current_question.image != null) {
                auxiliaryMediaElement.classList.remove("d-none");
                auxiliaryMediaElement.src = AuxiliaryMedia.generateResourceUrl(state.current_question.image);
            }
        }

        if ("audio" in state.current_question) {
            // Only play audio when "question stage inner" is equal to the reveal stage
            // Otherwise we'll get audio resets with every inner advancement
            if (state.current_question.audio != null && state.question_stage_inner == 2) {
                const questionSoundSource = document.getElementById("snd_question_source");
                questionSoundSource.src = AuxiliaryMedia.generateResourceUrl(state.current_question.audio);

                const questionSoundElement = document.getElementById("snd_question");
                questionSoundElement.load();

                Sound.playSound("question");
            }
        }
    }
}