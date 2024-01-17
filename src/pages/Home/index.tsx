import ButtonAdd from '../../components/ButtonAdd'
import SideBar from '../../containers/SideBar'
import ContactsList from '../../containers/ContactsList'

const Home = () => (
  <>
    <SideBar showSearch />
    <ContactsList />
    <ButtonAdd />
  </>
)

export default Home
