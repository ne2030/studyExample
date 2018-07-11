const axios = require('axios');

setInterval(() => {
    axios.get('http://localhost:9000/1')
        .then(response => console.log(response.data));

    axios.get('http://localhost:9000/2')
        .then(response => console.log(response.data));

    axios.get('http://localhost:9000/3')
        .then(response => console.log(response.data));

    axios.get('http://localhost:9000/4')
        .then(response => console.log(response.data));

    axios.get('http://localhost:9000/1')
        .then(response => console.log(response.data));

    axios.get('http://localhost:9000/2')
        .then(response => console.log(response.data));
}, 1000 * 60 * 5);


axios.get('http://localhost:9000/1')
    .then(response => console.log(response.data));

axios.get('http://localhost:9000/2')
    .then(response => console.log(response.data));

axios.get('http://localhost:9000/3')
    .then(response => console.log(response.data));

axios.get('http://localhost:9000/4')
    .then(response => console.log(response.data));

axios.get('http://localhost:9000/1')
    .then(response => console.log(response.data));

axios.get('http://localhost:9000/2')
    .then(response => console.log(response.data));
