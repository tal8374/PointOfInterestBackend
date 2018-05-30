const fs = require('fs');
const parser = require('xml2json');

function getCountries(req, res) {
    fs.readFile('C:\\Users\\Tal\\WebstormProjects\\serverSide\\countries.xml', function (err, data) {
        if (err) {
            res.status(400).send(err.message);
        }
        const json = parser.toJson(data);

        res.status(200).send(JSON.parse(json).Countries.Country);
    });
}


module.exports = {
    getCountries
};