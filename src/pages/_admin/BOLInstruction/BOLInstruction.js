import React from 'react';
import './BOLInstruction.css';

import Header from '../../../components/Header/Header.js';
import DATA from '../../../data/ScheduleDetailsData.js';

const BOLInstruction = () => {
  return (
    <div className="homepage-container">
      <Header />
      <div className="bol-instruction-container">
          <ul className="bol-instruction-list"> 
            {DATA.map((schedule, ind) => (
                <li className="bol-instruction-item" key={ind}>HELLO</li>
              )
            )}
          </ul>
        <div className="bol-instruction-detail"> </div>
      </div>
    </div>
  );
};

export default BOLInstruction;
