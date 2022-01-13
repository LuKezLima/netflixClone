import React, {useState} from "react";
import './MovieRow.css'


export default ({title, items}) => {
    const [scrollX, setscrollX] = useState(0)

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2)
        if(x > 0){
            x = 0
        } 
        setscrollX(x)
    }
    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2)
        let listW = items.results.length * 150;
        if((window.innerWidth - listW) > x){
            x = (window.innerWidth - listW) - 60
        }
        setscrollX(x)
    }



    return (
        <div className="movieRow">
            <h2>{title}</h2>

            <div className="movieRow--left" onClick={handleLeftArrow}>
            <i class="fas fa-chevron-left" style={{fontSize: 30}}></i>
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
            <i class="fas fa-chevron-right" style={{fontSize: 30}}></i>
            </div>

            <div className="movieRow--listarea">

                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>

                {items.results.length > 0 && items.results.map((item,key)=>(
                    <div key={key} className="movieRow--item">
                        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt="item.original_title" />
                    </div>
                    
                ))}


                </div>


               
            </div>
        </div>
    )
}