const app = require('express')();

app.use((req, res, next) => {
    console.log('this is the example app for express router!!');
    next();
});

const userRouter = require('./userRouter');
app.get('/users/:id', (req, res, next) => {
    console.log('hey');
    next();
});
app.use('/users', userRouter);

userRouter.get('/pretty', (req, res) => {
    console.log('hi pretty user?');
    res.status(200).end();
});

app.listen('5050', () => {
    console.log('test server for router starts at port 5050')
});
