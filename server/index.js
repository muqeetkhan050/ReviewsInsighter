const express=require('express');
const cors=require('cors');
require('dotenv').config();

const reviewRoute=require('./routes/reviews');
const summaryRoute=require('./routes/summary');

const app=express();
app.use(cors());
app.use(express.json());

app.use('/api/reviews',reviewRoute)
app.use('/api/summary',summaryRoute)

const PORT=3001;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

