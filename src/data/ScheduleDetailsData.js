const DATA = [
  { 
    startLocation: 'Vancouver, BC | CA',
    startDate: '04/21/2020',
    transshipment: 0,
    vessels: 'YM UPSURGENCE / 043W / PN2',
    endLocation: 'Vung Tau | VN',
    endDate: '04/21/2020',
    transitTime: 35,
    validity: '04/01/2020 - 04/30/2020',
    oceanFreight: 1000,
    docFee: 100,
    adminFee: 100,
    bookedDate: '02/15/2020',
    bookingStatus: 'In Process',
    bolStatus: 'Not Ready',
    invoiceStatus: 'Not Ready',
    carrier: 'Hapag-Lloyd',

  },
  { 
    startLocation: 'Vancouver, BC | CA',
    startDate: '04/21/2020',
    transshipment: 0,
    vessels: 'YM UPSURGENCE / 043W / PN2',
    endLocation: 'Vung Tau | VN',
    endDate: '04/21/2020',
    transitTime: 35,
    validity: '04/01/2020 - 04/30/2020',
    oceanFreight: 1000,
    docFee: 100,
    adminFee: 100,
    bookedDate: '02/15/2020',
    bookingStatus: 'In Process',
    bolStatus: 'Not Ready',
    invoiceStatus: 'Not Ready',
    carrier: 'Hapag-Lloyd',
  },
  { 
    startLocation: 'Vancouver, BC | CA',
    startDate: '04/21/2020',
    transshipment: 0,
    vessels: 'YM UPSURGENCE / 043W / PN2',
    endLocation: 'Vung Tau | VN',
    endDate: '04/21/2020',
    transitTime: 35,
    validity: '04/01/2020 - 04/30/2020',
    oceanFreight: 1000,
    docFee: 100,
    adminFee: 100,
    bookedDate: '02/15/2020',
    bookingStatus: 'Received',
    bolStatus: 'Ready',
    invoiceStatus: 'Not Ready',
    carrier: 'Hapag-Lloyd',
  },
  {
    startLocation: 'Vancouver, BC | CA',
    startDate: '04/21/2020',
    transshipment: 0,
    vessels: 'YM UPSURGENCE / 043W / PN2',
    endLocation: 'Vung Tau | VN',
    endDate: '04/21/2020',
    transitTime: 35,
    validity: '04/01/2020 - 04/30/2020',
    oceanFreight: 2000,
    docFee: 200,
    adminFee: 200,
    bookedDate: '02/15/2020',
    bookingStatus: 'Received',
    bolStatus: 'Ready',
    invoiceStatus: 'Not Ready',
    carrier: 'Hapag-Lloyd',
  },
  {
    startLocation: 'Vancouver, BC | CA',
    startDate: '04/21/2020',
    transshipment: 0,
    vessels: 'YM UPSURGENCE / 043W / PN2',
    endLocation: 'Vung Tau | VN',
    endDate: '04/21/2020',
    transitTime: 35,
    validity: '04/01/2020 - 04/30/2020',
    oceanFreight: 2000,
    docFee: 200,
    adminFee: 200,
    bookedDate: '02/15/2020',
    bookingStatus: 'Received',
    bolStatus: 'In Process',
    invoiceStatus: 'Not Ready',
    carrier: 'Hapag-Lloyd',
  },
  {
    startLocation: 'Vancouver, BC | CA',
    startDate: '04/21/2020',
    transshipment: 0,
    vessels: 'YM UPSURGENCE / 043W / PN2',
    endLocation: 'Vung Tau | VN',
    endDate: '04/21/2020',
    transitTime: 35,
    validity: '04/01/2020 - 04/30/2020',
    oceanFreight: 3000,
    docFee: 300,
    adminFee: 300,
    bookedDate: '02/15/2020',
    bookingStatus: 'Received',
    bolStatus: 'In Process',
    invoiceStatus: 'Not Ready',
    carrier: 'Hapag-Lloyd',
  },
  {
    startLocation: 'Vancouver, BC | CA',
    startDate: '04/21/2020',
    transshipment: 0,
    vessels: 'YM UPSURGENCE / 043W / PN2',
    endLocation: 'Vung Tau | VN',
    endDate: '04/21/2020',
    transitTime: 35,
    validity: '04/01/2020 - 04/30/2020',
    oceanFreight: 4000,
    docFee: 400,
    adminFee: 400,
    bookedDate: '02/15/2020',
    bookingStatus: 'Received',
    bolStatus: 'Received',
    invoiceStatus: 'Not Ready',
    carrier: 'Hapag-Lloyd',
  },
  {
    startLocation: 'Vancouver, BC | CA',
    startDate: '04/21/2020',
    transshipment: 0,
    vessels: 'YM UPSURGENCE / 043W / PN2',
    endLocation: 'Vung Tau | VN',
    endDate: '04/21/2020',
    transitTime: 35,
    validity: '04/01/2020 - 04/30/2020',
    oceanFreight: 4000,
    docFee: 400,
    adminFee: 400,
    bookedDate: '02/15/2020',
    bookingStatus: 'Received',
    bolStatus: 'Received',
    invoiceStatus: 'Not Ready',
    carrier: 'Hapag-Lloyd',
  },
  {
    startLocation: 'Vancouver, BC | CA',
    startDate: '04/21/2020',
    transshipment: 0,
    vessels: 'YM UPSURGENCE / 043W / PN2',
    endLocation: 'Vung Tau | VN',
    endDate: '04/21/2020',
    transitTime: 35,
    validity: '04/01/2020 - 04/30/2020',
    oceanFreight: 5000,
    docFee: 500,
    adminFee: 500,
    bookedDate: '02/15/2020',
    bookingStatus: 'Received',
    bolStatus: 'Received',
    invoiceStatus: 'Received',
    carrier: 'Hapag-Lloyd',
  },
  {
    startLocation: 'Vancouver, BC | CA',
    startDate: '04/21/2020',
    transshipment: 0,
    vessels: 'YM UPSURGENCE / 043W / PN2',
    endLocation: 'Vung Tau | VN',
    endDate: '04/21/2020',
    transitTime: 35,
    validity: '04/01/2020 - 04/30/2020',
    oceanFreight: 5000,
    docFee: 500,
    adminFee: 500,
    bookedDate: '02/15/2020',
    bookingStatus: 'Received',
    bolStatus: 'Received',
    invoiceStatus: 'Received',
    carrier: 'Hapag-Lloyd',
  },
  {
    startLocation: 'Vancouver, BC | CA',
    startDate: '04/21/2020',
    transshipment: 0,
    vessels: 'YM UPSURGENCE / 043W / PN2',
    endLocation: 'Vung Tau | VN',
    endDate: '04/21/2020',
    transitTime: 35,
    validity: '04/01/2020 - 04/30/2020',
    oceanFreight: 5000,
    docFee: 500,
    adminFee: 500,
    bookedDate: '02/15/2020',
    bookingStatus: 'Received',
    bolStatus: 'Received',
    invoiceStatus: 'Received',
    carrier: 'Hapag-Lloyd',
  },
  {
    startLocation: 'Vancouver, BC | CA',
    startDate: '04/21/2020',
    transshipment: 0,
    vessels: 'YM UPSURGENCE / 043W / PN2',
    endLocation: 'Vung Tau | VN',
    endDate: '04/21/2020',
    transitTime: 35,
    validity: '04/01/2020 - 04/30/2020',
    oceanFreight: 5000,
    docFee: 500,
    adminFee: 500,
    bookedDate: '02/15/2020',
    bookingStatus: 'Received',
    bolStatus: 'Received',
    invoiceStatus: 'Received',
    carrier: 'Hapag-Lloyd',
  },
  {
    startLocation: 'Vancouver, BC | CA',
    startDate: '04/21/2020',
    transshipment: 0,
    vessels: 'YM UPSURGENCE / 043W / PN2',
    endLocation: 'Vung Tau | VN',
    endDate: '04/21/2020',
    transitTime: 35,
    validity: '04/01/2020 - 04/30/2020',
    oceanFreight: 5000,
    docFee: 500,
    adminFee: 500,
    bookedDate: '02/15/2020',
    bookingStatus: 'Received',
    bolStatus: 'Received',
    invoiceStatus: 'Received',
    carrier: 'Hapag-Lloyd',
  },
  {
    startLocation: 'Vancouver, BC | CA',
    startDate: '04/21/2020',
    transshipment: 0,
    vessels: 'YM UPSURGENCE / 043W / PN2',
    endLocation: 'Vung Tau | VN',
    endDate: '04/21/2020',
    transitTime: 35,
    validity: '04/01/2020 - 04/30/2020',
    oceanFreight: 5000,
    docFee: 500,
    adminFee: 500,
    bookedDate: '02/15/2020',
    bookingStatus: 'Received',
    bolStatus: 'Received',
    invoiceStatus: 'Received',
    carrier: 'Hapag-Lloyd',
  },
  {
    startLocation: 'Vancouver, BC | CA',
    startDate: '04/21/2020',
    transshipment: 0,
    vessels: 'YM UPSURGENCE / 043W / PN2',
    endLocation: 'Vung Tau | VN',
    endDate: '04/21/2020',
    transitTime: 35,
    validity: '04/01/2020 - 04/30/2020',
    oceanFreight: 5000,
    docFee: 500,
    adminFee: 500,
    bookedDate: '02/15/2020',
    bookingStatus: 'Received',
    bolStatus: 'Received',
    invoiceStatus: 'Received',
    carrier: 'Hapag-Lloyd',
  },
  {
    startLocation: 'Vancouver, BC | CA',
    startDate: '04/21/2020',
    transshipment: 0,
    vessels: 'YM UPSURGENCE / 043W / PN2',
    endLocation: 'Vung Tau | VN',
    endDate: '04/21/2020',
    transitTime: 35,
    validity: '04/01/2020 - 04/30/2020',
    oceanFreight: 5000,
    docFee: 500,
    adminFee: 500,
    bookedDate: '02/15/2020',
    bookingStatus: 'Received',
    bolStatus: 'Received',
    invoiceStatus: 'Received',
    carrier: 'Hapag-Lloyd',
  },
  {
    startLocation: 'Vancouver, BC | CA',
    startDate: '04/21/2020',
    transshipment: 0,
    vessels: 'YM UPSURGENCE / 043W / PN2',
    endLocation: 'Vung Tau | VN',
    endDate: '04/21/2020',
    transitTime: 35,
    validity: '04/01/2020 - 04/30/2020',
    oceanFreight: 5000,
    docFee: 500,
    adminFee: 500,
    bookedDate: '02/15/2020',
    bookingStatus: 'Received',
    bolStatus: 'Received',
    invoiceStatus: 'Received',
    carrier: 'Hapag-Lloyd',
  },
  {
    startLocation: 'Vancouver, BC | CA',
    startDate: '04/21/2020',
    transshipment: 0,
    vessels: 'YM UPSURGENCE / 043W / PN2',
    endLocation: 'Vung Tau | VN',
    endDate: '04/21/2020',
    transitTime: 35,
    validity: '04/01/2020 - 04/30/2020',
    oceanFreight: 5000,
    docFee: 500,
    adminFee: 500,
    bookedDate: '02/15/2020',
    bookingStatus: 'Received',
    bolStatus: 'Received',
    invoiceStatus: 'Received',
    carrier: 'Hapag-Lloyd',
  },
];

export default DATA;
