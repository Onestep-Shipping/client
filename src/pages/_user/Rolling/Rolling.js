import './Rolling.css';

import React, { useCallback } from 'react';
import {useHistory, useParams} from 'react-router-dom';

import BookingDisplay from '../../../components/BookingDisplay/BookingDisplay.js';
import Header from '../../../components/Header/Header.js';
import PropTypes from 'prop-types';
import { ROLL_SHIPMENT } from '../../../apollo/mutations/EditShipmentMutation.js';
import ScheduleResultList from '../../../components/ScheduleResultList/ScheduleResultList.js';
import client from '../../../apollo/index.js';

const Rolling = props => {
  const { id } = useParams();
  const history = useHistory();
  const { schedule, schedules } = props.location.state;

  const handleAccept = useCallback(async (newSchedule) => {
    client.mutate({
      mutation: ROLL_SHIPMENT,
      variables: { 
        shipmentId: id,
        newScheduleId: newSchedule._id
      }
    }).then(res => {
      const { rollShipment } = res.data;
      if (rollShipment === "OK") {
        alert("Successfully changed schedule!");
        history.push('/profile');
      } else {
        alert("Some errors have occured. Please try again!");
      }
    })
  }, [history, id]);

  return (
    <div className="homepage-container">
      <Header />
      <div className="body-container2">
        <h1>Current Schedule</h1>
        <BookingDisplay schedule={schedule} fields={5}/>
        <ScheduleResultList 
          action={handleAccept} scheduleList={schedules} remove={schedule}
        />
      </div>
    </div>
  );
};

export default Rolling;

Rolling.propTypes = {
  location: PropTypes.object,
};