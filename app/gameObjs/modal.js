class Modal {

    constructor(docBody) {
        this.docBody = docBody;
        this.modal = this.docBody.getElementById("con-modal");
        this.save = this.docBody.getElementById("save");
    }


    displayCongratsModal() {
        this.modal.style.display = "block";
    }

    closeCongratsModal() {
        this.modal.style.display = "none";
        this.docBody.location.reload();
    }

    displayResults() {

        let table = this.docBody.getElementById("table");

        fetch(`php/displayResults.php`, {method: 'get'})
            .then((response) => response.text())
            .then((html) => {
                table.innerHTML = html;
            });

    }

    //AJAX Request

    saveResult(score) {

        let name = this.docBody.getElementById("name").value;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('score', score);

        fetch(`php/saveResults.php`, {method: 'post', body: formData})
            .then((response) => (response.text()))
            .then((html) => {
                if (html.includes('success')) {
                    this.displayResults();
                    this.closeCongratsModal();
                }
            });
    
    }

}