import './App.css';
import React, { useState } from 'react';
import ReviewsSummary from './reviewsSummary';

function App() {
  const [placeId, setPlaceId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState("");

const fetchReviews = async () => {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/reviews/${placeId}`;
    console.log("Fetching reviews from:", url);

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("Fetched reviews:", data);
    setReviews(data);
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    alert("Failed to fetch reviews: " + error.message);
  }
};

const summerizeReviews = async () => {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/summary`;
    console.log("Sending reviews to summarize:", reviews);

    const res = await fetch(url, {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ reviews: reviews.map((r) => ({ text: r.text.text })) })
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("Summary received:", data);
    setSummary(data.summary);
  } catch (error) {
    console.error("Failed to summarize reviews:", error);
    alert("Failed to summarize reviews: " + error.message);
  }
};


  return (
    <div className="App">
      <h1>Business Insights</h1>
      <div>
        <input
          type='text'
          placeholder='Enter Place ID'
          value={placeId}
          onChange={(e) => setPlaceId(e.target.value)}
        />
        <button onClick={fetchReviews}>Fetch Reviews</button>
        <button onClick={summerizeReviews}>Summarize Reviews</button>
      </div>

      <ReviewsSummary summary={summary} reviews={reviews} />
    </div>
  );
}

export default App;
