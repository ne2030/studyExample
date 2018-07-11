const fs = require('fs');

fs.appendFile('text.txt', '::: ::: line\n', () => {
    console.log('fin');
});
