import { useEffect, useState } from 'react';
import './App.css';
import { fetch } from '../API/ApiReq';
import youtubeIcon from '/images/youtube.png'

function App() {
  const [link, setLink] = useState('');
  const [id, setId] = useState(null);
  const [response, setResponse] = useState(null);
  const [disabled, setDisabled] = useState(false);
  
  useEffect(() => {
    if (id) {
      const fetchData = () => {
        let interval = setInterval(async function() {
          setDisabled(true);
          const res = await fetch(id);
          
          if (res.status === 200 && res.data.status === "ok") {
            setDisabled(false);
            setResponse(res.data);
            clearInterval(interval);
          } else if (res.status === 200 && res.data.status === "fail") {
            alert("Invalid video ID");
            setDisabled(false);
            clearInterval(interval);
          }

        }, 1000);
      }

      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (response) {
      window.location.href = response.link;
    }
  }, [response]);

  return (
    <div className="App">
      <div className='container'>
        <img src={youtubeIcon} alt="" className='icon' />
        <h2> MP3 DOWNLOADER</h2>
      </div>

      <div >
        <input id='input'
          type="text"
          placeholder="  enter your youtube link..."
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
      </div>
      <div>
      <span className='example'>Example: <span className='url'>https://www.youtube.com/watch?v=7-U8I4iXW4M</span> </span>
      </div>

      <div className='containerBtn'>
        <button id='download'
        onClick={() => {
          const text = link.split("=")[1];
          if (text) {
            setId(text);
          }
        }}
        disabled={disabled}
        className={disabled ? "btn-disabled" : ""}
      >Download</button>
      </div>

      
    </div>
  )
}

export default App