import * as Service from "./model/Service.js";

let global = {};
let user = {};

function main() {
    Service.getReleases().then(releases => {
        let container = document.getElementById("releasesContainer");

        releases.forEach(release => {
            container.innerHTML += release.generateHTML();
        });

        releases.forEach(release => {
            document.getElementById(release.getID()).onclick = onReleaseClick;
        });
    });
}

main();



// EVENT HANDLERS

function onReleaseClick(event) {
    global.selectedRelease = event.currentTarget.id;
}

function onVoteButtonClick(event) {
    Service.createVote(global.selectedRelease, user.id);
}