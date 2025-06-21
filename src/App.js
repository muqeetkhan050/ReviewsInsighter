import {setState} from 'react';
import './App.css';


function App() {
  const[placeId,setPlaceId]=setState("");
  const[reviews,setReviews]=setState([]);
  const[summary,setSummary]=setState([]);

  const fetchReviews=async()=>{
    const res=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reviews/${placeId}`)
    const data=await res.json();
    setReviews(data);
  };

  const summerizeReviews=async()=>{
    const res=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/summary`,{
      method:'POST',
      headers:{"content-type":"application/json"},
      body:JSON.stringify({reviews:reviews.map((r)=>({text:r.text.text}))})

    });
    const data = await res.json();
    setSummary(data.summary);
  }

  return (
    <div className="App">
     <h1>Bussiness Insights</h1>
     <div>
      <input type='text'
      placeholder='write place ID'
      value={placeId}
      onChange={(e)=>setPlaceId(e.target.value)}></input>
      <button onClick={fetchReviews}>Fetch Reviws</button>
      <button onClick={summerizeReviews}>Summerize Reviews</button>
     </div>
     <reviewsSummary summary={summary} reviews={reviews}/>
    </div>
  );
}

export default App;

