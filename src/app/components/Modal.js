"use client";
import { useEffect, useRef, useState } from "react";

export default function Modal({ setShowModal, url}){
    const audioRef = useRef(new Audio(url));
    const [isPlaying, setIsplaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(()=>{
        const audio = audioRef.current;
        audio.addEventListener('timeupdate', updateCurrentTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleAudioEnd);

        return ()=>{
            audio.removeEventListener('timeupdate', updateCurrentTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleAudioEnd);
        }
    }, []);

    const handlePlay = ()=>{
        const audio = audioRef.current;
        audio.play();
        setIsplaying(true);
    }

    const handlePause = ()=>{
        const audio = audioRef.current;
        audio.pause();
        setIsplaying(false);
    }

    const handleClose = ()=>{
        handlePause();
        setShowModal(false);
    }

    const updateCurrentTime = ()=>{
        setCurrentTime(audioRef.current.currentTime);
    }

    const updateDuration = ()=>{
        setDuration(audioRef.current.duration);
    }

    const handleAudioEnd = ()=>{
        setIsplaying(false);
        setCurrentTime(0);
    }

    const formatTime = (time)=>{
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center" role="dialog" aria-modal='true'>
            <div className="bg-white text-black p-6 rounded-lg shadow-lg relative w-96 text-center">
                <h2 className="mb-5 text-xl font-semibold">Download Audio</h2>
                <div className="mb-5">
                    <div className="flex justify-center items-center mb-5">
                        {isPlaying ? (
                            <button className="bg-blue-600 text-white px-4 py-2 mx-1 rounded hover:bg-blue-700 transition-colors duration-300" onClick={handlePause}>Pause</button>
                        ): (<button className="bg-blue-600 text-white px-4 py-2 mx-1 rounded hover:bg-blue-700 transition-colors duration-300" onClick={handlePlay}>Play</button>)}
                        <a className="bg-blue-600 text-white px-4 py-2 mx-1 rounded hover:bg-blue-700 transition-colors duration-300" href={url}>Download</a>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>{formatTime(currentTime)}</span>
                        <input
                            type="range"
                            min="0"
                            max={duration}
                            value={currentTime}
                            onChange={(e) => (audioRef.current.currentTime = e.target.value)}
                            className="flex-grow mx-3"
                        />
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
                <button className="absolute top-2 right-2 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-2xl w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300" onClick={handleClose}>
                    &times;
                </button>
            </div>
        </div>
    )
}