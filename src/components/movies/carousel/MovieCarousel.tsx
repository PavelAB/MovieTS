import { useEffect, useState } from "react"
import { useMoviesByPersonID } from "../../../hooks/useMovie"
import { Movie } from "../../../types/Movie"
import { Swiper, SwiperSlide } from "swiper/react"

import { Navigation, Pagination, Scrollbar, Virtual } from "swiper/modules"

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const MovieCarousel: React.FC<{ID_Person: number}> = ({ID_Person}) => {

    const shouldFetch: boolean = ID_Person? true : false
    const [carouselMoviesArray, setCaroucelMoviesArray] = useState<Movie[]>([])

    const [slidesPerViewSize, setSlidesPerViewSize] = useState<number>(1)

    const {data: moviesByPersonResponse} = useMoviesByPersonID(ID_Person, shouldFetch)

    useEffect(()=>{
        if(moviesByPersonResponse){
            setCaroucelMoviesArray(moviesByPersonResponse.data)
        }
    },[moviesByPersonResponse])

    useEffect(()=>{
        setLengthMovieSwiper()
    }, [carouselMoviesArray])

    useEffect(() => {
        updateSlidesPerView()
        window.addEventListener("resize", updateSlidesPerView)
    
        return () => {
          window.removeEventListener("resize", updateSlidesPerView)
        }
    }, [])

    function updateSlidesPerView():void{
        const width = window.innerWidth
    
        if (width >= 1024) {
            setSlidesPerViewSize(3)
        } else if (width >= 640) {
            setSlidesPerViewSize(2)
        } else {
            setSlidesPerViewSize(1)
        }
      };

    function setLengthMovieSwiper(): void {
        const width = window.innerWidth

        if(carouselMoviesArray.length > 3 && width >= 1024)
            setSlidesPerViewSize(3)
        else
            setSlidesPerViewSize(carouselMoviesArray.length)
    }

    console.log("length -->", carouselMoviesArray.length, carouselMoviesArray)
    
    return (
        <div className="">
            <Swiper
                className="w-[350px] sm:w-[640px] lg:w-[900px] h-[350px]"
                modules={[Navigation, Pagination, Scrollbar, Virtual]}
                spaceBetween={50}
                slidesPerView={slidesPerViewSize}
                navigation
                pagination={{
                    clickable: true
                }}
                virtual>
                    {
                        carouselMoviesArray.map((movie: Movie, index) => {
                            return  <SwiperSlide key={movie.ID_Movie} virtualIndex={index} className="items-center">
                                        <div className="flex flex-col items-center justify-center gap-5 h-full">
                                            <img
                                                src={`http://localhost:8080${movie.cover as string}`}
                                                className={`object-contain rounded-lg max-h-[70%]`}
                                            />
                                            <p className="flex justify-center px-[10px]">{movie.title}</p>
                                        </div>
                                    </SwiperSlide>
                        })
                    }
            </Swiper>
        </div>
    )
}

export default MovieCarousel