function Reviews({reviews}){


return (

<div>


<h2 className="
text-xl
font-bold
mb-5
">

Customer Reviews

</h2>



{
reviews.map(review=>(


<div
key={review.user}
className="
border-b
py-4
"
>


<h3 className="font-semibold">

{review.user}

</h3>


<p>
{"⭐".repeat(review.rating)}
</p>


<p className="text-gray-600">

{review.comment}

</p>


</div>


))

}



</div>

);

}


export default Reviews;
