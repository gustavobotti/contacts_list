import { useSelector } from 'react-redux'

import Contact from '../../components/Contact'
import { MainContainer, Title } from '../../styles'

import { RootReducer } from '../../store'

const ContactsList = () => {
  const { items } = useSelector((state: RootReducer) => state.contacts)
  const { term } = useSelector(
    (state: RootReducer) => state.filter
  )

  const filterContacts = () => {
    let filteredContacts = items
    if (term !== undefined) {
        filteredContacts = filteredContacts.filter(
        (item) => item.name.toLowerCase().search(term.toLowerCase()) >= 0
      )

      return filteredContacts
    } else {
      return items
    }
  }

  const showFilterResult = (quantity: number) => {
    let message = ''
    const complement =
      term !== undefined && term.length > 0 ? `and "${term}"` : ''

      message = `${quantity} contact(s) found as: "${`${term}`}" ${complement}`

    return message
  }

  const contacts = filterContacts()
  const message = showFilterResult(contacts.length)

  return (
    <MainContainer>
      <Title as="p">{message}</Title>
      <ul>
        {contacts.map((c) => (
          <li key={c.name}>
            <Contact
              id={c.id}
              name={c.name}
              phone={c.phone}
              email={c.email}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ContactsList
