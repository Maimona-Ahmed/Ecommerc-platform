import { FiSearch } from "react-icons/fi";


function ProductSearch({search,setSearch}) {


return (

<div className="relative w-full sm:w-72">


<FiSearch
className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-400
"
/>


<input

type="text"

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search products..."

className="
w-full
pl-11
pr-4
py-3
rounded-xl
border
border-gray-300
outline-none
focus:border-primary
"

/>


</div>

);

}


export default ProductSearch;
