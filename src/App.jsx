import React, {useEffect, useState} from "react";
import './App.css'

import Tmdb from "./Tmdb";

import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default ()=>{

    const [movieList, setMovieList] = useState([])
    const [featuredData, setfeaturedData] = useState(null)
    const [blackHeader, setblackHeader] = useState(false)

    useEffect( () => {
        const loadAll = async ()=> {
            // Pegando a lista total
            let list = await Tmdb.getHomeLista();
            setMovieList(list)

            // Pegando filme destaque
            let originals = list.filter(i=> i.slug==='originals')
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1))
            let chosen = originals[0].items.results[randomChosen]
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
            setfeaturedData(chosenInfo)
        }

        loadAll();
        
    },[])

    useEffect(()=>{
        const scrollListener = () => {
            if(window.scrollY > 30){
                setblackHeader(true)
            } else {
                setblackHeader(false)
            }
        }

        window.addEventListener('scroll', scrollListener)

        return () => {
            window.removeEventListener('scroll', scrollListener)
        }
    },[])

    return (
        <div className="page">

            <Header black={blackHeader}/>


            {featuredData && 
                <FeaturedMovie item={featuredData}></FeaturedMovie>
            }

           <section className="lists">
               {movieList.map((item, key)=>(
                   <MovieRow key={key} title={item.title} items={item.items}/>
               ))}
           </section>

           <footer>
               Feito com <span role="img" aria-label="coração">❤️</span> pela B7Web<br/>
               Direitos de imagem para Netflix<br/>
               Dados pegos do site Themoviedb.org

           </footer>


                {movieList.length <= 0 && 
           <div className="loading">
               <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="loading" />
           </div>
}
        </div>
    )
}