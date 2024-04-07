<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class ParseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        {
            $partsOfSpeech = [
                'Adjective',
                'Adverb',
                'Noun',
                'Verb',
                'Pronoun',
                'Preposition',
                'Conjunction',
                'Article',
                'Numeral',
                'Auxiliary Verbs',
            ];
    
            foreach ($partsOfSpeech as $pos) {
                DB::table('parses')->insert([
                    'name' => $pos,
                ]);
            }
        }
    }
}
