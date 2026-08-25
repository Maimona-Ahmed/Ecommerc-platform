import { FiChevronDown } from "react-icons/fi";


function ProductSort({sort,setSort}) {


return (

<div className="relative w-full sm:w-56">


<FiChevronDown
className="
absolute
right-4
top-1/2
-translate-y-1/2
text-gray-500
pointer-events-none
"
/>


<select

value={sort}

onChange={(e)=>setSort(e.target.value)}

className="
w-full
py-3
px-4
pr-10
rounded-xl
border
border-gray-300
outline-none
appearance-none
focus:border-primary
"

>


<option value="latest">
Latest
</option>


<option value="low-price">
Price: Low to High
</option>


<option value="high-price">
Price: High to Low
</option>


<option value="a-z">
Name: A-Z
</option>


<option value="z-a">
Name: Z-A
</option>


</select>


</div>

);

}


export default ProductSort;
