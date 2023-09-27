import React, { useState, useEffect } from 'react';

function App() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMethod, setSortMethod] = useState('newest'); // Default sorting method

  useEffect(() => {
    // Replace 'your_api_endpoint_here' with your actual API endpoint URL
    const apiUrl = 'http://localhost:5000/api/v1/courses';

    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
    if (sortMethod === 'newest') {
      return b.id - a.id; // Sort by newest (based on ID)
    } else if (sortMethod === 'alphabetical') {
      return a.customer_name.localeCompare(b.customer_name); // Sort alphabetically by name
    }
    // Add more sorting methods as needed
  });

  // Calculate the indexes for the current page
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = sortedCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <h1>Customer Data</h1>
      <div className="search-and-sort">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label>
          Sort by:
          <select value={sortMethod} onChange={(e) => setSortMethod(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="alphabetical">Alphabetical</option>
            {/* Add more sorting options as needed */}
          </select>
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Company</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Country</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.company_name}</td>
              <td>{customer.phone_number}</td>
              <td>{customer.email}</td>
              <td>{customer.country}</td>
              <td>{customer.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(sortedCustomers.length / customersPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
}

export default App;