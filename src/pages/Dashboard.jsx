import './pages.css'
import React, {useState} from "react"
import Chart from '../components/Chart'
import KeyStats from '../components/KeyStats'
import NewsCard from '../components/NewsCard'
import { generalData } from '../sample_data/stocksample'
import logout from '../images/logout.png'
import search from '../images/search.png'


export default function Dashboard(props){

    const handleLogOut = async () => {
        localStorage.removeItem('token')
        props.setUserInState(null)
    }

    const printData = async () => {
        console.log(112)
    }

    return(
        <main className="h-screen w-screen overflow-x-hidden main-background">
            <div className="flex w-5/6 h-1/6 mx-auto justify-between items-center">
                <div className="text-5xl cursor-default font-semibold"><span className="logo-color">Tendie</span>.</div>
                <img src={logout} className="h-1/4 w-auto cursor-pointer" onClick={handleLogOut}></img>
            </div>
            <div className="w-5/6 mx-auto flex justify-between">
                <input type="text" placeholder="Search stock..." className="w-full border-b bg-transparent main-line focus:outline-none text-color"></input>
                <img src={search} className="w-10 h-auto cursor-pointer" onClick={printData}></img>
            </div>
            <div className="flex justify-between w-full mx-auto mt-2">
                <p className="text-xl font-medium logo-color mx-5">{generalData.name} ({generalData.ticker})</p>
                <div className="flex">
                    <div className="text-md mx-1 w-8 h-auto border rounded-md logo-color font-medium hover:">D</div>
                    <div className="text-md mx-1 w-8 h-auto border rounded-md logo-color font-medium">M</div>
                    <div className="text-md mr-5 ml-1 w-8 h-auto border rounded-md logo-color font-medium">Y</div>
                </div>
            </div>
            <div className="w-full h-1/2">
                <Chart />
            </div> 
            <div className="w-full h-1/5 mx-auto">
                <KeyStats />
            </div>
            <div className="w-full h-full">
                <p className="text-2xl font-medium logo-color mb-2">Related Articles</p>
                <NewsCard />
                <NewsCard />
            </div>
        </main>
    )
}