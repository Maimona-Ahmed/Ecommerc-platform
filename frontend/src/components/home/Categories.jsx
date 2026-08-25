import men from "../../assets/user1.jpeg";
import women from "../../assets/user2.jpeg";
import shoes from "../../assets/user3.jpeg";
import bags from "../../assets/user1.jpeg";
import { useEffect,useState } from "react";
import api from "../api/axios";


function Categories() {
const [categories,setCategories]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
      const fetchCategories= async ()=>{
        try {
          const response = await api.get("/categories/");
          setCategories(response.data.results||[]);
          console.log(response);
          console.log(response.data)

        } catch(error){
          console.error(error);
        }
      };
      fetchCategories();
      },[]);


return (

<section className="container-custom py-12">


<h2 className="section-title text-center mb-8">
 Categories
</h2>



<div className="
grid
grid-cols-2
md:grid-cols-4
gap-6
">


{
categories.map((category,index)=>(

<div
key={index}
className="
card
relative
h-60
overflow-hidden
group
"
>


<img
src={category.image}
alt={category.name}

className="
w-full
h-full
object-cover
group-hover:scale-110
transition
duration-500
"
/>



<div className="
absolute
inset-0
bg-black/30
flex
items-center
justify-center
">


<h3 className="
text-white
text-2xl
font-bold
">
{category.name}
</h3>
</div>
</div>
))
}
</div>
</section>
)
}

export default Categories;
