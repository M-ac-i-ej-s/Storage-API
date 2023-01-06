import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';

function Edit() {
  const { id } = useParams();
  const [product, setProduct] = useState()
  const [name, setName] = useState()  
  const [price, setPrice] = useState()  
  const [colors, setColors] = useState()  
  const [productionYear, setproductionYear] = useState()  

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`, {
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
      setProduct(res)
      setName(res[0].name)
      setPrice(res[0].price)
      setColors(res[0].colors)
      setproductionYear(res[0].productionYear)
    })
  },[])

  return (
    <div>
      <form action="">
        <input type="text" value={name}/>
        <input type="number" value={price}/>
        <input type="text" />
        <input type="text" value={productionYear}/>
      </form>
    </div>
  )
}

export default Edit
