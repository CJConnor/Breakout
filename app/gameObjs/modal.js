export {Modal}

/**
 * Modal class
 */
class Modal {

    /**
     * Modal constructor
     * @param docBody | DOM
     */
    constructor(docBody) {
        this.docBody = docBody;
        this.modal = this.docBody.getElementById("con-modal");
    }

    /**
     * Function to close modals
     */
    closeModals() {
        this.modal.style.display = "none";
        this.docBody.location.reload();
    }

    /**
     * Function saves results
     * @param score | integer
     */
    saveResults(score) {

        let name = this.docBody.getElementById("name").value;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('score', score);

        fetch(`act/saveResults.php`, {method: 'post', body: formData})
            .then((response) => (response.text()))
            .then((html) => {
                if (html.includes('success')) {
                    this.displayResults();
                    this.closeModals();
                }
            });

    }

    /**
     * Adds event listeners to the modals
     * @param score | integer
     */
    addModalFunctionality(score) {

        console.log(this.docBody.getElementById("save"));

        this.docBody.getElementById("save").addEventListener('click', () => { this.saveResults(score) });

        for (let item of this.docBody.getElementsByClassName("c")) {
            item.addEventListener('click', () => { this.closeModals() })
        }

    }

    /**
     * Gets content for the game over modal
     * @param score | integer
     */
    displayGameOverModal(score) {
        fetch('_assets/json/modal-content.json', {method: "get"})
            .then((response) => response.text())
            .then((json) => {

                json = JSON.parse(json);

                this.modal.innerHTML = json['gameOver'];


                this.addModalFunctionality(score);

                this.displayModal();
        });
    }

    /**
     * Gets content for the congrats modal
     * @param score
     */
    displayCongratsModal(score) {
        fetch('_assets/json/modal-content.json', {method: "get"})
            .then((response) => response.text())
            .then((json) => {

                json = JSON.parse(json);

                this.modal.innerHTML = json['congrats'];

                this.addModalFunctionality(score);

                this.displayModal();

            });
    }

    /**
     * Displays modal
     */
    displayModal() {
        this.modal.style.display = 'block';
    }

    /**
     * Displays results
     */
    displayResults() {

        let table = this.docBody.getElementById("table");

        fetch(`_assets/json/leaderboard.json`, {method: 'get'})
            .then((response) => response.text())
            .then((json) => {

                json = JSON.parse(json);

                let leaderboard = json.leaderboard;
                let html        = ``;

                for (let i = 0; i < leaderboard.length; i++) {
                    html += `<tr><td>${leaderboard[i].name}</td><td>${leaderboard[i].score}</td></tr>`;
                }

                table.innerHTML = html;
            });

    }

}