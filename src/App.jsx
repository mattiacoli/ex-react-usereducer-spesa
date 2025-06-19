import { useState, useReducer } from 'react'

function cartReducer(addedProducts, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = addedProducts.find(item => item.name === action.payload.name)

      if (existingItem) {
        action.payload.quantity = addedProducts.quantity + 1
      } else {
        return [...addedProducts, {
          ...action.payload,
          quantity: 1
        }];
      }
    }
    case "UPDATE_QUANTITY":
      if (action.payload.quantity < 1 || isNaN(action.payload.quantity)) {
        return addedProducts;
      }
      return addedProducts.map(p => p.name === action.payload.name ? { ...p, quantity: action.payload.quantity } : p);

    case "REMOVE_ITEM":
      return addedProducts.filter((item, index) => index !== action.payload)
    default:
      return addedProducts
  }

}

function App() {
  // Data
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, dispatchProducts] = useReducer(cartReducer, [])


  // total price
  const totalPrice = addedProducts.reduce((acc, p) => acc + p.price * p.quantity, 0).toFixed(2)



  return (
    <div className='products_list'>
      {/* Product List */}

      <h1>Lista prodotti</h1>
      <ul>
        {products.map((p, i) => (
          <li key={i}>
            <strong>{p.name}</strong>
            <p>prezzo: {p.price} euro</p>
            <button onClick={() => dispatchProducts({ type: "ADD_ITEM", payload: p })}>Aggiungi al carrello</button>
          </li>
        ))}
      </ul>


      {/* Cart List */}

      {addedProducts?.length != 0 &&
        <div className="cart">
          <h2>il Tuo Carrello</h2>
          <ul>
            {addedProducts.map((item, i) => (
              <li key={i}>
                <strong>{item.name}</strong>
                <p>prezzo: {item.price} euro</p>

                <div className="quantity_input">
                  <p>quantità:</p>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => dispatchProducts({
                      type: "UPDATE_QUANTITY",
                      payload: { name: item.name, quantity: parseInt(e.target.value) }
                    })} />
                </div>
                <button onClick={() => dispatchProducts({ type: "REMOVE_ITEM", payload: i })}>Rimuovi dal carrello</button>
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
