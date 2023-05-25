import { useState } from "react";
import {newsData} from '../sample_data/newssample'
import './components.css';

export default function NewsCard(props) {
    
    return (
       <div className="w-5/6 mx-auto secondary-background mt-5">
            <div className="w-full text-lg logo-color">{newsData.title}</div>
            <img 
                src={newsData.urlToImage}
                className="h-1/3 w-full"
            />
            <div className="w-full h-1/3 text-sm logo-color">{newsData.description}</div>
       </div>
    );
}