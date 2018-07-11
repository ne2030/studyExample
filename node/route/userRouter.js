const express = require('express');

const router = express.Router();

// router.use((req, res, next) => {
//     console.log('welcome to user router!');
//     next();
// });
//
// router.get('/', (req, res) => {
//     console.log('hi users!');
//     res.status(200).end();
// });
//
// router.get('/pretty', (req, res) => {
//     console.log('hi pretty user?');
//     res.status(200).end();
// });
//
// router.get('/:id', (req, res) => {
//     console.log(`hi user ${req.params.id}`);
//     res.status(200).end();
// });
//
// router.get('/welcome/:id', (req, res) => {
//     console.log('hi user welcome');
//     res.status(200).end();
// });

module.exports = router;
