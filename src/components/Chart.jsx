import { useState } from "react";
import { AreaChart, ResponsiveContainer, Tooltip, Area, XAxis, YAxis } from 'recharts'
import {timeSeries} from '../sample_data/stocksample'
import './components.css';

export default function Chart(props) {
    const [data, setData] = useState(props.data)
    const [filter, setFilter] = useState('1D')

    return (
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
    );
}