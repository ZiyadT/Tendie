import { useState } from "react";
import {stockData} from '../sample_data/stocksample'
import './components.css';

export default function KeyStats(props) {
    
    return (
       <div className="flex justify-between">
            <ul className="mx-3 logo-color">
                <li className="my-2">Open: {stockData.open}</li>
                <li className="my-2">Low: {stockData.low}</li>
                <li className="my-2">High: {stockData.high}</li>
                <li className="my-2">Dividends: {stockData.dividends}</li>
            </ul>
            <ul className="mx-3 logo-color">
                <li className="my-2">P/E: {stockData.pe}</li>
                <li className="my-2">EPS: {stockData.eps}</li>
                <li className="my-2">Market Cap: {stockData.mcap}</li>
                <li className="my-2">Free Cash Flow: {stockData.fcf}</li>
            </ul>
       </div>
    );
}