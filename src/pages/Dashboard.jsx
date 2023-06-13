import './pages.css'
import React, {useState, useEffect} from "react"
import Chart from '../components/Chart'
import KeyStats from '../components/KeyStats'
import NewsCard from '../components/NewsCard'
import Search from '../components/Search'
import logout from '../images/logout.png'

export default function Dashboard(props){
    const [currentStock, setCurrentStock] = useState("")
    const [stockList, setStockList] = useState([])
    const [localList, setLocalList] = useState([])
    const [error, setError] = useState(false)
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

    const searchStock = async (e) => {
        e.preventDefault()
        try {
            let jwt = localStorage.getItem('token')
            let fetchResponse = await fetch("/api/data/retrieve", {
              method: "POST",
              headers: { "Content-Type": "application/json", "Authorization": 'Bearer: ' + jwt },
              body: JSON.stringify({ stock: currentStock })
            });
            if (fetchResponse.ok){
                let serverResponse = await fetchResponse.json()
                setHeaderData(serverResponse.general)
                setTimeSeries(serverResponse.timeSeries)
                setStats(serverResponse.keyMetrics)
                setNews(serverResponse.news)
                setError(false)
            }
            else {
                throw new Error("Stock not found")
            }
        } catch (err) {
            setError(true)
        }
    }

    const handleLogOut = async () => {
        localStorage.removeItem('token')
        props.setUserInState(null)
    }

    useEffect(() => {
        async function fetchData(){
            try {
                let jwt = localStorage.getItem('token')
                let fetchResponse = await fetch("/api/data/getStocks", {
                    method: "GET",
                    headers: { "Content-Type": "application/json", "Authorization": 'Bearer: ' + jwt }
                })
                if (fetchResponse.ok){
                    let serverResponse = await fetchResponse.json()
                    console.log("Success:", serverResponse)
                    setStockList(serverResponse)
                    setError(false)
                }
                else{
                    throw new Error(fetchResponse)
                }

              } 
              catch (err) {
                setError(true)
                console.log(err)
              }
        }
        fetchData()
    }, []) 

    return(
        <main className="h-screen w-screen overflow-x-hidden main-background sm:flex sm:overflow-hidden">
            <div className="sm:w-3/4">
                <div className="flex w-5/6 h-1/6 mx-auto my-10 justify-between items-center sm:my-0">
                    <div className="text-5xl cursor-default font-semibold"><span className="logo-color">Tendie</span>.</div>
                    <img src={logout} className="h-8 w-auto cursor-pointer transition ease-in-out duration-300 hover:opacity-70" onClick={handleLogOut}></img>
                </div>
                <Search 
                    searchStock={searchStock} 
                    stockList={stockList} 
                    setLocalList={setLocalList} 
                    currentStock={currentStock}
                    setCurrentStock={setCurrentStock} 
                    localList={localList}/>
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
                        <NewsCard key={article.url} data={article}></NewsCard>
                    )) : ""
                }
            </div>
        </main>
    )
}