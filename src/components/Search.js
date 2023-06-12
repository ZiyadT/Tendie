import { useState, useEffect } from "react";
import search from '../images/search.png'
import './components.css';

export default function Search(props) {

    useEffect(() => {
        let similar = []
        console.log(props.currentStock)
        for (let i = 0; i < props.stockList.length; i++){
            if (props.stockList[i].symbol.includes(props.currentStock)){
                similar.push(props.stockList[i])
            }
        }
        props.setLocalList(similar)
    })
    
    return (
       <div className="mx-auto w-5/6">
            <form className="flex justify-between sm:justify-start" onSubmit={props.searchStock}>
                <input 
                    type="text" list="stocks" placeholder="Search stock..." 
                    className="border-b w-full bg-transparent main-line focus:outline-none text-color sm:w-1/4" 
                    onChange={props.handleChange} required>
                </input>
                <button type="submit">
                    <img src={search} 
                        className="w-10 h-auto border-b main-line cursor-pointer transition ease-in-out duration-300 hover:opacity-70">
                    </img>
                </button>
            </form>
            <div className="w-5/6 border-r border-l border-b z-10 absolute bg-white sm:w-1/6">
                    {props.currentStock.length <= 1 ? null : props.localList.map((item) => <div className="text-color">{item.symbol}</div>)}
            </div>
       </div>
    );
}