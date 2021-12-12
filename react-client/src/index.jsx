import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Home from "./components/Home.jsx";
import Feed from "./components/Feed.jsx";
// import Announces from './components/Announces.jsx';
import Contact from "./components/Contact.jsx";
import Login from "./components/Login.jsx";
import User from "./components/User.jsx";
import Posts from "./components/Posts.jsx";

const App = () => {
	// this.state = {
	// 	view: 'home',
	// 	connect: false
	// }
	const [view, setView] = useState("user");
	const [connect, setConnect] = useState(false); // changed to true for testing user component
	// const [user,setuser]=useState({});

	let user = {
		_id: "1516845168135",
		userName: "Khalil Hmazaoui",
		email: "khalil_hamzaoui.gmail.com",
		phoneNumber: 22556688,
		categorie: "owner",
		// categorie: "renter",
		image: "https://images.unsplash.com/photo-1581599129568-e33151627628?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
	};

	const viewRender = () => {
		// console.log("view render : ", this.state.view);
		if (view === "home") return <Home />;
		else if (view === "feed") return <Feed />;
		else if (view === "announces") return <Posts />;
		else if (view === "contact") return <Contact />;
		else if (view === "login" && !connect) return <Login />;
		else return <User user={user} />;
	};
	return (
		<div>
			{/* navbar section  */}
			<nav>
				<div className='logo' onClick={() => setView("home")}>
					House
				</div>

				<ul className='links'>
					<li onClick={() => setView("home")}>Home</li>
					<li onClick={() => setView("feed")}>Feed</li>
					<li onClick={() => setView("announces")}>Annouces</li>
				</ul>

				<div className='right'>
					<span onClick={() => setView("contact")}>Contact</span>
					{connect ? (
						<div
							className='navbar-logout'
							onClick={() => setView("login")}
						>
							<img className='navbar-user' src={user.image} />{" "}
							<span>Logout</span>{" "}
						</div>
					) : (
						<span onClick={() => setView("login")}>Login</span>
					)}
				</div>
			</nav>

			{/* container section */}
			<div className='container'>{viewRender()}</div>

			{/* footer section  */}
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("app"));
