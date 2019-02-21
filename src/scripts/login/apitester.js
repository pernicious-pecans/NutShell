const usersInfo = () =>{
    fetch("http://localhost:8088/users")
    .then(response =>
   response.json()
    )}

export default usersInfo