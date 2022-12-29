class Scores {
    static renderState(state) {
        Scores.setChallengerScore(state.players[0].points);
        Scores.setCrackScore(state.players[1].points);
    }

    static updateState(state, latestState) {
        const newScores = state.players.map(player => player["points"]);
        const oldScores = latestState.players.map(player => player["points"]);

        // First, we compute the number of score differences
        const scoreDifferences = newScores.map(function (item, index) {
            return item - oldScores[index];
        });

        // Find out the total number of score differences
        const totalDifferences = scoreDifferences.reduce((partialSum, a) => partialSum + a, 0);

        switch (totalDifferences) {
            case 2:
                setTimeout(() => {
                    this.setChallengerScore(newScores[0]);
                }, 1700);
                setTimeout(() => {
                    this.setCrackScore(newScores[1]);
                }, 1700 + 1000);
                break;
            case 1:
                // Check whether we have to update challenger of crack score
                const differenceIndex = scoreDifferences.indexOf(1);
                
                const scoreUpdateFunction = differenceIndex == 0 ?
                    () => { this.setChallengerScore(newScores[0]); } :
                    () => { this.setCrackScore(newScores[1]); };
                setTimeout(scoreUpdateFunction, 1700);
                break;
        }
    }

    static setCrackScore(points) {
        document.getElementById("crack_score").innerHTML = points;
    }

    static setChallengerScore(points) {
        document.getElementById("challenger_score").innerHTML = points;
    }
}