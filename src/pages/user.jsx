import { transactionData } from "../data/data"
import TransactionCard from "../components/transactionCard"
import { useEffect } from "react"
import { selectJWT, selectUserLogin } from "../utils/selectors"
import { useDispatch, useSelector } from "react-redux"
import ApiCalls from "../services/Api"
import { setUserData } from "../utils/reducers"
import { Navigate } from "react-router-dom"
import UserProfile from "../components/userProfile"

function UserPage() {
  let dispatch = useDispatch()
  let JWT = useSelector(selectJWT)
  const connected = useSelector(selectUserLogin)

  useEffect(() => {
      async function getUserProfile() {
          const response = await new ApiCalls().getUserProfileData(JWT)
          dispatch(setUserData(response.data.body))
          return response
      }
      getUserProfile() 
  }, [JWT, dispatch])
  
  if(connected === false || connected === undefined || connected === null) {
    return <Navigate to='/sign-in'/>
  }

    return (
        <main className="main bg-dark">
          <UserProfile />
            <h2 className="sr-only">Accounts</h2>
              {transactionData.map(({ id, title, amount, description }) => {
                return (
                  <TransactionCard key={id} title={title} amount={amount} description={description}/>
                );
              })}
        </main>
    )
}

export default UserPage