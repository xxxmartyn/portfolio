import axios from "axios";

export const Logout = (props) => {

  function logMeOut() {
    axios({
      method: "POST",
      url:"http://127.0.0.1:5000/logout",
    })
    .then((response) => {
       props.token()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    return(
        <div className="App-header">
            <button onClick={logMeOut}>Kijelentkezés</button>
        </div>
    )
}
