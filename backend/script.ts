import * as fs from 'fs';
import csv from 'csv-parser';

async function readCSVFile(filePath: string): Promise<object[]> {
  const results: object[] = [];
  const delimiter = ';';
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv([delimiter]))
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

const filePath = '/home/julio/mrm/backend/municipios_Brasil.csv';

readCSVFile(filePath)
  .then((data) => {
    console.log(data); // This will log the parsed data as an array of objects
  })
  .catch((error) => {
    console.error(error); // This will log any errors that occurred during the parsing process
  });
