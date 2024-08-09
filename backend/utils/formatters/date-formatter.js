const moment = require('moment');

const isValidDate = (date) => {
    let momentDate = moment(date, 'YYYY-MM-DD', true);
    return momentDate.isValid();
}


module.exports = isValidDate;