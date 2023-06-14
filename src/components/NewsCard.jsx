import './components.css';

export default function NewsCard(props) {
    
    return (
        <a href={props.data.url} target="_blank" rel="noreferrer">
            <div className="w-5/6 p-2 mx-auto rounded-lg secondary-background mt-5 opacity-70 transition ease-in-out duration-300 hover:opacity-100">
                <div className="w-full text-lg font-semibold logo-color">{props.data.title}</div>
                <img 
                    src={props.data.urlToImage}
                    alt="NewsImage"
                    className="h-1/3 w-full my-2"
                />
                <div className="w-full h-1/3 text-sm logo-color">{props.data.description}</div>
            </div>
        </a>    
    );
}