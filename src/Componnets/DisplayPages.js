import React, { useState, useEffect } from 'react';

const DisplayPages = () => {
  const [pages, setPages] = useState([]); // State to store pages data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch all pages from the backend
    fetch('http://localhost:5000/savePageContent')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch pages');
        }
        return response.json();
      })
      .then((data) => {
        setPages(data); // Store pages data in state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching pages:', error);
        setLoading(false);
      });
  }, []);
console.log(pages);

  if (loading) {
    return <p>Loading pages...</p>; // Show loading state while fetching data
  }

  if (!pages.length) {
    return <p>No pages found</p>; // Show message if no pages are available
  }

  return (
    <div className="page-list">
      <h1>Saved Pages</h1>
      <ul>
        {pages.map((page) => (
          <li key={page._id}>
            <h2>{page.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: page.content }} /> {/* Display content */}
            <p>Created At: {new Date(page.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayPages;
