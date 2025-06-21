import react from 'react';

function ReviewsSummary({summary,reviews}){
    return(
        <div>
            <h2>Reviews Summary</h2>
            <p>This section will show summary of reviews</p>
            <h3>{summary}</h3>
            <ul>
                {reviews.map((rev,index)=>{
                    <li key={index}>
                        {rev.text.text}
                    </li>
                })}
            </ul>
        </div>
    )

}


export default ReviewsSummary;