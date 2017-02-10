"use strict";
module.exports = {
    production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
    
    },
    development: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL || "postgres://localhost/blog",
        pool: {
            min: 1,
            max: 1
        }
    },
    test: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL || "postgres://localhost/test-blog",
        pool: {
            min: 1,
            max: 1
        }
    }
};
