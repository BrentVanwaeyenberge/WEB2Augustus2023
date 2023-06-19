import * as Release from './Release.js';

export function getReleases() {
    let promise = new Promise((resolve, reject) => {

        fetch("http://localhost:3000/releases").then(releases => {
            releases.json().then(data => {

                let releaseArray = [];

                data.forEach(releaseObj => {

                    releaseArray.push(new Release.Release(releaseObj));

                    resolve(releaseArray)
                });

            });
        }).catch((response) => {
            reject(response);
        });

    });

    return promise;
}

export function createVote(releaseId, userId){

}