import {useState} from "react";

import AdditionalInfo from "./AdditionalInfo";
import Reviews from "./Reviews";


function ProductTabs({product}) {


const [tab,setTab]=useState("description");



return (

<div className="mt-16">


<div className="
flex
gap-8
border-b
mb-8
">


<button
onClick={()=>setTab("description")}
>
Description
</button>


<button
onClick={()=>setTab("info")}
>
Additional Info
</button>


<button
onClick={()=>setTab("reviews")}
>
Reviews
</button>


</div>




{
tab==="description" &&

<p className="text-gray-600">

{product.description}

</p>

}



{
tab==="info" &&

<AdditionalInfo 
data={product.additionalInfo}
/>

}



{
tab==="reviews" &&

<Reviews
reviews={product.reviews}
/>

}



</div>

);

}


export default ProductTabs;
