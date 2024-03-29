import './Profile.css';

import React, {useCallback, useEffect, useRef, useState} from 'react';

import DATA from '../../../data/ScheduleFormData.js';
import FIND_SCHEDULES from '../../../apollo/queries/FindScheduleQuery.js';
import FileUploadService from '../../../services/FileUploadService.js';
import FixedSizeList from '../../../components/FixedSizeList/FixedSizeList.js';
import GET_ALL_SHIPMENTS from '../../../apollo/queries/GetAllShipments.js';
import Header from '../../../components/Header/Header.js';
import ToolTip from 'react-portal-tooltip'
import Utils from '../../../utils/Helpers.js';
import client from '../../../apollo/index.js';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

const Profile = () => {
  const history = useHistory();
  const [isTooltipActive, setIsTooltipActive] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(-1);

  const node = useRef();

  const { loading, error, data } = useQuery(GET_ALL_SHIPMENTS, {
    fetchPolicy: 'cache-and-network'
  });

  const measuredRef = useCallback((e) => {
    if (node.current && !node.current.contains(e.target)) {
      setIsTooltipActive(false); 
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', measuredRef);

    return () => {
      document.removeEventListener('mousedown', measuredRef);
    };
  }, [measuredRef]);

  const toggleToolTip = ind => { 
    setCurrentBooking(ind);
    setIsTooltipActive(true); 
  }

  const PROFILE_HEADERS = [
    'Booking No.', 'From', 'To', 'Booking Status', 'BOL Status', 'Invoice Status'
  ];

  const handleBook = useCallback((status, url) => {
    if (status === "Received" && url !== null) {
      FileUploadService.downloadFile(url)
      .then(res => Utils.openPdf(res.data))
      .catch(e => {
        console.log(e);
      });
    }
  }, []);

  const handleBol = useCallback((status, shipment) => {
    if (status === "Ready" ||  (status === "In Process")) {
      history.push({
      pathname: '/form/bill-of-lading-instruction/' + shipment._id,
      state: { schedule: shipment.schedule }
    });
    } else if (status === "Received" && shipment.billInstruction.pdf !== null) {
      FileUploadService.downloadFile(shipment.billInstruction.pdf)
        .then(res => Utils.openPdf(res.data))
        .catch(e => {
          console.log(e);
        });
    }
  }, [history]);

  const handleInvoice = useCallback((invoice) => {
    const { status, pdf } = invoice;
    if (status === "Ready" && pdf !== null) {
      FileUploadService.downloadFile(pdf)
        .then(res => Utils.openPdf(res.data))
        .catch(e => {
          console.log(e);
        });
    }
  }, []);
  
  const onRollClick = useCallback((id, schedule) => {
    client.query({
      query: FIND_SCHEDULES,
      variables: { 
        routeId: Utils.findValue(DATA.FROM_LOCATIONS, schedule.route.startLocation) + 
                  "-" + 
                  Utils.findValue(DATA.TO_LOCATIONS, schedule.route.endLocation),
        carrier: schedule.route.carrier,
        startDate: schedule.startDate,
        endDate: schedule.endDate
      },
      refetchQueries: [{ query: GET_ALL_SHIPMENTS }]
    }).then(res => {
      const { findSchedules } = res.data;
      history.push({
        pathname: "/rolling/" + id,
        state: { schedule, schedules: findSchedules }
      });
    })
  }, [history]);

  const onCancelClick = () => {
    const message = 'Are you sure you want to cancel booking request #' + currentBooking + '?';
    if (window.confirm(message)) {
      console.log("Remove!");
    }
  }

  const row = (shipment, ind) => {
    return (
      <div key={ind}>
        <div className='booking-profile-row'>
          <div className="col">
            <span id={"text" + ind} className="booking-no-button" onClick={() => toggleToolTip(ind)}>
              {shipment.bookingRequest.status === "In Process" ? 
              "N/A" : shipment.bookingRequest.confirmation.bookingNo}
            </span>
            <ToolTip 
              tooltipTimeout={0} active={isTooltipActive} 
              position="top" arrow="center" parent={"#text" + currentBooking}>
                <div ref={node} className="tiptool-container">
                  <button 
                    className="tooltip-button" 
                    onClick={() => onRollClick(shipment._id, shipment.schedule)}
                  >
                    Roll
                  </button>
                  <button className="tooltip-button" onClick={onCancelClick}>Cancel</button>
                </div>
            </ToolTip>
          </div>
          <div className="col">
            <span className="schedule-result-text">{shipment.schedule.route.startLocation}</span>
            <span className="schedule-result-text-time">
              {Utils.formatISOString(shipment.schedule.startDate)}
            </span>
          </div>
          <div className="col">
            <span className="schedule-result-text">{shipment.schedule.route.endLocation}</span>
            <span className="schedule-result-text-time">
              {Utils.formatISOString(shipment.schedule.endDate)}
            </span>
          </div>
          <div 
            className="col" 
            onClick={() => handleBook(
              shipment.bookingRequest.status, 
              shipment.bookingRequest.confirmation.pdf
            )}>
            <span
              id={shipment.bookingRequest.status === "Received" ? "red-link" : ""}
              className={"schedule-result-text"}>
                {shipment.bookingRequest.status}
            </span>
          </div>
          <div 
            className="col" 
            onClick={() => handleBol(shipment.billInstruction.status, shipment)}>
            <span 
              id={shipment.billInstruction.status === "Received" ? "red-link" : ""}
              className={"schedule-result-text" + 
                ((shipment.billInstruction.status === "Ready" || 
                  shipment.billInstruction.status === "In Process") ? 
                  "-link" : "")}>
                {shipment.billInstruction.status}
            </span>
          </div>
          <div className="col" onClick={() => handleInvoice(shipment.invoice)}>
            <span 
              id={shipment.invoice.status === "Received" ? "red-link" : ""}
              className={"schedule-result-text" + 
                ((shipment.invoice.status === "Ready") ? 
                  "-link" : "")}>
                {shipment.invoice.status}
            </span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="homepage-container">
      <Header />
      <div className="body-container2">
        <div className="profile-container">
          <FixedSizeList 
            headers={PROFILE_HEADERS} 
            data={data.getMyShipments} 
            row={row}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
