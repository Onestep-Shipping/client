import Utils from '../../../utils/Helpers.js';
import jsPDF from 'jspdf';
import moment from 'moment';

const doc = new jsPDF("p", "pt", 'letter');

const centeredText = (text, y) => {
    let textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    let textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(textOffset, y, text);
}

const preview = info => {
  doc.setProperties({
    title: 'Invoice #' + info.bookingNo,
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
  centeredText('Invoice', 90);

  doc.setFontSize(12);
  doc.setFontType('normal');
  doc.text(50, 130, "TO: " + info.company.name);
  doc.text(50, 148, "    " + info.company.address.street);
  doc.text(50, 163, "    " + info.company.address.city);
  doc.text(50, 178, "    " + info.company.address.country);

  doc.setFontSize(10);
  doc.text(310, 115, "Invoice No.      :                3242356");
  doc.text(310, 130, "Our Reference No.:                1234567");
  doc.text(310, 145, "Contact          :              Rose Phan");
  doc.text(310, 160, "Tel              :      +1 (604) 500-4934");
  doc.text(310, 175, "Email            :   rosephan99@gmail.com");
  doc.text(310, 190, "Issue Date       :             " + moment().format("L"));

  doc.line(50, 200, 560, 200);

  doc.setFontSize(12);
  doc.setFontType('bold');
  doc.text(80, 230, "Booking No.: " + info.bookingNo);

  doc.setFontSize(11);
  doc.setFontType('normal');

  doc.setFontSize(11);
  doc.text(80, 260, "From: " + info.schedule.route.startLocation);
  doc.text(350, 260, "To: " + info.schedule.route.endLocation);

  doc.text(80, 280, "ETD: " + Utils.formatISOString(info.schedule.startDate));
  doc.text(350, 280, "ETA: " + Utils.formatISOString(info.schedule.endDate));

  doc.text(80, 320, "Commodity: " + info.booking.commodity);
  doc.text(350, 320, "Order Number: " + info.orderNo);

  doc.setFontType('bold');
  doc.text(80, 360, "Description");
  doc.text(200, 360, "Q'ty");
  doc.text(250, 360, "Container");
  doc.text(350, 360, "Price (USD)");
  doc.text(450, 360, "Total (USD)");

  doc.setFontType('normal');

  info.priceList.map((row, i) => {
    const height = 377 + (i * 17);
    if (i < info.priceList.length - 2) {
      doc.text(80, height, "Ocean Freight");
      doc.text(200, height, "" + info.booking.containers[i].quantity);
      doc.text(250, height, info.booking.containers[i].containerType);
    } else if (i === info.priceList.length - 2) {
      doc.text(80, height, "Document");
      doc.text(200, height, "1");
    } else {
      doc.text(80, height, "Administration");
      doc.text(200, height, "1");
      doc.line(80, height + 10, 560, height + 10);
      doc.text(350, height + 24, "Sub Total: ");
      doc.text(450, height + 24, "$" + info.subTotal);
    }
    doc.text(350, height, "$" + row.price);
    doc.text(450, height, "$" + row.total);
  })

  doc.setFontSize(12);
  doc.setFontType('bold');
  doc.text(80, 530, "Bank Information - RBC Bank");

  doc.setFontSize(11);
  doc.setFontType('normal');
  doc.text(80, 550, "Branch No.       : 12345");
  doc.text(80, 567, "Institution No.  : 003");
  doc.text(80, 584, "Account No. (USD): 1234567");
  doc.text(80, 601, "Account No.      : 2345678");

  doc.line(50, 625, 560, 625);
  doc.setFontSize(11);
  doc.setFontType('normal');
  doc.text(50, 650, 'Please make Transfer to OneStep Shipping as soon as you receive this invoice.');

  doc.text(50, 690, 'Thank you & Best regards,');
  doc.text(50, 710, 'OneStep Shipping.');

  window.open(doc.output('bloburl'), '_blank');
}

const uploadToServer = () => {
  return doc.output('blob');
}

export default { preview, uploadToServer };