import './pages.css'
import React, {useState} from "react"
import Chart from '../components/Chart'
import KeyStats from '../components/KeyStats'
import NewsCard from '../components/NewsCard'
import { generalData } from '../sample_data/stocksample'
import logout from '../images/logout.png'
import search from '../images/search.png'

export default function Dashboard(props){
    const [currentStock, setCurrentStock] = useState("")
    const [filter, setFilter] = useState("1day")
    const [headerData, setHeaderData] = useState({name: '-', ticker: '-'})
    const [timeSeries, setTimeSeries] = useState(null)
    const [stats, setStats] = useState({
        open: "",
        high: "",
        low: "",
        volume: "",
        prevClose: "",
        fiftytwolow: "",
        fiftytwohigh: "",
        change: ""
    })
    const [news, setNews] = useState(null)

    const searchStock = async () => {
        try {
            let jwt = localStorage.getItem('token')
            let fetchResponse = await fetch("/api/data/retrieve", {
              method: "POST",
              headers: { "Content-Type": "application/json", "Authorization": 'Bearer: ' + jwt },
              body: JSON.stringify({ stock: currentStock, filter: filter })
            });
            let serverResponse = await fetchResponse.json()
            console.log("Success:", serverResponse)
            setHeaderData(serverResponse.general)
            setTimeSeries(serverResponse.timeSeries)
            setStats(serverResponse.keyMetrics)
            setNews(serverResponse.news)
        } catch (err) {
            console.error("Error:", err)
        }
    }

    const handleChange = async (evt) => {
        setCurrentStock(evt.target.value)
    }

    const handleLogOut = async () => {
        localStorage.removeItem('token')
        props.setUserInState(null)
    }

    return(
        <main className="h-screen w-screen overflow-x-hidden main-background sm:flex sm:overflow-hidden">
            <div className="sm:w-3/4">
                <div className="flex w-5/6 h-1/6 mx-auto my-10 justify-between items-center sm:my-0">
                    <div className="text-5xl cursor-default font-semibold"><span className="logo-color">Tendie</span>.</div>
                    <img src={logout} className="h-8 w-auto cursor-pointer" onClick={handleLogOut}></img>
                </div>
                <div className="w-5/6 mx-auto flex justify-between sm:justify-normal">
                    <input type="text" name="searchStock" placeholder="Search stock..." className="w-full border-b bg-transparent main-line focus:outline-none text-color sm:w-1/4" onChange={handleChange}></input>
                    <img src={search} className="w-10 h-auto cursor-pointer" onClick={searchStock}></img>
                </div>
                <div className="w-full mx-auto h-1/2 sm:w-5/6">
                {
                    timeSeries ? 
                    <Chart key={headerData.name} data={timeSeries} header={headerData} /> :
                    ""
                }
                </div> 
                <div className="w-full h-1/5 mx-auto sm:my-10 sm:w-5/6">
                    <KeyStats data={stats} />
                </div>
            </div>
            <div className="w-full h-full sm:w-1/4 sm:fixed sm:border-l sm:left-3/4 sm:overflow-y-scroll main-line">
                <p className="text-2xl font-medium logo-color mb-2 sm:my-10">Related Articles</p>
                {
                    news ? 
                    news.map((article) => (
                        <NewsCard key={article.title} data={article}></NewsCard>
                    )) : ""
                }
            </div>
        </main>
    )
}