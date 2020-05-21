import './Companies.css';

import React, { useState } from 'react';

import COMPANIES from '../../../data/CompanyList.js';
import COUNTRIES from '../../../data/CountryList.js';
import GET_ALL_COMPANIES from '../../../apollo/queries/GetAllCompaniesQuery.js';
import Header from '../../../components/Header/Header.js';
import SearchTextfield from '../../../components/SearchTextfield/SearchTextfield.js';
import Utils from '../../../utils/Helpers.js';
import moment from 'moment';
import { useQuery } from '@apollo/react-hooks';

const DURATION = ["All", "Last 3 days", "This week", "This month", "This year"]; 
const COMPANY_HEADERS = ["Company", "Orders", "Contact", "Email", "Created"];
const ORDERS = ["All", "≤ 10", "> 10", "> 50", "> 100", "> 1000"];

const Companies = () => {
  const { loading, error, data } = useQuery(GET_ALL_COMPANIES, {
    fetchPolicy: 'cache-and-network'
  });

  const [registerRange, setRegisterRange] = useState(0);
  const [country, setCountry] = useState(0);
  const [orders, setOrders] = useState(0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleRegisterRangeChange = e => {
    setRegisterRange(e.target.selectedIndex);
  }

  const handleCountryChange = e => {
    setCountry(e.target.selectedIndex);
  }

  const handleOrderChange = e => {
    setOrders(e.target.selectedIndex);
  }

  const filterOrders = n => {
    switch (orders) {
      case 1: return n <= 10
      case 2: return n > 10
      case 3: return n > 50
      case 4: return n > 100
      default: return true
    }
  }

  const filterDateCreated = date => {
    switch (registerRange) {
      case 1: return date >= moment().subtract(3, 'days')
      case 2: return date >=moment().subtract(1, 'weeks')
      case 3: return date >=moment().subtract(1, 'months')
      case 4: return date >=moment().subtract(1, 'years')
      default: return true
    }
  }

  const fileredList = () => {
    const list = data.getAllCompanies || [];
    return list.filter(company => 
      filterDateCreated(new Date(company.updatedAt)) &&
      (country === 0 ? true : company.address.country === COUNTRIES[country]) &&
      filterOrders(company.shipments.length)
    );
  }

  fileredList();
  
  return (
    <div className="homepage-container">
      <Header />
      <div className="company-all-container">
        <div className="company-header">
          <text className="customer-number">Companies ({COMPANIES.length})</text>
          <select className="duration-selector" onChange={handleRegisterRangeChange}>
            {DURATION.map((opt, ind) => 
              (<option value={opt} key={ind}>{opt}</option>)
            )}
          </select>
          <SearchTextfield placeholder="Search Companies"/>
        </div>
        <div className="company-body-container">
          <div className="filter-container">
            <text className="info-label">Filter:</text>
            <div className="filter-box-container">
              <text className="filter-text">Country</text>
              <select className="duration-selector" onChange={handleCountryChange}>
                {COUNTRIES.map((opt, ind) => 
                  (<option value={opt} key={ind}>{opt}</option>)
                )}
              </select>
            </div>
            <div className="filter-box-container">
              <text className="filter-text"># of Orders</text>
              <select className="duration-selector" onChange={handleOrderChange}>
                {ORDERS.map((opt, ind) => 
                  (<option value={opt} key={ind}>{opt}</option>)
                )}
              </select>
            </div>
          </div>
          <ul className="company-list-container">
            <li className="company-row" id="company-header-row">
              <div className="col-numb">
                <text className="company-list-header-text">#</text>
              </div>
              {COMPANY_HEADERS.map((header, ind) => 
                <div className={ind === 1 ? "col-numb" : "company-col"} key={ind}>
                  <text className="company-list-header-text">{header.toUpperCase()}</text>
                </div>
              )}
            </li>
            {fileredList().map((company, ind) => 
              <li className="company-row" key={ind}>
                <div className="col-numb">
                  <text className="company-item-text">{ind + 1}</text>
                </div>
                <div className="company-col">
                  <text className="company-item-text">{company.name}</text>
                </div>
                <div className="col-numb">
                  <text className="company-item-text">{company.shipments.length}</text>
                </div>
                <div className="company-col">
                  <text className="company-item-text">{company.personInCharge.name}</text>
                </div>
                <div className="company-col">
                  <text className="company-item-text">{company.email}</text>
                </div>
                <div className="company-col">
                  <text className="company-item-text">
                    {Utils.formatISOString(company.createdAt)}
                  </text>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Companies;
