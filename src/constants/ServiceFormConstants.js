// Booking Request Form
const CONTAINER_TYPES = ['20\' Dry', '40\' Dry', '40\'HC Dry'];
const AUTO_FILLING = ['Yes', 'No'];
const PAYMENT_TYPES = ['Prepaid', 'Collect'];
const CONTAINER_HEADERS = ["Quantity", "Container Type"];

// BOL Instruction Form
const TEXTAREA_FIELDS = ["Shipper", "Consignee", "Notify", "Description of Goods"];
const TRACKING_HEADERS = ["Container No.", "Seel No.", "Cargo Weight (kgs)", "Measurement (cbm)", "VGM"];
const INPUT_FIELDS = ["Order/PO Number", "HS Code", "CAED/AES Number", "Cargo Value"];

export {
  CONTAINER_TYPES,
  AUTO_FILLING,
  PAYMENT_TYPES, 
  CONTAINER_HEADERS,

  TEXTAREA_FIELDS,
  TRACKING_HEADERS,
  INPUT_FIELDS
}