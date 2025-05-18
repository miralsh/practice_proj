import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [products,setProducts]=useState([])
  const baseUrl=process.env.REACT_APP_API_URL||'http://localhost:5000'
  useEffect(()=>{
     fetch(baseUrl+"/products").then(async(res)=>{
      const prod = await res.json()
      setProducts(prod)}).catch(err=>console.log(err))
  },[])


  return (
    <div className="container mx-auto">
      <ul className='list-group'>
        {products.map((product=>(
          <li className='list-group-item'>Product Name: {product.product_name}</li>
        )))}
        
      </ul>
    </div>
  );
}

export default App;
