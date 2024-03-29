import FileUploadService from '../services/FileUploadService.js';
import moment from 'moment';

const comma = x => {
  return Number(x).toLocaleString()
}

const camelize = str => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+|\/|\./g, '');
}

const ordinalSuffixOf = i => {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}

const formatISOString = iso => {
  return moment(iso, "MM-DD-YYYY").utc().format('MM/DD/YYYY');
}

const convertDateToISO = date => {
  return moment(date).format("YYYY-MM-DD");
}

const convertDateTimeToISO = date => {
  return moment(date).format();
}

const openPdf = (data) => {
  const file = new Blob([data], {type: 'application/pdf'});
  const fileURL = URL.createObjectURL(file);
  window.open(fileURL);
}

const formatValidity = validity => {
  return formatISOString(validity.startDate) + " - " + formatISOString(validity.endDate);
}

const getValuesOfNodeList = potentialList => {
  const result = [];
  if (potentialList.value === "") { // has a list of values
    potentialList.forEach(input => {
      if (input.value !== "") {
        result.push(input.value);
      }
    });
  } else { // only has one value
    result.push(potentialList.value);
  }
  return result;
}

const findValue = (list, label) => {
  return list.filter(item => item.label === label)[0].value;
}

const handlePDFOpen = pdf => {
  FileUploadService.downloadFile(pdf)
    .then(res => openPdf(res.data))
    .catch(e => {
      console.log(e);
    });
}


export default { 
  comma,
  ordinalSuffixOf,
  formatISOString,
  convertDateToISO,
  convertDateTimeToISO,
  openPdf,
  formatValidity,
  getValuesOfNodeList,
  findValue,
  camelize,
  handlePDFOpen
};
