class Questions {
    static renderState(state) {
        const gameElement = document.getElementById("game");
        gameElement.classList.remove("reviewing");

        let challengerResponseIndex = -1;
        if (state.crack_response_time) {
            challengerResponseIndex = state.challenger_response_history[state.challenger_response_history.length - 1];
        }

        if (state.review_stage) {
            challengerResponseIndex = state.challenger_response_history[state.current_subround];
            gameElement.classList.add("reviewing");
        }

        for (let i = 0; i < state.current_question.answers.length; i++) {
            const answer = state.current_question.answers[i];
            const answerElement = document.getElementById(`question_option_inner_${i}`);

            answerElement.innerHTML = answer;

            const answerElementOuter = document.getElementById(`question_option_${i}`);
            if (host) {
                answerElementOuter.onclick = () => { canvascrack.challengerRespond(i); };
            }

            answerElementOuter.classList.remove("greyed");
            if ((state.crack_response_time || state.review_stage) && i != challengerResponseIndex) {
                answerElementOuter.classList.add("greyed");
            }

            if (state.review_stage) {
                const crackResponseElement = document.getElementById(`question_crack_response_${i}`);
                crackResponseElement.innerHTML = "&nbsp;"

                if (i == challengerResponseIndex) {
                    // todo conditionally show crack response
                }
            }
        }

        const questionText = state.current_question.short;
        document.getElementById("question").innerHTML = questionText;

        document.getElementById("question_no").innerHTML = `${state.current_subround + 1}.`;
    }
}