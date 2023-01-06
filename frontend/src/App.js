import React, {useEffect, useState} from 'react'
import Slider from '@mui/material/Slider';
import './styles/App.css'

function App() {
  const [products, setProducts] = useState([])
  const [filtredProducts, setFiltredProducts] = useState([])
  const [sortby, setSortBy] = useState('')
  const [number, setNumber] = useState([0,9999])
  const [byName, setByName] = useState('')
  const minDistance = 50


  useEffect(() => {
    fetch("http://localhost:5000/products", {
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      setProducts(res)
      setFiltredProducts(res)
    })
  },[])

  const handleSelect = (e) => {
    setSortBy(e.target.value)
    switch(e.target.value) {
      case 'name':
        setProducts(products.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }))
        break
      case 'price_a':  
        setProducts(products.sort(function (a, b) {
          if (a.price < b.price) {
            return -1;
          }
          if (a.price > b.price) {
            return 1;
          }
          return 0;
        }))
        break
      case 'price_d':  
        setProducts(products.sort(function (a, b) {
          if (a.price > b.price) {
            return -1;
          }
          if (a.price < b.price) {
            return 1;
          }
          return 0;
        }))
        break
      case 'stock_a':  
        setProducts(products.sort(function (a, b) {
          if (parseInt(a.amount) > parseInt(b.amount)) {
            return -1;
          }
          if (parseInt(a.amount) < parseInt(b.amount)) {
            return 1;
          }
          return 0;
        }))
        break
      case 'stock_d':  
        setProducts(products.sort(function (a, b) {
          if (parseInt(a.amount) < parseInt(b.amount)) {
            return -1;
          }
          if (parseInt(a.amount) > parseInt(b.amount)) {
            return 1;
          }
          return 0;
        }))
        break  
      default:
          break    
      }
  }

  const handleChange1 = (event,newValue,activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setNumber([Math.min(newValue[0], number[1] - minDistance), number[1]]);
      setFiltredProducts(products.filter(el => el.price > number[0] && el.price < number[1]))
    } else {
      setNumber([number[0], Math.max(newValue[1], number[0] + minDistance)]);
      setFiltredProducts(products.filter(el => el.price > number[0] && el.price < number[1]))
    }
  };

  const handleName = (e) => {
    setByName(e.target.value)
    setFiltredProducts(products.filter(el => el.name.includes(e.target.value)))
  }

  return (
    <div className='container__div'>
      <div className="App">
        <div className='sort_filter__div'>
          <select onChange={handleSelect} className="sort__select" value={sortby}>
            <option value="">Sort by</option>
            <option value="name">Name alphabetically</option>
            <option value="price_a">Price Ascending</option>
            <option value="price_d">Price Descending</option>
            <option value="stock_a">Stock Ascending</option>
            <option value="stock_d">Stock Descending</option>
          </select>
          <span>Filter By</span>
          <span>&nbsp;Price:</span>
          <Slider
            value={number}
            className='filtr__input'
            onChange={handleChange1}
            valueLabelDisplay="auto"
            disableSwap
            sx={{width:'200px', marginLeft:'20px', marginRight:'20px'}}
            min={0}
            max={9999}
          />
          <span>Name:</span>
          <input className='filtr__input' onChange={handleName} value={byName} type="text" placeholder='name'  />
        </div>
        <div className='products__div'>
          {filtredProducts.map(el => {
            return (
              <div className='productBox__div' key={el._id}>
                <span>{el.name}</span>
                <span>Price: {el.price}</span>
                <span>Colors: </span>
                <div>
                  {el.colors.map(el1 => {
                    return <span style={{color:el1}} key={el1}>{el1} </span>
                  })}
                </div>
                <span>Production Year: {el.productionYear}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App
