import { useState, useEffect, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'

import { remove, edit } from '../../store/reducers/contacts'
import ContactClass from '../../models/Contact'
import { Button, ButtonSave } from '../../styles'


type Props = ContactClass

const Contact = ({
  name: originalName,
  email,
  phone,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    if (originalName.length > 0) {
      setName(originalName)
    }
  }, [originalName])

  function cancelEdit() {
    setIsEditing(false)
    setName(originalName)
  }

  return (
    <S.Card>
      <S.Name
        disabled={!isEditing}
        value={name}
        onChange={(evento) => setName(evento.target.value)}
      />
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
              }}
            >
              Salvar
            </ButtonSave>
            <S.ButtonCancelRemove onClick={cancelEdit}>
              Cancelar
            </S.ButtonCancelRemove>
          </>
        ) : (
          <>
            <Button onClick={() => setIsEditing(true)}>Editar</Button>
            <S.ButtonCancelRemove onClick={() => dispatch(remove(id))}>
              Remover
            </S.ButtonCancelRemove>
          </>
        )}
      </S.S.ActionBar>
    </S.Card>
  )
}

export default Contact
