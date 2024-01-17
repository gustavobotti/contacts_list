import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'

import { remove, edit } from '../../store/reducers/contacts'
import ContactClass from '../../models/Contact'
import { Button, ButtonSave } from '../../styles'

type Props = ContactClass

const Contact = ({
  name: originalName,
  phone: originalPhone,
  email: originalEmail,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState<string[]>([])
  const [email, setEmail] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (originalName.length > 0) {
      setName(originalName)
    }
    if (originalPhone.length > 0) {
      setPhone([...originalPhone])
    }
    if (originalEmail.length > 0) {
      setEmail(originalEmail)
    }
  }, [originalName, originalPhone, originalEmail])
  const handleAddPhone = () => {
    const numericOnly = newPhone.replace(/[^0-9]/g, '')
    if (numericOnly.length > 0) {
      setPhone((prevPhones) => [...prevPhones, numericOnly])
      setNewPhone('')
      setErrorMessage('')
    } else {
      setErrorMessage('Phone number cannot be non-numeric')
    }
  }
  const handleEditPhone = (index: number, editedPhone: string) => {
    const numericOnly = editedPhone.replace(/[^0-9]/g, '')
    const updatedPhones = [...phone]
    updatedPhones[index] = numericOnly
    setPhone(updatedPhones)
  }
  const handleDeletePhone = (index: number) => {
    const updatedPhones = phone.filter((_, i) => i !== index)
    setPhone(updatedPhones)
  }
  function cancelEdit() {
    setIsEditing(false)
    setName(originalName)
    setPhone(originalPhone)
    setEmail(originalEmail)
    setErrorMessage('')
  }

  return (
    <S.Card>
      <S.Name
        disabled={!isEditing}
        value={name}
        onChange={(evento) => setName(evento.target.value)}
      />
      <S.PhoneList>
        {phone.map((phoneNumber, index) => (
          <S.PhoneContainer key={index}>
            <S.Phone
              disabled={!isEditing}
              value={phoneNumber}
              onChange={(event) => handleEditPhone(index, event.target.value)}
            />
            {isEditing && (
              <>
                <S.DeleteButton onClick={() => handleDeletePhone(index)}>
                  Delete
                </S.DeleteButton>
              </>
            )}
          </S.PhoneContainer>
        ))}
        {isEditing && (
          <S.PhoneContainer key="new-phone">
            <S.Phone
              value={newPhone}
              onChange={(event) => setNewPhone(event.target.value)}
            />
            <S.AddButton onClick={handleAddPhone}>Add</S.AddButton>
          </S.PhoneContainer>
        )}
      </S.PhoneList>
      {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
      <S.Email
        disabled={!isEditing}
        value={email}
        onChange={(evento) => setEmail(evento.target.value)}
      />
      <hr />
      <S.ActionBar>
        {isEditing ? (
          <>
            <ButtonSave
              onClick={() => {
                dispatch(
                  edit({
                    name,
                    phone,
                    email,
                    id
                  })
                )
                setIsEditing(false)
                setErrorMessage('')
              }}
            >
              Save
            </ButtonSave>
            <S.ButtonCancelRemove onClick={cancelEdit}>
              Cancel
            </S.ButtonCancelRemove>
          </>
        ) : (
          <>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
            <S.ButtonCancelRemove onClick={() => dispatch(remove(id))}>
              Remove
            </S.ButtonCancelRemove>
          </>
        )}
      </S.ActionBar>
    </S.Card>
  )
}

export default Contact
