import { CARRIERS } from '../data/ScheduleFormData.js'; 

const INITIAL_STATE = {
  fromLocation: '',
  fromDate: new Date(),
  toLocation: '',
  toDate: new Date(),
  carrier: CARRIERS[0],
};

const scheduleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_FROM_LOCATION': {
      return Object.assign({}, state, {
        ...state,
        fromLocation: action.payload.fromLocation
      });
    }
    case 'SET_FROM_DATE': {
      return Object.assign({}, state, {
        ...state,
        fromDate: action.payload.fromDate
      });
    }
    case 'SET_TO_LOCATION': {
      return Object.assign({}, state, {
        ...state,
        toLocation: action.payload.toLocation
      });
    }
    case 'SET_TO_DATE': {
      return Object.assign({}, state, {
        ...state,
        toDate: action.payload.toDate
      });
    }
    case 'SET_CARRIER': {
      return Object.assign({}, state, {
        ...state,
        carrier: action.payload.carrier
      });
    }
    default:
      return state;
  }
};

export default scheduleReducer;
