import React, { useState } from "react";
import ReactDom from "react-dom";
import { Image } from "cloudinary-react";

const Post = ({ post }) => {
	const [slideShow, setSlideShow] = useState(false);

	return !slideShow ? (
		<div className='announce'>
			<div className='title-announce'>
				<div className='gallery' onClick={() => setSlideShow(true)}>
					<div className='img'>
						<img src={post.pictures[0]} />
					</div>
					<div className='others'>
						<img src={post.pictures[1]} />
					</div>
					<div className='others'>
						<img src={post.pictures[2]} />
					</div>
				</div>
				<div className='details'>
					<span></span>
					<span>
						<b>{post.username}</b>
					</span>
					<span>
						<b>Location :</b> {post.address}
					</span>
					<span>
						<b>Rooms :</b> {"S+" + post.numberOfRooms}
					</span>
					<span>
						<b>Price :</b> {post.price} tnd/month
					</span>
					<span>
						<b>Phone :</b> 96123456
					</span>
					{/* <span> <b>Views :</b> 12 </span> */}
					<span>
						<button className='postBtn'>
							<img src='https://img.icons8.com/ios-filled/15/4a90e2/new-message.png' />
							Contact
						</button>
						<button className='postBtn'>
							<img src='https://img.icons8.com/ios/15/26e07f/add-bookmark.png' />
							Add To List
						</button>
					</span>
				</div>
			</div>
			<div className='description'>
				<b>Description :</b>
				{post.discription}
			</div>
		</div>
	) : (
		ReactDom.createPortal(
			<div className='model-style'>
				<div>
					<span
						className='model-close'
						onClick={() => setSlideShow(false)}
					>
						<img src='https://cdn-icons.flaticon.com/png/512/1620/premium/1620739.png?token=exp=1639333638~hmac=f6f61bde2ec464d042b351ab4554892e' />
					</span>
					<SlidePics pictures={post.pictures} />
				</div>
			</div>,
			document.getElementById("modele")
		)
	);
};

const SlidePics = ({ pictures }) => {
	const [currentPic, setCurrentPic] = useState(0);
	return (
		<div>
			<span
				className='arrow'
				onClick={() => {
					if (currentPic > 0) setCurrentPic(currentPic - 1);
				}}
			>
				<img
					style={{ height: "40px", width: "40px" }}
					src='https://cdn-icons.flaticon.com/png/512/2609/premium/2609370.png?token=exp=1639326370~hmac=50efb7ccdf6c884dc45c517e769d6390'
				/>
			</span>
			<img
				style={{ height: "800px", width: "1000px" }}
				src={pictures[currentPic]}
			/>
			<span className='currentPic-index'>
				{currentPic + 1 + "/" + pictures.length}
			</span>
			<span
				className='arrow arrow-right'
				onClick={() => {
					if (currentPic < pictures.length - 1)
						setCurrentPic(currentPic + 1);
				}}
			>
				<img
					style={{ height: "40px", width: "40px" }}
					src='https://cdn-icons-png.flaticon.com/512/318/318476.png'
				/>
			</span>
		</div>
	);
};

export default Post;
