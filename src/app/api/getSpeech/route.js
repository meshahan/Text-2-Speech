import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request){
    try{
        const body = await request.json();
        const {text, voice} = body;
        if(!text || !voice){
            return NextResponse.json(
                {error: "Missing text or voice parameter"},
                {status: 400}
            )
        }

        const options = {
            method: 'POST',
            url: 'https://realistic-text-to-speech.p.rapidapi.com/v3/generate_voice_over_v2',
            headers: {
              'x-rapidapi-key': process.env.API_KEY,
              'x-rapidapi-host': 'realistic-text-to-speech.p.rapidapi.com',
              'Content-Type': 'application/json'
            },
            data: {
              voice_obj: voice,
              json_data: [
                {
                  block_index: 0,
                  text: text
                }
              ]
            }
          };

        const response = await axios.request(options);
        return NextResponse.json(response.data);

    } catch(error){
        return NextResponse.json(
            {error: "Failed to fetch speech data."},
            {status: 500}
        );
    }
}