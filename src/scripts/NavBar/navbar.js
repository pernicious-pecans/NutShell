
const navbars= {
navbarLogin: () => { return `
        <div class="navbar">
        <input id="userName" type="text" placeholder="Username">
        <input id="Password" type="text" placeholder="Password">
        <button id="loginButton">Login</button>
        <button id="navRegisterButton">Register as New User</button>
        </div>
`},
navbarGeneral: () => { return `
        <div class="navbar">
        <button id="newsNavbar">Add News</button>
        <button id="taskNavbar">Add Task</button>
        <button id="eventNavbar">Add Event</button>
        <button id="logoutButton">Logout</button>
        </div>
`}
}

export default navbars