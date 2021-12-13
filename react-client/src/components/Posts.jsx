import React, { useState, useEffect } from "react";

import Post from "./Post.jsx";
import dommyPosts from "../../../dammyData/data.js";
import axios from "axios";

const Posts = (props) => {
	const [postsList, setPostsList] = useState(dommyPosts);
	// useEffect(() => {
	// 	axios.get("/api/ownerposts").then(({ data }) => {
	// 		setPostsList(data);
	// 	});
	// }, []);

	return (
		<div>
			<div className='announces-container'>
				{postsList.map((post, i) => (
					<Post post={post} key={i} />
				))}
			</div>
		</div>
	);
};

export default Posts;
