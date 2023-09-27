import React, { useState, useEffect } from "react";
import "../Dashboard/Dashboard.css";
import logo from "../Assets/logo.png";
import { Button } from "react-bootstrap";
import percent1 from "../Assets/percent1.png";
import percent2 from "../Assets/percent2.png";
import percent3 from "../Assets/percent3.png";
import percent4 from "../Assets/percent4.png";

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMethod, setSortMethod] = useState("newest");
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    const apiUrl = "http://localhost:5000/api/v1/courses";

    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCustomers(data);
        setTotalEntries(data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter customers by name based on the search term
  const filteredCustomers = customers.filter((customer) =>
    customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort customers based on the selected sorting method
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortMethod === "newest") {
      return b.id - a.id; // Sort by newest (based on ID)
    } else if (sortMethod === "alphabetical") {
      return a.customer_name.localeCompare(b.customer_name); // Sort alphabetically by name
    }
  });

  // Calculate the indexes for the current page
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="dashboard">
      <div className="side-nav-bar">
        <div className="zag-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="reports">
          <div className="reports-icon">
            <svg
              width="22"
              height="12"
              viewBox="0 0 22 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="Vector"
                d="M15.6656 0.85L17.2058 2.29L11.9863 7.17L8.46745 3.88C8.05032 3.49 7.37649 3.49 6.95936 3.88L0.541974 9.89C0.124843 10.28 0.124843 10.91 0.541974 11.3C0.959104 11.69 1.63293 11.69 2.05006 11.3L7.70806 6L11.2269 9.29C11.6441 9.68 12.3179 9.68 12.735 9.29L18.7139 3.71L20.2541 5.15C20.5856 5.46 21.1632 5.24 21.1632 4.8V0.5C21.1739 0.22 20.9386 0 20.6391 0H16.0507C15.5694 0 15.3341 0.54 15.6656 0.85Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="reports-txt">Reports</div>
        </div>
        <div className="workspace">
          <div className="workspace-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Icon / Grid" clip-path="url(#clip0_762_255)">
                <path
                  id="Vector"
                  d="M5 11H8C8.55 11 9 10.55 9 10V6C9 5.45 8.55 5 8 5H5C4.45 5 4 5.45 4 6V10C4 10.55 4.45 11 5 11ZM5 18H8C8.55 18 9 17.55 9 17V13C9 12.45 8.55 12 8 12H5C4.45 12 4 12.45 4 13V17C4 17.55 4.45 18 5 18ZM11 18H14C14.55 18 15 17.55 15 17V13C15 12.45 14.55 12 14 12H11C10.45 12 10 12.45 10 13V17C10 17.55 10.45 18 11 18ZM17 18H20C20.55 18 21 17.55 21 17V13C21 12.45 20.55 12 20 12H17C16.45 12 16 12.45 16 13V17C16 17.55 16.45 18 17 18ZM11 11H14C14.55 11 15 10.55 15 10V6C15 5.45 14.55 5 14 5H11C10.45 5 10 5.45 10 6V10C10 10.55 10.45 11 11 11ZM16 6V10C16 10.55 16.45 11 17 11H20C20.55 11 21 10.55 21 10V6C21 5.45 20.55 5 20 5H17C16.45 5 16 5.45 16 6Z"
                  fill="#1B59F8"
                />
              </g>
              <defs>
                <clipPath id="clip0_762_255">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="workspace-txt">Workspace</div>
        </div>
        <div className="settings">
          <div className="settings-icon">
            <svg
              width="27"
              height="24"
              viewBox="0 0 27 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Icon / Settings">
                <path
                  id="Vector"
                  d="M21.5109 12.98C21.5544 12.66 21.587 12.34 21.587 12C21.587 11.66 21.5544 11.34 21.5109 11.02L23.8044 9.37C24.0109 9.22 24.0653 8.95 23.9349 8.73L21.7609 5.27C21.6305 5.05 21.337 4.97 21.0979 5.05L18.3914 6.05C17.8262 5.65 17.2175 5.32 16.5544 5.07L16.1414 2.42C16.1088 2.18 15.8805 2 15.6088 2H11.2609C10.9892 2 10.7609 2.18 10.7283 2.42L10.3153 5.07C9.65225 5.32 9.04355 5.66 8.47834 6.05L5.77181 5.05C5.52181 4.96 5.23921 5.05 5.10877 5.27L2.93486 8.73C2.79355 8.95 2.85877 9.22 3.06529 9.37L5.35877 11.02C5.31529 11.34 5.28268 11.67 5.28268 12C5.28268 12.33 5.31529 12.66 5.35877 12.98L3.06529 14.63C2.85877 14.78 2.80442 15.05 2.93486 15.27L5.10877 18.73C5.23921 18.95 5.53268 19.03 5.77181 18.95L8.47834 17.95C9.04355 18.35 9.65225 18.68 10.3153 18.93L10.7283 21.58C10.7609 21.82 10.9892 22 11.2609 22H15.6088C15.8805 22 16.1088 21.82 16.1414 21.58L16.5544 18.93C17.2175 18.68 17.8262 18.34 18.3914 17.95L21.0979 18.95C21.3479 19.04 21.6305 18.95 21.7609 18.73L23.9349 15.27C24.0653 15.05 24.0109 14.78 23.8044 14.63L21.5109 12.98ZM13.4349 15.5C11.337 15.5 9.63051 13.93 9.63051 12C9.63051 10.07 11.337 8.5 13.4349 8.5C15.5327 8.5 17.2392 10.07 17.2392 12C17.2392 13.93 15.5327 15.5 13.4349 15.5Z"
                  fill="black"
                />
              </g>
            </svg>
          </div>
          <div className="settings-txt">Settings</div>
        </div>
      </div>
      <div className="right-section">
        <div className="flex flex-col">
          <div className="header">
            <div className="orders-txt">Orders</div>
            <div className="add-order-btn">
              <Button variant="primary" className="add-btn">
                + Add Order
              </Button>
            </div>
          </div>
          <div className="line-1"></div>
        </div>
        <div className="right-top-section">
          <div className="customer-section">
            <div className="customer-txt">All Customers</div>
            <div className="customer-details">
              <div className="cd-1">
                <img src={percent1} />
              </div>
              <div className="cd-2">
                <img src={percent2} />
              </div>
              <div className="cd-3">
                <img src={percent3} />
              </div>
              <div className="cd-4">
                <img src={percent4} />
              </div>
            </div>
            <div className="percent-txt">
              <span>Current Customers</span>
              <span>New Customers</span>
              <span>Target Customers</span>
              <span>Retarget Customers</span>
            </div>
          </div>
          <div className="stats-section">
            <div className="stats-all">
              <div className="stats-txt">Stats Overview</div>
              <span className="bar-txt">Active</span>
              <div className="stat-1">
                <div class="bar1-1">
                  <div class="bar1-2"></div>
                </div>
              </div>
              <span className="bar-percent">63%</span>
              <span className="bar-txt">Inactive</span>
              <div className="stat-1">
                <div class="bar1-1">
                  <div class="bar2-2"></div>
                </div>
              </div>
              <span className="bar-percent">88%</span>
            </div>
          </div>
          <div className="minus-icon"></div>
        </div>
        <div className="main-section">
          <div className="search-and-sort">
            <p className="active-txt">Active Members</p>
            <input
              className="search-input"
              type="text"
              variant="outlined"
              size="sm"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <label>
              Sort by:
              <select
                value={sortMethod}
                onChange={(e) => setSortMethod(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </label>
          </div>
          <table className="table">
            <thead className="row-headings">
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Country</th>
                <th className="status-heading">Status</th>
              </tr>
            </thead>
            <tbody className="t-body">
              {currentCustomers.map((customer) => (
                <tr key={customer.id} className="table-row">
                  <td>{customer.customer_name}</td>
                  <td>{customer.company_name}</td>
                  <td>{customer.phone_number}</td>
                  <td>{customer.email}</td>
                  <td>{customer.country}</td>
                  <td>
                    <span
                      className={
                        customer.status === "active"
                          ? "active-status"
                          : "inactive-status"
                      }
                    >
                      {customer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="main-section-footer">
            <div className="data-info">
              Showing data{" "}
              {Math.min(1 + (currentPage - 1) * customersPerPage, totalEntries)}{" "}
              to {Math.min(currentPage * customersPerPage, totalEntries)} of{" "}
              {totalEntries} entries
            </div>
            <div className="pagination">
              {Array.from(
                { length: Math.ceil(customers.length / customersPerPage) },
                (_, i) => (
                  <button
                    className="page-btn"
                    key={i}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
