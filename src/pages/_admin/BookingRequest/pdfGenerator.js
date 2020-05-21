import jsPDF from 'jspdf';
import moment from 'moment';
import Utils from '../../../utils/Helpers.js';

const doc = new jsPDF("p", "pt", 'letter');

const centeredText = (text, y) => {
    let textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    let textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(textOffset, y, text);
}

const preview = info => {
  doc.setProperties({
    title: 'Booking Confirmation #' + info.confirmation.bookingNo,
    subject: 'Info about PDF',
    author: 'Scarlet Nguyen',
    keywords: 'generated, javascript, web 2.0, ajax',
    creator: 'OneStep Shipping'
  });

  doc.setFont('helvatica');
  doc.setFontSize(16);
  doc.setFontType('bolditalic');
  doc.text(430, 60, "OneStep Shipping");

  doc.setFont('courier');
  doc.setFontSize(20);
  doc.setFontType('bold');
  centeredText(
    Utils.ordinalSuffixOf(info.confirmation.timeReceived) + 
    ' Booking Confirmation', 
    100
  );

  doc.setFontSize(12);
  doc.setFontType('normal');
  doc.text(50, 140, "TO: " + info.company.name);
  doc.text(50, 158, "    " + info.company.address.street);
  doc.text(50, 173, "    " + info.company.address.city);
  doc.text(50, 188, "    " + info.company.address.country);

  doc.setFontSize(10);
  doc.text(310, 130, "Our Reference No.:                1234567");
  doc.text(310, 145, "Contact          :              Rose Phan");
  doc.text(310, 160, "Tel              :      +1 (604) 500-4934");
  doc.text(310, 175, "Email            :   rosephan99@gmail.com");
  doc.text(310, 190, "Issue Date       :             " + moment().format("L"));

  doc.line(50, 200, 560, 200);

  doc.setFontSize(11);
  doc.text(80, 230, "From: " + info.schedule.route.startLocation);
  doc.text(350, 230, "To: " + info.schedule.route.endLocation);

  doc.text(80, 250, "ETD: " + info.confirmation.etd);
  doc.text(350, 250, "ETA: " + info.confirmation.eta);

  doc.text(80, 290, "Commodity: " + info.booking.commodity);

  doc.text(350, 290, "Q'ty");
  doc.text(420, 290, "Container Type");

  info.booking.containers.map((row, i) => function() {
    doc.text(350, 307 + (i * 17), "" + row.quantity);
    doc.text(420, 307 + (i * 17), row.containerType);
  })

  doc.setFontSize(12);
  doc.setFontType('bold');
  doc.text(80, 330, "Booking No.: " + info.confirmation.bookingNo);

  doc.setFontSize(11);
  doc.setFontType('normal');
  doc.text(80, 360, "Carrier: " + info.schedule.route.carrier);

  doc.text(80, 400, "Terminal Cut-off: " + info.confirmation.terminaCutoff);
  doc.text(80, 420, "Document Cut-off: " + info.confirmation.docCutoff);
  doc.text(80, 440, "VGM Cut-off     : " + info.confirmation.vgmCutoff);

  doc.setFontSize(12);
  doc.setFontType('bold');
  doc.text(80, 483, "Empty Pickup Location");
  doc.text(350, 483, "Return Location");

  doc.setFontType('normal');
  doc.setFontSize(10);
  doc.text(80, 500, info.confirmation.pickUpLocation.street);
  doc.text(350, 500, info.confirmation.returnLocation.street);

  doc.text(80, 515, info.confirmation.pickUpLocation.city);
  doc.text(350, 515, info.confirmation.returnLocation.city);

  doc.text(80, 530, info.confirmation.pickUpLocation.country);
  doc.text(350, 530, info.confirmation.returnLocation.country);

  doc.line(50, 560, 560, 560);

  doc.setFontSize(12);
  doc.setFontType('bold');
  doc.text(50, 580, 'Note:');
  doc.setFontSize(11);
  doc.setFontType('normal');
  doc.text(50, 605, 'Terminal cut-off may change. The trucker has to check with the terminal prior');
  doc.text(50, 625, 'to return.');

  doc.text(50, 670, 'Best regards,');
  doc.text(50, 710, 'OneStep Shipping.');

  window.open(doc.output('bloburl'), '_blank');
}

const uploadToServer = () => {
  return doc.output('blob');
}

export default { preview, uploadToServer };