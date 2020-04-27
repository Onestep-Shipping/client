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

    console.log(data.slice(currentPage - 1, 3 + 1))
    if (newPageVal <= max) {
      setCurrentPage(newPageVal);
    }
  }

  const sliceArray = () => {
    const endIndex = currentPage === max ? data.length : (currentPage * LIST_SIZE);
    return data.slice((currentPage - 1) * LIST_SIZE, endIndex);
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
        {
          headers.map((header, ind) => {
            return (
              <div className={"col" + (ind === 0 ? "-numb" : "")} key={ind}>
                <text className="schedule-result-header-text">{header}</text>
              </div>
            );
          })
        }
      </div>
        
      {
        sliceArray().map((booking, ind) => {
          return (
            <div key={ind}>
              {row(booking, ((currentPage - 1) * LIST_SIZE) + ind)}
            </div>
          );
        })
      }

      <div className="page-indicator-container">
        <div onClick={handlePrev} className="indicator-container">
          <text className="indicator-text">{'<< Previous'}</text>
        </div>
        <text>Page {currentPage} / {max}</text>
        <div onClick={handleNext} className="indicator-container">
          <text className="indicator-text">{'Next >>'}</text>
        </div>
      </div>
    </div>
  );
}

export default FixedSizeList;

FixedSizeList.propTypes = {
  headers: PropTypes.array,
  data: PropTypes.array,
  row: PropTypes.element,
};
