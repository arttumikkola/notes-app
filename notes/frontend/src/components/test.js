const moment = require("moment");

const formatDate = (date) => {
  return moment(date).format("D.MM.YYYY HH.mm.ss");
};

console.log(new Date());
console.log(formatDate("27.01.2023 14.16.25"));
