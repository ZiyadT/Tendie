
import './components.css';

export default function KeyStats(props) {
    
    return (
       <div className="flex justify-between">
            <ul className="mx-3 logo-color">
                <li className="my-2">Open: {props.data.open}</li>
                <li className="my-2">Low: {props.data.low}</li>
                <li className="my-2">High: {props.data.high}</li>
                <li className="my-2">Change: {props.data.change}</li>
            </ul>
            <ul className="mx-3 logo-color">
                <li className="my-2">52W High: {props.data.fiftytwohigh}</li>
                <li className="my-2">52W Low: {props.data.fiftytwolow}</li>
                <li className="my-2">Previous Close: {props.data.prevClose}</li>
                <li className="my-2">Volume: {props.data.volume}</li>
            </ul>
       </div>
    );
}