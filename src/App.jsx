import { useState } from 'react'


function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];


  return (
    <div className='products_list'>

      <h1>Lista prodotti</h1>
      <ul>
        {products.map((p, i) => (
          <li key={i}>
            <strong>{p.name}</strong>
            <p>prezzo: {p.price} euro</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
