import { useState } from "react";
import {newsData} from '../sample_data/newssample'
import './components.css';

export default function NewsCard(props) {
    
    return (
        <a href={props.data.url} target="_blank">
            <div className="w-5/6 mx-auto secondary-background mt-5">
                <div className="w-full text-lg logo-color">{props.data.title}</div>
                <img 
                    src={props.data.urlToImage}
                    className="h-1/3 w-full"
                />
                <div className="w-full h-1/3 text-sm logo-color">{props.data.description}</div>
            </div>
        </a>    
    );
}