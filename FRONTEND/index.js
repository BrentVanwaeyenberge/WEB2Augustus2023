let users = fetch("http://localhost:3000/users").then(users => {
    console.log(users);
});