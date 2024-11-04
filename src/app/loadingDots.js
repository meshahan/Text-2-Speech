export default function LoadingDots(){
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center z-50 rounded-lg">
            <div className="flex justify-center items-center">
                <div className="w-2.5 h-2.5 bg-gray-800 rounded-full m-1.5 animate-bounce-size"></div>
                <div className="w-2.5 h-2.5 bg-gray-800 rounded-full m-1.5 animate-bounce-size delay-200"></div>
                <div className="w-2.5 h-2.5 bg-gray-800 rounded-full m-1.5 animate-bounce-size delay-[400]"></div>
            </div>
        </div>
    )
}