const fs = require("fs");
const csv = require("csv-parser");
const { intToIP } = require("../ipOperations/intToIP");
const { ipToInt } = require("../ipOperations/ipToInt");

class FindCountryService {
    async getCountry(ip) {
        try {
            const ipInt = ipToInt(ip);
            const resultsCSV = [];
            let final;

            await new Promise((resolve, reject) => {
                fs.createReadStream('IP2LOCATION-LITE-DB1.CSV')
                    .pipe(csv(['start', 'end', 'short', 'country']))
                    .on('data', (data) => resultsCSV.push(data))
                    .on('end', resolve)
                    .on('error', reject);
            });

            resultsCSV.forEach((item) => {
                if (ipInt >= Number(item.start) && ipInt <= Number(item.end)) {
                    final = {
                        country: item.country,
                        startOfRange: intToIP(item.start),
                        endOfRange: intToIP(item.end),
                    };
                }
            });
            if (!final){
                return `Can't find the right country`
            }
            console.log(final)
            return final;
        } catch (e) {
            console.log(e.message);
        }
    }
}

module.exports = new FindCountryService();