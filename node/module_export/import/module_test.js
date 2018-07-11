'use strict';

import test1 from './test1';
import test2 from './test2';
import test3 from './test3';

export const hello = Object.assign({},
    test1, test2, test3,
);
