import React, {useEffect, useState} from 'react'
import { useSearchParams, Link } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import '../styles/Edit.css'

function Edit() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id')
  const [product, setProduct] = useState()
  const [name, setName] = useState()  
  const [price, setPrice] = useState()  
  const [colors, setColors] = useState([])  
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

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:5000/products/${id}`, {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        price: +price,
        productionYear: +productionYear,
        colors
      })
    })
    .then(res => res.text())
    .then(res => console.log(res))
    console.log(colors)
  }

  const handleAddColor = () => {
    setColors([...colors, ''])
  }

  const handleDeleteColor = (index) => {
    if(colors.length === 1){
      return 
    }
    setColors(colors.filter((el,index1) => index1 !== index))
  }

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handlePrice = (e) => {
    setPrice(e.target.value)
  }

  const handleProductionYear = (e) => {
    setproductionYear(e.target.value)
  }

  const handleColors = (e, index) => {
    setColors(colors.map((el,index1) => {
      console.log(index)
      if(index1 === index) {
        return e.target.value
      } 
      return el
    }))
  }

  return (
    <div className='block__div'>
      <form className='edit__form' onSubmit={handleSubmit} action="">
        <div className='input__div'>
          <span>Name: </span>
          <input onChange={handleName} type="text" value={name || ''}/>
        </div>
        <div className='input__div'>
          <span>Price: </span>
          <input onChange={handlePrice} type="number" value={price || ''}/>
        </div>
        <div className='input__div'>
          <span>Colors: </span>
          <div className='colors__div'>
            {colors.map((el, index) => {
              return (
                <div key={index} className='input_color__div'>
                  <ClearIcon onClick={() => handleDeleteColor(index)} sx={{color:'red'}}/>
                  <input onChange={(e) => handleColors(e,index)} className='colors__input' type="text" value={el || ''}/>
                </div>
              )
            })}
            <button onClick={handleAddColor} type='button' className='btn btn-info btn-sm'>Add color</button>
          </div>
        </div>
        <div className='input__div'>
          <span>Production year: </span>
          <input type="number" onChange={handleProductionYear} value={productionYear || ''}/>
        </div>
        <button type='submit' className='btn btn-primary'>Safe</button>
      </form>
      <Link className='go_back__link' to='/'>
          <button className='btn btn-secondary'>Go back</button>
      </Link>
    </div>
  )
}

export default Edit
