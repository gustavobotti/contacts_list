import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ButtonSave, MainContainer, Name } from '../../styles'
import { Field } from '../../styles'
import * as S from './styles'
import { Formulary } from './styles'

import { register } from '../../store/reducers/contacts'

const Form = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState<string[]>([])
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
      <S.Card>
        <Name>New contact</Name>
        <Formulary onSubmit={registerContact}>
          <Field
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Name"
          />
          <Field
            value={phone.join(', ')}
            onChange={(event) => setPhone(event.target.value.split(', '))}
            type="text"
            placeholder="Telephone Number"
          />
          <Field
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="text"
            placeholder="Email"
          />
          <ButtonSave type="submit">Register</ButtonSave>
        </Formulary>
      </S.Card>
    </MainContainer>
  )
}

export default Form
