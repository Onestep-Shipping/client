import React, {useState, useCallback, useRef, useEffect} from 'react';
import ToolTip from 'react-portal-tooltip'
import './Profile.css';
import { useHistory } from 'react-router-dom';
import Header from '../../../components/Header/Header.js';
import FixedSizeList from '../../../components/FixedSizeList/FixedSizeList.js';
import bookingConfirmationPdf from './pdf/booking-confirmation.pdf';
import bolPdf from './pdf/BOL.pdf';
import invoicePdf from './pdf/invoice.pdf';
import { useQuery } from '@apollo/react-hooks';
import GET_ALL_SHIPMENTS from '../../../apollo/queries/GetAllShipments.js';
import moment from 'moment';
import FIND_SCHEDULES from '../../../apollo/queries/FindScheduleQuery.js';
import client from '../../../apollo/index.js';
import DATA from '../../../data/ScheduleFormData.js';
import FileUploadService from '../../../services/FileUploadService.js';

const formatISOString = iso => {
  return moment(iso).utc().format('MM/DD/YYYY');
}

const findValue = (list, label) => {
  return list.filter(item => item.label === label)[0].value;
}

const Profile = () => {
  const history = useHistory();
  const [isTooltipActive, setIsTooltipActive] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(-1);

  const node = useRef();

  const { loading, error, data } = useQuery(GET_ALL_SHIPMENTS);

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
    '#', 'Date Booked', 'From', 'To', 'Booking Status', 'BOL Status', 'Invoice Status'
  ];

  const handleBook = useCallback((status, url) => {
    if (status === "Received" && url !== null) {
      FileUploadService.downloadFile(url)
      .then(res => {
        const file = new Blob([res.data], {type: 'application/pdf'});
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
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
    } else if (status === "Received") {
       window.open(bolPdf, '_blank');
    }
  }, [history]);

  const handleInvoice = useCallback((status) => {
    if (status === "Received") {
      window.open(invoicePdf, '_blank');
    }
  }, []);

  
  const onRollClick = useCallback((id, schedule) => {
    client.query({
      query: FIND_SCHEDULES,
      variables: { 
        routeId: findValue(DATA.FROM_LOCATIONS, schedule.route.startLocation) + 
                  "-" + 
                  findValue(DATA.TO_LOCATIONS, schedule.route.endLocation),
        carrier: schedule.route.carrier,
        startDate: schedule.startDate,
        endDate: schedule.endDate
      }
    }).then(res => {
      const { findSchedules } = res.data;
      history.push({
        pathname: "/rolling/" + id,
        state: { schedule, schedules: findSchedules }
      });
    })
  }, []);

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
          <div className="col-numb">
            <text id={"text" + ind} className="booking-no-button" onClick={() => toggleToolTip(ind)}>
              {ind + 1}
            </text>
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
            <text className="schedule-result-text">{formatISOString(shipment.createdAt)}</text>
          </div>
          <div className="col">
            <text className="schedule-result-text">{shipment.schedule.route.startLocation}</text>
            <text className="schedule-result-text-time">{shipment.schedule.startDate}</text>
          </div>
          <div className="col">
            <text className="schedule-result-text">{shipment.schedule.route.endLocation}</text>
            <text className="schedule-result-text-time">{shipment.schedule.endDate}</text>
          </div>
          <div 
            className="col" 
            onClick={() => handleBook(
              shipment.bookingRequest.status, 
              shipment.bookingRequest.confirmation.pdf
            )}>
            <text
              id={shipment.bookingRequest.status === "Received" ? "red-link" : ""}
              className={"schedule-result-text"}>
                {shipment.bookingRequest.status}
            </text>
          </div>
          <div 
            className="col" 
            onClick={() => handleBol(shipment.billInstruction.status, shipment)}>
            <text 
              id={shipment.billInstruction.status === "Received" ? "red-link" : ""}
              className={"schedule-result-text" + 
                ((shipment.billInstruction.status === "Ready" || 
                  shipment.billInstruction.status === "In Process") ? 
                  "-link" : "")}>
                {shipment.billInstruction.status}
            </text>
          </div>
          <div className="col" onClick={() => handleInvoice(shipment.invoice.status)}>
            <text 
              id={shipment.invoice.status === "Received" ? "red-link" : ""}
              className={"schedule-result-text"}>
                {shipment.invoice.status}
            </text>
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
            data={data.getMyShipments.shipments} 
            row={row}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
