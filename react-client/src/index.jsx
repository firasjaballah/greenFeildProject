import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Image } from "cloudinary-react";
import axios from "axios";
import Home from "./components/Home.jsx";
import Feed from "./components/Feed.jsx";
// import Announces from './components/Announces.jsx';
import Contact from "./components/Contact.jsx";
import Login from "./components/Login.jsx";
import User from "./components/User.jsx";
import Posts from "./components/Posts.jsx";

const App = () => {
	const [view, setView] = useState("home");
	const [currentUser, setcurrentUser] = useState({
		category: "",
		phone_number: "",
		email: "",
		fullname: "",
		username: "",
		profile_image_uri: "",
		connected: false,
	});

	const viewRender = () => {
		// console.log("view render : ", this.state.view);
		if (view === "home") return <Home />;
		else if (view === "feed") return <Feed user={currentUser} />;
		else if (view === "announces") return <Posts user={currentUser} />;
		else if (view === "contact") return <Contact />;
		else if (view === "login" && !currentUser.connected)
			return <Login setcurrentUser={setcurrentUser} />;
		else return <User user={currentUser} />;
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
					{currentUser.connected ? (
						<div className='navbar-logout'>
							<Image
								onClick={() => setView("user")}
								style={{
									borderRadius: "50%",
									width: "30px",
									heigth: "35px",
								}}
								cloudName='geekitten'
								public_id={currentUser.profile_image_uri}
							/>
							<span
								onClick={() => {
									setView("login");
									setcurrentUser({
										category: "",
										phone_number: "",
										email: "",
										fullname: "",
										username: "",
										profile_image_uri: "",
										connected: false,
									});
								}}
							>
								Logout
							</span>{" "}
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
