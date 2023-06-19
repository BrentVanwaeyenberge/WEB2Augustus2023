export class Release {
    constructor(releaseData) {
        this.releaseData = releaseData;
    }

    generateHTML() {
        let html = `<div id='${this.getID()}'><p>${this.releaseData.title}</p></div>`
        //     let html = `<div class="col m2">
        //     <div class="card">
        //         <div class="card-image">
        //             <img src="${this.pokemonData.sprites.front_default}">
        //             <span class="card-title green lighten-2" style="opacity:0.6;color:black;">${this.pokemonData.name.toUpperCase()} #${this.pokemonData.id}</span>
        //         </div>
        //         <div class="card-content">
        //             <p>Type: ${this.pokemonData.types[0].type.name.toUpperCase()}</p>
        //             <p>Height: ${(this.pokemonData.height / 10).toFixed(2)}m</p>
        //             <p>Weight: ${(this.pokemonData.weight / 10).toFixed(1)}kg</p>
        //         </div>
        //         <div class="card-action">
        //             <button id="b${this.pokemonData.id}" class="waves-effect waves-light btn green" style="width:100%"><i class="material-icons left">thumb_up_off_alt</i>VOTE</button>
        //         </div>
        //     </div>
        // </div>`;

        return html;
    }

    getID() {
        return this.releaseData._id;
    }
}