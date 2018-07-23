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

function query(connection, query) {
    return new Promise(function (resolve, reject) {

        try {

            var ans = [];
            var properties = [];

            //acquire a connection
            pool.acquire(function (err, connection) {
                if (err) {
                    console.log('acquire ' + err);
                    reject(err);
                }
                console.log('connection on');

                var dbReq = new Request(query, function (err, rowCount) {
                    if (err) {
                        console.log('Request ' + err);
                        reject(err);
                    }
                });

                dbReq.on('columnMetadata', function (columns) {
                    columns.forEach(function (column) {
                        if (column.colName != null)
                            properties.push(column.colName);
                    });
                });
                dbReq.on('row', function (row) {
                    var item = {};
                    for (i = 0; i < row.length; i++) {
                        item[properties[i]] = row[i].value;
                    }
                    ans.push(item);
                });

                dbReq.on('requestCompleted', function () {
                    console.log('request Completed: ' + dbReq.rowCount + ' row(s) returned');
                    console.log(ans);
                    connection.release();
                    resolve(ans);

                });
                connection.execSql(dbReq);

            });
        }
        catch (err) {
            reject(err)
        }
    });
}

module.exports = {
    query,

    connection,

};
