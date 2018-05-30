//this is only an example, handling everything is yours responsibilty !
//this is an example - open and close the connection in each request

const ConnectionPool = require('tedious-connection-pool');
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;
var Connection = require('tedious').Connection;

const poolConfig = {
    min: 2,
    max: 5,
    log: true
};

const connectionConfig = {
    userName: 'svivutserver',
    password: 'tal12345#',
    server: 'svivutserver.database.windows.net',
    options: {encrypt: true, database: 'svivutserver'}
};

var connection = new Connection(connectionConfig);

//create the pool
var pool = new ConnectionPool(poolConfig, connectionConfig)

pool.on('error', function (err) {
    if (err) {
        console.log(err);

    }
});
console.log('pool connection on');

function Select(connection, query) {
    console.log("** Select **");
    console.log("**Query is: " + query + "**");
    return new Promise(function (resolve, reject) {
        var req = new Request(query, function (err) {
            if (err) {
                console.log("**Select error: " + err.message + "**");
                reject(err.message);
            }
        });
        var res = [];
        var properties = [];
        req.on('columnMetadata', function (columns) {
            columns.forEach(function (column) {
                if (column.colName != null)
                    properties.push(column.colName);
            });
        });
        req.on('row', function (row) {
            var item = {};
            for (i = 0; i < row.length; i++) {
                item[properties[i]] = row[i].value;
            }
            res.push(item);
        });
        req.on('requestCompleted', function () {
            console.log('select request Completed with ' + req.rowCount + ' rows');
            console.log(res);
            resolve(res);
        });

        connection.execSql(req);
    });
};

function Insert(connection, query) {
    console.log("** Insert **");
    console.log("**Query is: " + query + "**");
    return new Promise(function (resolve, reject) {
        var req = new Request(query, function (err) {
            if (err) {
                console.log(err.message);
                reject(err);
            }
        });
        req.on('requestCompleted', function () {
            console.log("Insert completed with " + req.rowCount + " rows");
            resolve("success");
        });

        connection.execSql(req);
    });
};

function Update(connection, query) {
    console.log("** Update **");
    console.log("**Query is: " + query + "**");
    return new Promise(function (resolve, reject) {
        var req = new Request(query, function (err) {
            if (err) {
                console.log(err.message);
                reject(err);
            }
        });
        req.on('requestCompleted', function () {
            console.log("Update completed with " + req.rowCount + " rows");
            resolve(req.rowCount);
        });

        connection.execSql(req);
    });
};

function Delete(connection, query) {
    console.log("** Delete **");
    console.log("**Query is: " + query + "**");
    return new Promise(function (resolve, reject) {
        var req = new Request(query, function (err) {
            if (err) {
                console.log(err.message);
                reject(err);
            }
        });
        req.on('requestCompleted', function () {
            console.log("Delete completed with " + req.rowCount + " rows");
            resolve(req.rowCount);
        });

        connection.execSql(req);
    });
};

module.exports = {
    Select,

    Insert,

    Delete,

    Update,

    connection,


};
