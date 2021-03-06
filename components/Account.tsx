import { useMutation, gql } from '@apollo/client'
import { useUser } from './User'
import useForm from '../lib/useForm'
import Form from './styles/Form'
import PrivateRoute from './PrivateRoute'
import FormItem from './FormItem'
import { UpdateUser, UpdateUserVariables } from './__generated__/UpdateUser'

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($name: String!, $id: ID!) {
    updateUser(id: $id, name: $name) {
      id
      name
    }
  }
`

function Account() {
  const me = useUser()
  const { inputs, handleChange } = useForm({
    name: me.name,
  })
  const [updateUser, { loading }] = useMutation<UpdateUser, UpdateUserVariables>(UPDATE_USER_MUTATION, {
    variables: {
      id: me.id,
      name: inputs.name,
    },
  })
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault()
        await updateUser()
      }}
    >
      <fieldset disabled={loading}>
        <FormItem label="" inputs={inputs} onChange={handleChange} name="name" />
        <button type="submit">Updat{loading ? 'ing' : 'e'}</button>
      </fieldset>
    </Form>
  )
}

function Component() {
  return (
    <PrivateRoute>
      <Account />
    </PrivateRoute>
  )
}

export default Component
