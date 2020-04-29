import jsPDF from 'jspdf';

let doc = new jsPDF("p", "pt", "a4");

const centeredText = (text, y) => {
    let textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    let textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(textOffset, y, text);
}


const pdfGenerator = () => {
    doc.setFontSize(18);
    doc.setFont('helvetica');
    doc.setFontType('bold');
    doc.text(50, 75, 'Booking Confirmation');

    doc.setFontSize(11);
    doc.setFontType('normal');
    doc.text(50, 110, 'OneStep Shipping Inc.');
    doc.line(50, 113, 170, 113);

    doc.setFontSize(10);
    doc.setFont('courier');
    doc.text(50, 125, '8237 MONTCALM STREET');
    doc.text(50, 140, 'VANCOUVER, BC');
    doc.text(50, 155, 'CANADA');
    doc.text(50, 170, 'V6P 4P4');

    doc.setFontSize(10);
    doc.setFontType('bold');
    doc.text(300, 68, 'On reply please quote');
    doc.text(300, 83, 'Our Reference:');
    doc.text(444, 85, '671-070-005-0002');
    doc.setFontType('normal');
    doc.text(300, 100, 'Document-No.     :             203095177');
    doc.text(300, 115, 'At your service  :             Rose Phan');
    doc.text(477, 115, '');
    doc.text(300, 130, 'Phone            :   +1 (604) 369 - 9123');
    doc.text(300, 145, 'Telefax          :   +1 (604) 369 - 9123');
    doc.text(300, 160, 'Email            :  rosephan99@gmail.com');
    doc.text(300, 175, 'Vancouver,                 23 April 2020');

    doc.text(50, 220, 'ETS: 09 May 2020');
    doc.text(50, 235, 'from:');
    doc.text(50, 250, 'Voyage No:');

    doc.text(180, 220, 'ETA: 29 May 2020');
    doc.text(180, 235, 'Seattle');
    doc.text(180, 250, '115W');

    doc.text(350, 220, 'by');
    doc.text(350, 235, 'to:');

    doc.text(400, 220, 'OOCL VANCOUVER');
    doc.text(400, 235, 'Xingang');

    doc.setFontSize(9);
    doc.setFontType('bold');
    doc.text(50, 290, 'Terminal / Full Return');
    doc.text(280, 290, 'Depot / Empty Pick-up');

    doc.setFontType('normal');
    doc.text(50, 305, 'SSA Terminal Seattle');
    doc.text(50, 320, 'Terminal 30');
    doc.text(50, 335, '2431 E Marginal Way South');

    doc.text(280, 305, 'SSA Terminal Seattle');
    doc.text(280, 320, 'Terminal 30');
    doc.text(280, 335, '2431 E Marginal Way South');

    doc.setFontSize(10);
    doc.text(50, 380, 'Content');
    doc.text(300, 380, 'gr.weight (KGS)');
    doc.line(50, 382, 535, 382);

    doc.setFontSize(11);
    doc.text(50, 397, 'PAPER IN ROLLS');
    doc.text(300, 397, '50000.0');

    doc.setFontSize(10);
    doc.text(50, 440, 'Qty.');
    doc.text(300, 440, 'Container');
    doc.line(50, 432, 535, 432);

    doc.setFontSize(11);
    doc.setFontType('bold');
    doc.text(50, 457, '2');
    doc.text(300, 457, '40\'/9\'6" High Cube [45G0]');

    doc.setFontType('normal');
    doc.text(50, 500, 'Remarks:');

    doc.text(50, 530, 'Carrier Booking Number     :  2637422850');
    doc.text(50, 547, 'Steam Ship Line            :  OOCL - Orient Overseas Container Line');
    doc.text(50, 564, 'Steam Ship Lune Voyage No  :  115W');
    doc.text(50, 581, 'Cargo Cut (Date/Time)      :  06. May 2020 04:00PM');
    doc.text(50, 598, 'Document Cut (Date/Time)   :  03. May 2020 12:00PM');
    doc.text(50, 615, 'VGM Cut (Date/Time)        :  03. May 2020 12:00PM');

    doc.text(50, 655, 'Note:');
    doc.text(50, 670, 'Dates may change, trucker responsible to confirm earliest return date with');
    doc.text(50, 685, 'terminal prior to pickup and return. Please note, VGM details must be');
    doc.text(50, 700, 'submitted by VGM cut date/time or shipment will be subject to all');
    doc.text(50, 715, 'applicable fees.');

    doc.text(50, 750, 'With kind regards,');
    doc.text(50, 780, 'OneStep Shipping Inc, Vancouver');
    doc.text(50, 795, 'Rose Phan');
    
    // Save the Data
    doc.output('dataurlnewwindow');
}

export default pdfGenerator;