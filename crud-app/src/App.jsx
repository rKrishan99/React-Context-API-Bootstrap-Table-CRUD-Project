import { UserProvider } from "./context/UserContext"
import Users from "./user/Users"



function App() {

  return (
    <UserProvider>
      <Users/>
    </UserProvider>
  )
}

export default App
