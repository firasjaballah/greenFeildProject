import React, { useState, useEffect } from "react";
import Collapsible from "react-collapsible";
import feed from "../../../dammyData/feedDAta.js";
import axios from "axios";
import $ from "jquery";
import regions from '../../../dammyData/Regions.js';
export default function Feed() {
  const [feeds, setFeeds] = useState(feed);
  const [txt, setReply] = useState("");

  useEffect(() => {
    axios.get("/feeds").then((res) => {
      setFeeds(res.data);
    });
  });
  function addPost() {
    $(".Post").toggle();
  }
  function writeReply() {
    $(".show").toggle();
  }

  return (
    <div>
      <select id='state'>
       {regions.map((region,index)=>(
         <option id={region.state} value={region.state} key={index}>{region.state}</option>
       ))
       }
      </select>
      <select>
        { 
        regions.filter()
        
        }
      </select>
      
      <button onClick={() => addPost()}>Create a post +</button>
      <div className="Post" style={{ display: "none" }}>
        <input placeholder="region"></input>
        <textarea
          className="create-body-textarea"
          placeholder="your post here.."
        ></textarea>
        <button>Post</button>
      </div>
      {feeds.map((e, i) => (
        <div key={i}>
          <h3>{e.post.user}</h3>
          <p>{e.post.text}</p>
          <p>{e.post.createdAt}</p>
          <button onClick={() => writeReply()}>Comment</button>
          <div className="show" style={{ display: "none" }}>
            <input
              onChange={(event) => setReply(event.value)}
              defaultValue={"reply to " + e.post.user}
            ></input>
            <button>Post the comment</button>
          </div>
          <Collapsible trigger="Replies">
            {e.replies.map((reply, index) => (
              <div key={index}>
                <h3>{reply.user}</h3>
                <p>{reply.text}</p>
                <p>{reply.createdAt}</p>
              </div>
            ))}
          </Collapsible>
        </div>
      ))}
    </div>
  );
}
