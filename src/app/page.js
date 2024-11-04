"use client"
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import LoadingDots from "./loadingDots";
import modelList from "./model.json"


export default function Home() {
  const [text, setText] = useState("")
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [filteredModels, setFilteredModels] = useState([])
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");

  const [voices, setVoices] = useState([]);

  useEffect(()=>{
    setVoices(modelList["voices_list"])
  }, [])

  useEffect(()=>{
    const filtered = voices.filter(
      (voice) =>
      (selectedGender ? voice.gender === selectedGender : true) && (selectedLanguage ? voice.language === selectedLanguage : true) && (selectedCountry ? voice.country === selectedCountry : true)
    );
    setFilteredModels(filtered);
  }, [selectedGender, selectedLanguage, selectedCountry]);

  const handleClear = ()=>{
    setText("");
  }
  const handleGetAudio = async()=>{
    if(!selectedName){
      setMessage("Please select a model...");
      return;
    }
    setMessage("");
    setIsLoading(true)
    const modelArr = filteredModels.filter(model => model.name === selectedName);
    const {country, ...model} = modelArr[0];

    try{
      const response = await fetch("/api/getSpeech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          voice: model
        })
      });

      if(!response.ok){
        throw new Error("API request failed...");
      }
      const data = await response.json();
      if(data && data.length > 0 && data[0].link){
        setUrl(data[0].link);
        setShowModal(true);
        setText("");
      } else {
        throw new Error("Invalid response format...");
      }

    } catch (error){
        setMessage("Failed to fetch...");
    } finally {
        setIsLoading(false);
    }
  }

  const uniqueValues = (key) => [...new Set(voices.map((voice) => voice[key]))]
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-5">
      <Header />
      <div className="grid grid-cols-2 grid-rows-[4fr,1fr] gap-5 p-5 bg-white rounded-lg shadow-lg w-[1300px] h-[620px] max-md:grid-cols-1 max-md:w-full max-md:h-full">
        <div className="grid grid-rows-[44px,1fr] row-span-full">
          <div className="pl-2 border border-gray-300 rounded-t-lg bg-gray-100 flex justify-end items-center">
            <button className="px-4 py-2 text-lg font-medium bg-blue-600 text-white rounded-tr-lg transition duration-300 hover:bg-blue-700" onClick={handleClear}>
              Clear
            </button>
          </div>
          <textarea 
            className="w-full h-full p-4 text-base mb-5 rounded-b-lg border text-black border-gray-300 shadow-inner bg-gradient-to-br from-white to-gray-200 transition duration-300 focus:border-blue-600 focus:shadow focus:shadow-blue-200 focus:outline-none focus:bg-gradient-to-br"
            placeholder="Enter your text here..."
            value={text}
            onChange={(e)=> setText(e.target.value)}
          />
        </div>
        <div className="relative flex flex-col items-center justify-center gap-4 h-[70%] p-5 bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg shadow-lg before:content-['Voice_Filter'] before:absolute before:top-[-10px] before:left-[-10px] before:bg-blue-600 before:text-white before:px-2 before:rounded before:font-bold before:text-sm before:shadow-md max-md:h-full max-md:py6">
          <select
            className="w-full p-3 text-base rounded-lg border border-gray-300 bg-white text-black"
            value={selectedGender}
            onChange={(e)=> setSelectedGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            {uniqueValues("gender").sort().map((gender, index)=> (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
          </select>
          <select
            className="w-full p-3 text-base rounded-lg border border-gray-300 bg-white text-black"
            value={selectedLanguage}
            onChange={(e)=> setSelectedLanguage(e.target.value)}
          >
            <option value="">Select Language</option>
            {uniqueValues("language").sort().map((language, index)=> (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
          <select
            className="w-full p-3 text-base rounded-lg border border-gray-300 bg-white text-black"
            value={selectedCountry}
            onChange={(e)=> setSelectedCountry(e.target.value)}
          >
            <option value="">Select Country</option>
            {uniqueValues("country").sort().map((country, index)=> (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          <select
            className="w-full p-3 text-base rounded-lg border border-gray-300 bg-white text-black"
            value={selectedName}
            onChange={(e)=> setSelectedName(e.target.value)}
          >
            <option value="">Select Model</option>
            {filteredModels.map((voice, index)=> (
              <option key={index} value={voice.name}>
                {voice.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col justify-end">
            <div className="text-red-600 text-center text-lg font-bold">
              {message}
            </div>
            <button className="px-5 py-3 text-lg font-bold mt-4 rounded-lg bg-blue-600 text-white cursor-pointer transition duration-300 hover:bg-blue-700 shadow-lg flex items-center justify-center relative h-[60%]"
            onClick={handleGetAudio}
            disabled={isLoading}
            >
              {isLoading ? <LoadingDots />: "Get Audio"}
            </button>
        </div>
      </div>
      {showModal && url && <Modal setShowModal={setShowModal} url={url}/>}
    </div>
  );
}