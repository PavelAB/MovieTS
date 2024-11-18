import { useEffect, useState } from "react"
import { useMoviesByPersonID } from "../../../hooks/useMovie"
import { Movie } from "../../../types/Movie"
import { Swiper, SwiperSlide } from "swiper/react"

import { Navigation, Virtual } from "swiper/modules"

import 'swiper/css'
import 'swiper/css/navigation'


const MovieCarousel: React.FC<{ID_Person: number}> = ({ID_Person}) => {

    const shouldFetch: boolean = ID_Person? true : false
    const [carouselMoviesArray, setCaroucelMoviesArray] = useState<Movie[]>([])

    const {data: moviesByPersonResponse} = useMoviesByPersonID(ID_Person, shouldFetch)

    useEffect(()=>{
        if(moviesByPersonResponse)
            setCaroucelMoviesArray(moviesByPersonResponse.data)
    },[moviesByPersonResponse])

    console.log("length -->", carouselMoviesArray.length, carouselMoviesArray)
    
    return (
        <div className="border border-red-600">
            <Swiper
                className="w-[350px] h-[350px] border border-blue-600"
                modules={[Navigation, Virtual]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                virtual>
                    {
                        carouselMoviesArray.map((movie: Movie, index) => {
                            return  <SwiperSlide key={movie.ID_Movie} virtualIndex={index} className="items-center">
                                        <div className="border border-red-700 flex flex-col items-center justify-center gap-10 h-full">
                                            <img
                                                src={`http://localhost:8080${movie.cover as string}`}
                                                className={`object-contain rounded-lg max-h-[100px]`}
                                            />
                                            <p className="border border-green-500 flex justify-center">{movie.ID_Movie}</p>
                                        </div>
                                    </SwiperSlide>
                        })
                    }
            </Swiper>
        </div>
    )
}

export default MovieCarousel