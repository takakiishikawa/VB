<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SegmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (DB::table('segments')->count() === 0) {
        //MajorSegmentをFKとする
        //columun= id, major_segment_idの2点
        //1つのmejor_segment_idに対して10のrecord生成
        $data=[];
        for($i=1; $i<=12; $i++){
            for($j=1; $j<=10; $j++){
                $data[] = ['major_segment_id' => $i];
            }
        }
        \DB::table('segments')->insert($data);
        }
    }
}
