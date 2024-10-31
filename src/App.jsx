import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import SideBar from "./components/SideBar";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  
  function handleToggleModal() {
    setShowModal(!showModal);
  }
  
  useEffect(() => {
    async function fetchAPIData(){
        const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
        const url = 'https://api.nasa.gov/planetary/apod?api_key='+NASA_KEY

        const today = (new Date()).toDateString()
        const localKey = `NASA-${today}`
        if (localStorage.getItem(localKey)){
          const apiData = JSON.parse(localStorage.getItem(localKey))
          setData(apiData)
          console.log("Fetched from local")
          return
        }
        localStorage.clear()
        try{
          const res = await fetch(url)
          const apiData = await res.json()
          localStorage.setItem(localKey, JSON.stringify(apiData))
          setData(apiData)
          console.log(apiData)
          console.log("Fetched from api")
        }
        catch(err){
          console.log(err)
        }
      }
      fetchAPIData()
    }, []);

    return (
        <>
            {data ? (<Main data={data}/>) : 
            <div className="loadingState">
              <i className="fa-solid fa-gear"></i>
              </div>}
            {showModal && <SideBar handleToggleModal={handleToggleModal} data={data} />}
            {data && (<Footer handleToggleModal={handleToggleModal} data={data} />)}
        </>
    );
}

export default App;
