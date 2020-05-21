import './QuoteUpdate.css';

import { QuoteForm, QuoteRow } from './Helpers';
import React, { useContext, useState } from 'react';

import ADD_QUOTE from '../../../apollo/mutations/AddQuoteMutation.js';
import { CONTAINER_TYPES } from '../../../constants/ServiceFormConstants';
import GET_QUOTE_HISTORY from '../../../apollo/queries/GetQuoteHistoryQuery.js';
import Header from '../../../components/Header/Header.js';
import ScheduleForm from '../../../components/ScheduleForm/ScheduleForm.js';
import { ScheduleFormContext } from "../../../context/ScheduleFormContext.js";
import { Textarea } from '../../../components/ServiceForm/Helpers.js';
import Utils from '../../../utils/Helpers.js';
import arrowDownIcon from '../../../assets/arrow-down.svg';
import client from '../../../apollo/index.js';
import moment from 'moment';
import styles from '../../../components/ScheduleForm/ScheduleFormMin.module.css';

const QuoteUpdate = () => {
  const [history, setHistory] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setIndex] = useState(-1);
  const [isOverlapped, setIsOverLapped] = useState(false);

  const { schedule } = useContext(ScheduleFormContext);

  const scheduleVariables = { 
    routeId: schedule.fromLocation.value + "-" + schedule.toLocation.value,
    carrier: schedule.carrier,
    startDate: Utils.convertDateToISO(schedule.fromDate),
    endDate: Utils.convertDateToISO(schedule.toDate)
  }

  const handleFindQuoteHistory = () => {
    client.query({
      query: GET_QUOTE_HISTORY,
      variables: scheduleVariables
    }).then(res => {
      const { getQuoteHistory } = res.data;
      setHistory(getQuoteHistory);
      setIsOverLapped(false);
      getQuoteHistory.map(quote => {
        if (isDateRangeOverlapped(quote.validity)) { 
          setIsOverLapped(true); 
        }
      })
      setIsVisible(true);
    })
  }

  const isDateRangeOverlapped = (validity) => {
    return schedule.fromDate <= moment(validity.endDate) && 
           schedule.toDate >= moment(validity.startDate);
  }

  const handleQuoteUpdate = e => {
    e.preventDefault();
    const quote = createQuoteFromForm(e.target);
    console.log(quote);
    client.mutate({
      mutation: ADD_QUOTE,
      variables: { 
        routeId: schedule.fromLocation.value + "-" + schedule.toLocation.value,
        carrier: schedule.carrier,
        quote
      },
      awaitRefetchQueries: true,
      refetchQueries: [{
        query: GET_QUOTE_HISTORY,
        variables: scheduleVariables,
      }],
    }).then(res => {
      const { addQuoteToSchedules } = res.data;
      if (addQuoteToSchedules === "OK") {
        setIsVisible(false);
        alert("Quote added!");
      }
    })
  }

  const createQuoteFromForm = form => {
    const { 
      buyingOceanFreight, buyingDocFee, buyingAdminFee,
      sellingOceanFreight, sellingDocFee, sellingAdminFee,
      except
    } = form;

    const buyingOceanFreightPrices = Utils.getValuesOfNodeList(buyingOceanFreight);
    const sellingOceanFreightPrices = Utils.getValuesOfNodeList(sellingOceanFreight);

    const buyingOceanFreights = [];
    const sellingOceanFreights = [];

    CONTAINER_TYPES.map((type, ind) => {
      buyingOceanFreights.push({ 
        containerType: type, price: parseFloat(buyingOceanFreightPrices[ind]) 
      });
      sellingOceanFreights.push({ 
        containerType: type, price: parseFloat(sellingOceanFreightPrices[ind]) 
      });
    })

    return {
      validity: {
        startDate: Utils.convertDateToISO(schedule.fromDate),
        endDate: Utils.convertDateToISO(schedule.toDate)
      },
      buying: {
        oceanFreight: buyingOceanFreights,
        docFee: parseFloat(buyingDocFee.value),
        adminFee: parseFloat(buyingAdminFee.value)
      },
      selling: {
        oceanFreight: sellingOceanFreights,
        docFee: parseFloat(sellingDocFee.value),
        adminFee: parseFloat(sellingAdminFee.value)
      },
      except: except.value
    };
  }

  return (
    <div className="homepage-container">
      <Header />
      <div className="bol-instruction-container">
        <ul className="quote-history-list">
          {history.length > 0 ?
          history.map((item, ind) => 
            (<div key={ind}>
              <li id="selected-item" className="bol-instruction-item"
                  onClick={() => setIndex(ind === currentIndex ? -1 : ind)}>
                  <text>
                    {moment(item.validity.startDate).format("YYYY | MMM DD")
                    } - {moment(item.validity.endDate).format("MMM DD")}
                  </text>
                  <img id={ind === currentIndex ? "svg-reverse" : ""}
                    className="svg-arrow" src={arrowDownIcon} alt="Dropdown Icon" />
              </li>
              {ind === currentIndex &&
              <div>
                <QuoteRow header="Buying" obj={history[currentIndex].buying} />
                <QuoteRow header="Selling" obj={history[currentIndex].selling} />
                <div className="finance-display-form">
                  Note: FAK Rates (Except {history[currentIndex].except || "Nothing"})
                </div>
              </div>}
            </div>
            )
          ) : <div className="history-text">No history.</div>}
        </ul>
        <div className="quote-update-detail"> 
          <div className="booking-id-container">
            <h1>Quote Update</h1>
          </div>
          <div className="finance-display-form">
            <ScheduleForm styles={styles} onSubmit={handleFindQuoteHistory}/>
          </div>
          {isOverlapped &&
            <text className="schedule-result-text-link">
              Validity is overlapped with history.
            </text>
          }
          {isVisible && !isOverlapped &&
          <form className="finance-display-form" onSubmit={handleQuoteUpdate}>
            <div className="finance-display-container">
              <QuoteForm header="Buying" />
              <QuoteForm header="Selling" />
            </div>
            <div>
              <Textarea name="Except" key={currentIndex}/>
              <text></text>
            </div>
            <button className="result-button">Update</button>
          </form>}
        </div>
      </div>
    </div>
  );
};

export default QuoteUpdate;
