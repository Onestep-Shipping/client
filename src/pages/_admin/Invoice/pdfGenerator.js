import jsPDF from 'jspdf';
import moment from 'moment';

const doc = new jsPDF("p", "pt", 'letter');

const centeredText = (text, y) => {
    let textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    let textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(textOffset, y, text);
}

const pdfGenerator = info => {
  doc.setProperties({
    title: 'Invoice for Booking #' + info.bookingNo,
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
  doc.text(50, 148, "    " + info.company.address.line1);
  doc.text(50, 163, "    " + info.company.address.line2);
  doc.text(50, 178, "    " + info.company.address.line3);

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
  doc.text(80, 260, "From: " + info.schedule.from);
  doc.text(350, 260, "To: " + info.schedule.to);

  doc.text(80, 280, "ETD: " + info.schedule.fromDate);
  doc.text(350, 280, "ETA: " + info.schedule.toDate);

  doc.text(80, 320, "Commodity: " + info.booking.commodity);
  doc.text(350, 320, "Order Number: " + info.orderNo);

  doc.setFontType('bold');
  doc.text(80, 360, "Description");
  doc.text(200, 360, "Q'ty");
  doc.text(280, 360, "Container");
  doc.text(405, 360, "Price");
  doc.text(500, 360, "Total");

  doc.setFontType('normal');

  info.priceList.map((row, i) => {
    const height = 377 + (i * 17);
    if (i < info.priceList.length - 2) {
      doc.text(80, height, "Ocean Freight");
      doc.text(200, height, "" + info.booking.container[i].quantity);
      doc.text(280, height, info.booking.container[i].containerType);
    } else if (i === info.priceList.length - 2) {
      doc.text(80, height, "Document");
      doc.text(200, height, "1");
    } else {
      doc.text(80, height, "Administration");
      doc.text(200, height, "1");
      doc.line(280, height + 10, 560, height + 10);
      doc.text(280, height + 24, "Sub Total: ");
      doc.text(405, height + 24, "$" + info.subTotal);
    }
    doc.text(405, height, "$" + row.price);
    doc.text(500, height, "$" + row.total);
  })

  doc.setFontSize(12);
  doc.setFontType('bold');
  doc.text(80, 530, "Our Bank Information - RBC Bank");

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

  return doc.output('blob');
}

export default pdfGenerator;