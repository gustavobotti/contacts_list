import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { RootReducer } from '../../store'
import { changeTerm } from '../../store/reducers/filter'

import * as S from './styles'
import { Button, Field } from '../../styles'

type Props = {
  showFilters: boolean
}

const SideBar = ({ showFilters }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { term } = useSelector((state: RootReducer) => state.filter)

  return (
    <S.Aside>
      <div>
        {showFilters ? (
          <>
            <Field
              type="text"
              placeholder="Search"
              value={term}
              onChange={(evento) => dispatch(changeTerm(evento.target.value))}
            />
          </>
        ) : (
          <Button onClick={() => navigate('/')}>Back to contacts list</Button>
        )}
      </div>
    </S.Aside>
  )
}

export default SideBar
