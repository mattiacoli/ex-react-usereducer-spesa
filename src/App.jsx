import { useState } from 'react'


function App() {

  const [addedProducts, setAddedProducts] = useState([])


  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const addProduct = (product) => {
    const exists = addedProducts.some(item => item.name === product.name)

    if (!exists) {

      const item = {
        ...product,
        quantity: 1
      }
      setAddedProducts([...addedProducts, item])
    } else {
      updateProductQuantity(product)
    }
  }

  const updateProductQuantity = (product) => {
    setAddedProducts(addedProducts.map(item =>
      item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
    ))
  }

  const removeFromCart = (i) => {
    const filteredCart = addedProducts.filter((item, index) => index !== i)
    setAddedProducts(filteredCart)
  }


  const totalPrice = addedProducts.map(item => item.price * item.quantity)
    .reduce((acc, p) => acc + p, 0).toFixed(2)
  console.log(totalPrice);






  return (
    <div className='products_list'>

      <h1>Lista prodotti</h1>
      <ul>
        {products.map((p, i) => (
          <li key={i}>
            <strong>{p.name}</strong>
            <p>prezzo: {p.price} euro</p>
            <button onClick={() => addProduct(p)}>Aggiungi al carrello</button>
          </li>
        ))}
      </ul>


      {addedProducts?.length != 0 &&
        <div className="cart">
          <h2>il Tuo Carrello</h2>
          <ul>
            {addedProducts.map((item, i) => (
              <li key={i}>
                <strong>{item.name}</strong>
                <p>prezzo: {item.price} euro</p>
                <p>quantità: {item.quantity}</p>
                <button onClick={() => removeFromCart(i)}>Rimuovi dal carrello</button>
              </li>
            ))}
          </ul>
          <div className="total_price">
            <p>Totale </p>
            <strong>{totalPrice}</strong>
          </div>
        </div>
      }
    </div>
  )
}

export default App
