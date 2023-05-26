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
    const [headerData, setHeaderData] = useState({name: '-', ticker: '-'})
    const [timeSeries, setTimeSeries] = useState([{date: '0', value: '0'}])
    const [stats, setStats] = useState({
        open: "value",
        high: "value",
        low: "value",
        volume: "value",
        prevClose: "value",
        fiftytwolow: "value",
        fiftytwohigh: "value",
        change: "value"
    })
    const [news, setNews] = useState(null)

    const searchStock = async () => {
        try {
            let jwt = localStorage.getItem('token')
            let fetchResponse = await fetch("/api/data/retrieve", {
              method: "POST",
              headers: { "Content-Type": "application/json", "Authorization": 'Bearer: ' + jwt },
              body: JSON.stringify({ stock: currentStock })
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
        <main className="h-screen w-screen overflow-x-hidden main-background sm:flex">
            <div className="flex w-5/6 h-1/6 mx-auto justify-between items-center">
                <div className="text-5xl cursor-default font-semibold"><span className="logo-color">Tendie</span>.</div>
                <img src={logout} className="h-1/4 w-auto cursor-pointer" onClick={handleLogOut}></img>
            </div>
            <div className="w-5/6 mx-auto flex justify-between">
                <input type="text" name="searchStock" placeholder="Search stock..." className="w-full border-b bg-transparent main-line focus:outline-none text-color" onChange={handleChange}></input>
                <img src={search} className="w-10 h-auto cursor-pointer" onClick={searchStock}></img>
            </div>
            <div className="flex justify-between w-full mx-auto mt-2">
                <p className={`${headerData.name.length + headerData.ticker.length >= 21 ? "text-sm" : "text-xl"} font-medium logo-color mx-5`}>{headerData.name} ({headerData.ticker})</p>
                <div className="flex">
                    <div className="text-md mx-1 w-8 h-auto border rounded-md logo-color font-medium hover:">D</div>
                    <div className="text-md mx-1 w-8 h-auto border rounded-md logo-color font-medium">M</div>
                    <div className="text-md mr-5 ml-1 w-8 h-auto border rounded-md logo-color font-medium">Y</div>
                </div>
            </div>
            <div className="w-full h-1/2">
                <Chart key={headerData.name} data={timeSeries} />
            </div> 
            <div className="w-full h-1/5 mx-auto">
                <KeyStats data={stats} />
            </div>
            <div className="w-full h-full">
                <p className="text-2xl font-medium logo-color mb-2">Related Articles</p>
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