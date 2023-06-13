import { useState, useEffect } from "react";
import search from '../images/search.png';
import './components.css';

export default function Search(props) {
    const [focused, setFocused] = useState(false)
    const [text, setText] = useState("")

    useEffect(() => {
        let similar = []
        for (let i = 0; i < props.stockList.length; i++){
            if (props.stockList[i].symbol.toLowerCase().startsWith(props.currentStock.toLowerCase())){
                similar.push(props.stockList[i])
            }
        }
        props.setLocalList(similar)
    }, [props.currentStock])

    return (
       <div className="mx-auto w-5/6 relative">
            <form className="flex justify-between sm:justify-start sm:w-1/4" onSubmit={props.searchStock}>
                <input 
                    type="text" list="stocks" placeholder="Search stock..." value={props.currentStock}
                    className="w-full bg-transparent focus:outline-none text-color border-b main-line" 
                    onChange={(e) => props.setCurrentStock(e.target.value)} 
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    required>
                </input>
                <button type="submit">
                    <img src={search} 
                        className="w-10 h-auto cursor-pointer transition ease-in-out duration-300 border-b main-line hover:opacity-70">
                    </img>
                </button>
            </form>
            <div className={`${focused ? "" : "hidden "}w-full absolute z-10 max-h-48 overflow-y-scroll secondary-background sm:w-1/4`}>
                    {props.currentStock.length <= 1 ? null : props.localList.map((item) => 
                        <div key={item.symbol} onMouseDown={() => props.setCurrentStock(item.symbol)} className="text-color p-2 text-sm transition ease-in-out cursor-pointer hover:bg-orange-200 hover:text-orange-900">
                            <span className="font-semibold float-left">{item.symbol}</span>
                            {item.name.length > 21 ? item.name.substring(0, 21) + "..." : item.name} 
                            <span className="text-xs float-right">{item.exchange}</span>
                        </div>
                    )}
            </div>
       </div>
    );
}