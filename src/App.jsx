import { useEffect, useState } from 'react';
import './App.css';
import { fetch } from '../public/API/ApiReq';
import youtubeIcon from '/images/youtube.png'
import Lottie from 'react-lottie';
import animationData from '../public/lotties/6pQtoicGQ1.json';

function App() {
  const [link, setLink] = useState('');
  const [id, setId] = useState(null);
  const [response, setResponse] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

//regex para url
    function extractVideoId(url) {
      const regex = /(?:youtu\.be\/|youtube\.com\/(?:.*[&?](?:v|vi)=|embed\/|v\/|tv\/|watch\?(?:.*&)?v=))([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match && match[1];
}
  
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
            setErrorMessage("Invalid video ID");
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

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

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
          required
          onChange={(e) => {
            setLink(e.target.value);
          }}
          
        />
      </div>
      <div>
      <span className='example'>Obs:<span className='url'>Seu download será feito em alguns segundos...</span> </span>
      </div>

      <Lottie 
	    options={defaultOptions}
        height={30}
        width={30}
      />

      <div className='containerBtn'>
      
        <button id='download'
        onClick={() => {
          const videoId = extractVideoId(link);
            if (videoId) {
            setId(videoId);
        }
        }}
        disabled={disabled}
        className={disabled ? "btn-disabled" : ""}
      >
      

     Download
        
        </button>
      </div>
      
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  )
}

export default App