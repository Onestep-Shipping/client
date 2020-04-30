import jsPDF from 'jspdf';

let doc = new jsPDF("p", "pt", 'letter');

const centeredText = (text, y) => {
    let textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    let textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(textOffset, y, text);
}

const pdfGenerator = info => {
  doc.setFont('helvatica');
  doc.setFontSize(16);
  doc.setFontType('bolditalic');
  doc.text(430, 60, "OneStep Shipping");

  doc.setFont('courier');
  doc.setFontSize(20);
  doc.setFontType('bold');
  centeredText('Booking Confirmation', 100);

  doc.setFontSize(12);
  doc.setFontType('normal');
  doc.text(50, 140, "TO: " + info.company.name);
  doc.text(50, 158, "    " + info.company.address.line1);
  doc.text(50, 173, "    " + info.company.address.line2);
  doc.text(50, 188, "    " + info.company.address.line3);

  doc.setFontSize(10);
  doc.text(310, 130, "Our Reference No.:                1234567");
  doc.text(310, 145, "Contact          :              Rose Phan");
  doc.text(310, 160, "Tel              :      +1 (604) 500-4934");
  doc.text(310, 175, "Email            :   rosephan99@gmail.com");
  doc.text(310, 190, "Issue Date       :             05/01/2020");

  doc.line(50, 200, 560, 200);

  doc.setFontSize(11);
  doc.text(80, 230, "From: " + info.schedule.from);
  doc.text(350, 230, "To: " + info.schedule.to);

  doc.text(80, 250, "ETD: " + info.schedule.fromDate);
  doc.text(350, 250, "ETA: " + info.schedule.toDate);

  doc.text(80, 290, "Commodity: " + info.booking.commodity);

  doc.text(350, 290, "Q'ty");
  doc.text(420, 290, "Container Type");

  info.booking.container.map((row, i) => {
    doc.text(350, 307 + (i * 17), "" + row.quantity);
    doc.text(420, 307 + (i * 17), row.containerType);
  })

  doc.setFontSize(12);
  doc.setFontType('bold');
  doc.text(80, 330, "Booking No.: " + info.bookingNo);

  doc.setFontSize(11);
  doc.setFontType('normal');
  doc.text(80, 360, "Carrier Name: Hapag-Lloyd");

  doc.text(80, 400, "Terminal Cut-off  : " + info.terminalDate);
  doc.text(80, 420, "Document Cut-off  : " + info.docDate);
  doc.text(80, 440, "VGM Cut-off       : " + info.vgmDate);

  doc.setFontSize(12);
  doc.setFontType('bold');
  doc.text(80, 480, "Empty Pickup Location");
  doc.text(350, 480, "Return Location");

  doc.setFontType('normal');
  doc.setFontSize(10);
  doc.text(80, 500, info.pickupLine1);
  doc.text(350, 500, info.returnLine1);

  doc.text(80, 520, info.pickupLine2);
  doc.text(350, 520, info.returnLine2);

  doc.text(80, 535, info.pickupLine3);
  doc.text(350, 535, info.returnLine3);

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

export default pdfGenerator;