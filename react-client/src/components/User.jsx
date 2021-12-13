import axios from "axios";
import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import regions from "../../../dammyData/Regions.js";
import Post from "./Post.jsx";

const User = ({ user }) => {
	const [userPosts, setuserPosts] = useState([]);
	useEffect(() => {
		if ((user.categorie = "owner")) {
			axios
				.get(`/users/${user._id}/ownerposts/`)
				.then(({ data }) => setuserPosts(data))
				.catch((err) => console.log(err));
		} else {
			axios
				.get(`/users/${user._id}/renterposts/`)
				.then(({ data }) => setuserPosts(data))
				.catch((err) => console.log(err));
		}
	}, []);
	let userInput =
		user.categorie === "owner" ? (
			<AddPostOwner user={user} />
		) : (
			<AddPostRenter user={user} />
		);
	return (
		<div className='userProfileContainer'>
			<UserPofile user={user} />
			{userInput}
			{/* user Posts List with delete and update options  */}
			{userPosts.map((post, i) => (
				<Post post={post} key={i} />
			))}
		</div>
	);
};

const UserPofile = ({ user }) => (
	<div className='profile'>
		<Image
			className='userProfilPic'
			cloudName='geekitten'
			public_id={user.profile_image_uri}
		/>
		<div className='userDetails'>
			<div>
				{" "}
				<span className='name-input'>
					{" "}
					<p>{user.username} </p>
				</span>{" "}
			</div>
			<div>
				{" "}
				<span className='phone-input'>
					<p>{user.phone_number}</p>
				</span>{" "}
			</div>
			<div>
				{" "}
				<span className='email-input'>
					<p>{user.email} </p>
				</span>{" "}
			</div>
		</div>
	</div>
);

const AddPostOwner = ({ user }) => {
	const [adresse, setadresse] = useState("");
	const [numberOfRooms, setnumberOfRooms] = useState("");
	const [price, setprice] = useState("");
	const [description, setdescription] = useState("");
	const [pics, setpics] = useState([]);
	const [cities, setCities] = useState([]);
	const [state, setstate] = useState("");
	const [city, setcity] = useState("");

	const uploadeImage = (file) => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", "rgofaujc");
		return axios.post(
			"http://api.cloudinary.com/v1_1/geekitten/image/upload",
			formData
		);
	}; // GET http://localhost:5000/users/:userId/ownerposts/
	// or
	// GET http://localhost:5000/users/:userId/renterposts/
	const handelSubmit = () => {
		console.log("piiiiiiccsssss", pics[0]);
		let image_id = [];
		for (let i = 0; i < pics.length; i++) {
			image_id.push(uploadeImage(pics[i]));
		}
		let imagesCloudineryIds = [];
		Promise.all(image_id)
			.then((result) => {
				imagesCloudineryIds = result.map((elem) => elem.data.public_id);
			})
			.then(() => {
				let post = {
					userId: user._id,
					address: adresse,
					numberOfRooms: numberOfRooms,
					price: price,
					description: description,
					pictures: imagesCloudineryIds,
					city: city,
					state: state,
				};
				console.log(post);
				axios
					.post(`/users/${post.userId}/ownerposts/`, post)
					.then(({ data }) => console.log(data))
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className='inputContainer contact'>
			<div className='creat-post-head'>
				<select
					id='state'
					onChange={(event) => {
						setstate(regions[event.target.value].state);
						setCities(regions[event.target.value].cities);
					}}
				>
					<option>Select the state</option>
					{regions.map((region, index) => (
						<option id={region.state} value={index} key={index}>
							{region.state}
						</option>
					))}
				</select>
				<select onChange={(event) => setcity(event.target.value)}>
					<option>Select the city</option>
					{cities.map((city, index) => (
						<option value={city} key={index}>
							{city}
						</option>
					))}
				</select>
			</div>
			<input
				className='adresse-input'
				placeholder='adresse'
				type='text'
				onChange={(e) => setadresse(e.target.value)}
			/>
			<input
				className='room-input'
				placeholder='number of rooms'
				type='text'
				onChange={(e) => setnumberOfRooms(e.target.value)}
			/>
			<input
				className='price-input'
				placeholder='price'
				type='text'
				onChange={(e) => setprice(e.target.value)}
			/>
			<textarea
				cols='34'
				rows='10'
				onChange={(e) => setdescription(e.target.value)}
			></textarea>
			<input
				type='file'
				multiple
				onChange={(e) => setpics(e.target.files)}
			/>
			<button onClick={handelSubmit}>Submit</button>
		</div>
	);
};

const AddPostRenter = ({ user }) => {
	const [title, settitle] = useState("");
	const [body, setbody] = useState("");
	const handelSubmit = () => {
		let post = { userId: user._id, title: title, body: body };
		console.log(post);
		axios
			.post(`/users/${post.userId}/renterposts/`, post)
			.then(({ data }) => console.log(data))
			.cath((err) => console.log(err));
	};
	return (
		<div className='inputContainer contact'>
			<input type='text' onChange={(e) => settitle(e.target.value)} />
			<textarea
				className='name-input'
				cols='34'
				rows='10'
				placeholder='title'
				onChange={(e) => setbody(e.target.value)}
			></textarea>
			<button onClick={handelSubmit}>Submit</button>
		</div>
	);
};
export default User;
