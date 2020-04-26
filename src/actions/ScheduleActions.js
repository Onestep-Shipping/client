const setFromLocation = (fromLocation) => (
  {
    type: 'SET_FROM_LOCATION',
    payload: { fromLocation }
  }
);

const setFromDate = (fromDate) => (
  {
    type: 'SET_FROM_DATE',
    payload: { fromDate}
  }
);

const setToLocation = (toLocation) => (
  {
    type: 'SET_TO_LOCATION',
    payload: { toLocation }
  }
);

const setToDate = (toDate) => (
  {
    type: 'SET_TO_DATE',
    payload: { toDate }
  }
);

const setCarrier = (carrier) => (
  {
    type: 'SET_CARRIER',
    payload: { carrier }
  }
);

export {
  setFromLocation,
  setFromDate,
  setToLocation,
  setToDate,
  setCarrier
};
