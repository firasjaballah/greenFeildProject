import React, { useState, useEffect } from "react";
import Collapsible from "react-collapsible";
import feed from "../../../dammyData/feedDAta.js";
import axios from "axios";
import $ from "jquery";
import regions from "../../../dammyData/Regions.js";

export default function Feed(props) {
  const [feeds, setFeeds] = useState([]);
  const [reply, setReply] = useState({});
  const [newpost,setpost]=useState({content:'',user:props.user});
  const [userselectedpost,setselectedpost]=useState('')
  const [cities, setCities] = useState([]);
  const [Cities, setcities] = useState([]);
  const [city,setcity] = useState('');
  const [state,setState] = useState('')

  useEffect(() => {
    axios.get("/api/renterposts").then((res) => {
      
      setFeeds(res.data);
    },[]);

    
  //   axios.post("",{newpost,userselectedpost}).then((res) => {
  //    console.log(res)
  //   });
   });
  function addpost(){
    console.log(newpost)
    axios.post(`/users/${props.user._id}/renterposts`,newpost).then((res) => {
      console.log(res)
    })
  }
  function addreply(){
    axios.post('/api/commentpost',reply).then((res)=>{
      console.log(res)
    })
  }

  function addPost() {
    $(".Post").toggle();
  }
  return (
    <div className="feed">
      <div className="creat-post">
        <div className="creat-post-head">
          <select
            id="state"
            onChange={(event) => {setCities(regions[event.target.value].cities) 
              }}
          >
            <option>Select the state</option>
            {regions.map((region, index) => (
              <option id={region.state} value={index} key={index}>
                {region.state}
              </option>
            ))}
          </select>
          <select >
            <option>Select the city</option>
            {cities.map((city, index) => (
              <option value={city} key={index}>
                {city}
              </option>
            ))}
          </select>
          <button>Search</button>
          <button onClick={() => addPost()}>Create a post +</button>
        </div>
        <div className="Post creat-post-body" style={{ display: "none" }}>
            <div className="creat-post-body-contact">
              <select 
                id="state"
                onChange={(event) => {setcities(regions[event.target.value].cities )
                  setState(regions[event.target.value].state)}}
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
                {Cities.map((city, index) => (
                  <option value={city} key={index}>
                    {city}
                  </option>
                ))}
              </select>
            </div>  
            <textarea
              className="create-body-textarea"
              placeholder="your post here.."
            onChange={(event)=>setpost({content:event.target.value,user:props.user,state,city})}></textarea>
            <button onClick={addpost}>Post</button>
        </div>

      </div>
      {
      feeds.map((e, i) => {
        console.log('haa',e)
        return(
        <div key={i} className="announce feed-content">
          <h3 className="feed-user"><img src="https://source.unsplash.com/30x30/?face" /></h3>
          <p>{e.content}</p>
          <p>{e.createdAt}</p>
          
            <Collapsible trigger="Comment">
              <div className="comment-input">
                <input
                  onChange={(event) => setReply({content:event.target.value,postUser:e.post.user,replyUser:props.user})}
                  defaultValue={"reply to " + e.user}
                ></input>
                <button onClick={addreply}>Post the comment</button>
              </div>
            </Collapsible>
            <Collapsible trigger="Replies">
              {e.comments.map((reply, index) => (
                <div className="replies-feed" key={index}>
                  {/* <h5>{reply.user}</h5> */}
                  <p>{reply}</p>
                  {/* <p>{reply.createdAt}</p> */}
                </div>
              ))}
            </Collapsible>
        </div>
      )})}
    </div>
  );
}
