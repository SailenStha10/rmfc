import { useMemo, useReducer } from 'react'
import { CartContext } from './cartContextValue'

function reducer(items, action) {
  switch (action.type) {
    case 'add': {
      const existing = items.find((i) => i.id === action.item.id)
      if (existing) {
        return items.map((i) => (i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...items, { ...action.item, qty: 1 }]
    }
    case 'remove':
      return items.filter((i) => i.id !== action.id)
    case 'setQty':
      return action.qty < 1
        ? items.filter((i) => i.id !== action.id)
        : items.map((i) => (i.id === action.id ? { ...i, qty: action.qty } : i))
    case 'clear':
      return []
    default:
      return items
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [])

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((sum, i) => sum + i.price * i.qty, 0),
      addItem: (item) => dispatch({ type: 'add', item }),
      removeItem: (id) => dispatch({ type: 'remove', id }),
      setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [items],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
