import { useState, useEffect } from "react";
import { AreaChart, ResponsiveContainer, Tooltip, Area, XAxis, YAxis } from 'recharts'
import {timeSeries} from '../sample_data/stocksample'
import './components.css';

export default function Chart(props) {
    const [data, setData] = useState(props.data[0])
    const [filter, setFilter] = useState('1day')

    useEffect(() => {
        console.log(data)
    })

    const handleFilterChange = async (evt) => {
        const legend = {
            D: "1day",
            W: "1week",
            M: "1month" 
        }

        let selected = legend[evt.target.textContent]

        if (selected == '1day'){
            setData(props.data[0])
        }
        else if (selected == "1week"){
            setData(props.data[1])
        }
        else {
            setData(props.data[2])
        }
        
        setFilter(legend[evt.target.textContent])
    }

    return (
        <div>
            <div className="flex justify-between w-5/6 mx-auto mt-2">
                <p className={`${props.header.name.length + props.header.ticker.length >= 21 ? "text-sm" : "text-xl"} sm:text-xl font-medium logo-color mx-5`}>{props.header.name} ({props.header.ticker})</p>
                <div className="flex">
                    <div className={"text-sm mx-1 w-6 h-6 border rounded-md main-line logo-color font-medium " + (filter == "1day" ? "active" : "")} onClick={handleFilterChange}>D</div>
                    <div className={"text-sm mx-1 w-6 h-6 border rounded-md main-line logo-color font-medium " + (filter == "1week" ? "active" : "")} onClick={handleFilterChange}>W</div>
                    <div className={"text-sm mx-1 w-6 h-6 border rounded-md main-line logo-color font-medium " + (filter == "1month" ? "active" : "")} onClick={handleFilterChange}>M</div>
                </div>
            </div>
            <ResponsiveContainer width="99%" height={400}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FFE1C6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#FFE1C6" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#312e81" 
                        fillOpacity={1} 
                        strokeWidth="0.5"
                        fill="url(#chartColor)"
                    />
                    <Tooltip />
                    <XAxis dataKey={"date"} fontSize={10} />
                    <YAxis domain={["datMin", "dataMax"]} fontSize={10} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}