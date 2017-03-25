import fs from 'fs-promise';

module.exports = (fileName) => {
  let onSuccess = (data) => {
    return Promise.resolve(data.toString().split('\n').length);
  },
    onError = (err) => {
    return Promise.reject(new Error('unable to open file ' + fileName));
  };
  
  return fs.readFile(fileName)
           .then(onSuccess) 
           .catch(onError); 
};