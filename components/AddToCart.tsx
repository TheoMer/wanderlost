import { useMutation, gql } from '@apollo/client'
import { CURRENT_USER_QUERY } from './User'
import { AddToCart as AddToCartTypes, AddToCartVariables } from './__generated__/AddToCart'

const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`

function AddToCart({ id }) {
  const [addToCart, { loading }] = useMutation<AddToCartTypes, AddToCartVariables>(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })
  return (
    <button type="button" disabled={loading} onClick={() => addToCart}>
      Add{loading && 'ing'} To Cart 🛒
    </button>
  )
}

export default AddToCart
export { ADD_TO_CART_MUTATION }
