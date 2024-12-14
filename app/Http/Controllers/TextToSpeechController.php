<?php

namespace App\Http\Controllers;

use Google\Cloud\TextToSpeech\V1\TextToSpeechClient;
use Google\Cloud\TextToSpeech\V1\AudioConfig;
use Google\Cloud\TextToSpeech\V1\SynthesisInput;
use Google\Cloud\TextToSpeech\V1\VoiceSelectionParams;

class TextToSpeechController extends Controller
{
    public function convert(Request $request)
    {
        $client = new TextToSpeechClient([
            'credentials' => ['api_key' => env('GOOGLE_CLOUD_API_KEY')]
        ]);

        $input = new SynthesisInput();
        $input->setText($request->text);
        
        $voice = new VoiceSelectionParams();
        $voice->setLanguageCode('en-US');
        
        $audioConfig = new AudioConfig();
        $audioConfig->setAudioEncoding(AudioEncoding::MP3);

        $response = $client->synthesizeSpeech($input, $voice, $audioConfig);
        
        return response()->json([
            'audio' => base64_encode($response->getAudioContent())
        ]);
    }
}