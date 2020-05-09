import React, {useState} from 'react';
import './FixedSizeList.css';
import PropTypes from 'prop-types';

const LIST_SIZE = 5;

const FixedSizeList = (props) => {
  const { headers, data, row } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const max = Math.ceil(data.length / LIST_SIZE);

  const handleNext = () => {
    const newPageVal = currentPage + 1;
    if (newPageVal <= max) {
      setCurrentPage(newPageVal);
    }
  }

  const sliceArray = () => {
    if (data.length >= LIST_SIZE) {
      const endIndex = currentPage === max ? data.length : (currentPage * LIST_SIZE);
      return data.slice((currentPage - 1) * LIST_SIZE, endIndex);
    }
    console.log(data);
    return data;
  }

  const handlePrev = () => {
    const newPageVal = currentPage - 1;
    if (newPageVal > 0) {
      setCurrentPage(newPageVal);
    }
  }

  return (
    <div>
      <div className="schedule-result-header-row">
        {headers.map((header, ind) => 
          <div className={"col" + (ind === 0 ? "-numb" : "")} key={ind}>
            <text className="schedule-result-header-text">{header.toUpperCase()}</text>
          </div>
        )}
      </div>
      {sliceArray().length < 1 ?
        <div className="empty-placeholder">NO RESULTS</div> 
        :
        sliceArray().map((booking, ind) => 
        <div key={ind}>
          {row(booking, ((currentPage - 1) * LIST_SIZE) + ind)}
        </div>
      )}
      {data.length > LIST_SIZE &&
      <div className="page-indicator-container">
        <button className="result-button" onClick={handlePrev}>{'<< Previous'}</button>
        <text>Page {currentPage} / {max === 0 ? 1 : max}</text>
        <button className="result-button" onClick={handleNext}>{'Next >>'}</button>
      </div>}
    </div>
  );
}

export default FixedSizeList;

FixedSizeList.propTypes = {
  headers: PropTypes.array,
  data: PropTypes.array,
  row: PropTypes.element,
};
