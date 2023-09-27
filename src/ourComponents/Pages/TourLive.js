import axios from 'axios'
import Map from '../Map/Map.js'
import { Link, useParams } from 'react-router-dom';
import './Pages.css';
import { useEffect, useState } from 'react';
import PointOfInterestCard from './PointOfInterestCard.js';
import './Pages.css';

const API = process.env.REACT_APP_API_URL;

export default function Tour() {
    const [tour, setTour] = useState({})
    const [pointsOfInterest, setPointsOfInterest] = useState([])
    const [allPointsOfInterest, setAllPointsOfInterest] = useState([])

    // const [date, setDate] = useState([])

    const { id } = useParams()
    console.log(id)

    // let speech = new SpeechSynthesisUtterance();
    // let synth = window.speechSyntehsis

    useEffect(() => {
        axios.get(`${API}/tours/${id}`)
            .then((res) => {
                setTour(res.data)
                console.log(res.data)
                setPointsOfInterest(res.data.ordered_points_of_interest)
            })
            .catch((e) => console.warn(e))
    }, [id])

    useEffect(() => {
        axios.get(`${API}/pointsOfInterest`)
            .then((res) => {
                setAllPointsOfInterest(res.data)
            })
            .catch((e) => console.warn(e))
    }, [])

    console.log(allPointsOfInterest)

    // const stringToDate = (string) => {
    //     setDate(new Date(string)) 
    //     console.log(date)
    // }

    // useEffect(()=>{
    //     stringToDate("2023-08-21T15:30:00.000Z")
    //     console.log(date)
    // },[z])

    console.log(tour, pointsOfInterest)

    // let textToSpeech1 = (textParam) => {
    //     if(!synth.speaking && !synth.paused){
    //         speech.text= textParam || "TESTING. DUMMY DATA"
    //         speech.rate = 0.75
    //         synth.speak(speech)
    //     } else {
    //         synth.paused ? synth.resume() : synth.pause();
    //     }
    // }

    // let speechStop = () => {
    //     synth.cancel()
    // }



  
    return (
        <div className='tourLive'>
            <div className="relative h-10 w-[200px] ...">
                <button className="absolute left-0 top-0 h-16 w-[200px] font-extrabold text-sky-950 ..."><Link to='/tours'>🔙 ALL TOURS</Link></button>
            </div>
            <div className="TourLive-content">
                <h1 className='mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-cyan-600 from-sky-950'>{tour.city}, {tour.state ? `${tour.state},` : null} {tour.country}</h1>
                <h4 className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Welcome to your {tour.tour_name}</h4>
                {/* <p>Created on { }</p> */}
                <br />
                <div className="grid grid-cols-2 gap-7">
                    <div>
                        <h2 className="text-4xl font-bold dark:text-white text-sky-950">Points of Interest:</h2>
                        <ul>
                            {
                                pointsOfInterest.map((poi, index) => {
                                    return <PointOfInterestCard poi={poi} key={index} />
                                })
                            }
                        </ul>
                    </div>
                    <figure className="max-w-lg">
                        {/* <img src={tour.image_url} alt={tour.city} className="h-auto max-w-full rounded-lg" /> */}
                        <Map className="h-auto max-w-full rounded-lg" pointsOfInterest={pointsOfInterest} allPointsOfInterest={allPointsOfInterest} />
                        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">{tour.city}, {tour.state ? `${tour.state},` : null} {tour.country} Google Images©</figcaption>
                    </figure>
                </div>
            </div>
        </div>
    )
}
