"use strict";
module.exports = {

    development: {
        client: 'postgresql',
        connection: "postgres://localhost/blog",
        pool: {
            min: 1,
            max: 1
        }
    },
    test: {
        client: 'postgresql',
        connection: "postgres://localhost/test-blog",
        pool: {
            min: 1,
            max: 1
        }
    }
};
