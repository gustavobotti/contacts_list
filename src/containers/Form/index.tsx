import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ButtonSave, MainContainer, Title } from '../../styles'
import { Field } from '../../styles'
import { Form } from './styles'

import { register } from '../../store/reducers/contacts'

const Form = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const registerContact = (event: FormEvent) => {
    event.preventDefault()

    dispatch(
      register({
        name,
        phone,
        email
      })
    )
    navigate('/')
  }

  return (
    <MainContainer>
      <Title>Nova tarefa</Title>
      <Form onSubmit={registerContact}>
        <Field
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          placeholder="Name"
        />
        <Field
          value={phone}
          onChange={(event) =>  setPhone(event.target.value)}
          type="text"
          placeholder="Telephone Number"
        />
        <Field
          value={email}
          onChange={(event) =>  setEmail(event.target.value)}
          type="text"
          placeholder="Email"
        />
        <ButtonSave type="submit">Register</ButtonSave>
      </Form>
    </MainContainer>
  )
}

export default Form
