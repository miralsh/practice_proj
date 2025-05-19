import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  const [products,setProducts]=useState([])
  const baseUrl=process.env.REACT_APP_API_URL||'http://localhost:5000'
  useEffect(()=>{
      axios.get(baseUrl+"/products").then(async(res)=>{
      const prod = await res.data
      setProducts(prod)}).catch(err=>console.log(err))
  },[])


  return (
    <div className="container mx-auto">
      <ul className='list-group'>
        {products?products.map((product=>(
          <li className='list-group-item'>Product Name: {product.product_name}</li>
        ))):<p>No Products found!</p>}
        
      </ul>
    </div>
  );
}

export default App;
