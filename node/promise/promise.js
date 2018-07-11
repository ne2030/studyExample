function test(a) {
    return new Promise((resolve, reject) => {
        // reject(a + 1);/
        throw new Error('error!!')
    });
}

test(1)
    .then(function(b) {
        console.log('success1::', b);
        return b + 1;
    })
    // .catch(function(err) {
    //     console.log('error1::', err);
    //     throw new Error(err + 1);
    //     // return err + 1;
    // })
    // .then(function(c) {
    //     console.log('success2::', c);
    //     return c + 1;
    // })
    // .catch(function(err) {
    //     console.log('error2::', err.message);
    //     // return err + 1;
    // });
