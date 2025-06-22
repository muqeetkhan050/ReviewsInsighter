// const express=require('express');
// const router=express.Router();
// const fetch=require('node-fetch');

// router.get('/:placeId',async(req,res)=>{
//     const { placeId } = req.params;
//     const apiKey=process.env.GOOGLE_API_KEY;
//     const url = `https://places.googleapis.com/v1/places/${placeId}?fields=reviews&key=${apiKey}`
//       try {
//     const response = await fetch(url, {
//       headers: {
//         "X-Goog-Api-Key": apiKey,
//         "X-Goog-FieldMask": "reviews",
//       },
//     });
//     const data = await response.json();
//     res.json(data.reviews || []);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching reviews" });
//   }
// })
// module.exports=router;
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/:placeId', async (req, res) => {
  const { placeId } = req.params;
  const apiKey = process.env.GOOGLE_API_KEY;

  // Validate required parameters
  if (!placeId) {
    return res.status(400).json({ error: 'Place ID is required' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: 'Google API key not configured' });
  }

  // Use the new Places API (New) URL structure
  const url = `https://places.googleapis.com/v1/places/${placeId}`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'reviews'
      }
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({
        error: 'Google Places API error',
        details: errorData
      });
    }

    const data = await response.json();
    
    // Return reviews or empty array if no reviews found
    const reviews = data.reviews || [];
    
    res.json({
      placeId,
      reviewCount: reviews.length,
      reviews
    });

  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ 
      error: 'Internal server error while fetching reviews',
      message: error.message 
    });
  }
});

module.exports = router;