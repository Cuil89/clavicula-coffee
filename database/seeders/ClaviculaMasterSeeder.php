<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClaviculaMasterSeeder extends Seeder
{
    public function run(): void
    {
        $manifestPath = base_path('data/clavicula_master_manifest.json');
        $manifest = json_decode(file_get_contents($manifestPath), true);

        // 1. Seed Branches (Slawi HQ & Guci Hills) dengan Foto Depan Tempat masing-masing
        foreach ($manifest['branches'] as $branch) {
            DB::table('branches')->updateOrInsert(
                ['code' => $branch['code']],
                [
                    'name'                    => $branch['name'],
                    'badge_label'             => $branch['badge'],
                    'address'                 => $branch['address'],
                    'operating_hours_weekday' => $branch['hours'],
                    'operating_hours_friday'  => $branch['hours'],
                    'operating_hours_weekend' => $branch['hours'],
                    'whatsapp_number'         => $branch['whatsapp'],
                    'google_maps_url'         => $branch['google_maps_url'],
                    'hero_image_path'         => $branch['exterior_image_local'],
                    'supports_roastery_pickup'=> $branch['code'] === 'SLAWI',
                    'is_active'               => true,
                    'updated_at'              => now(),
                ]
            );
        }
    }
}
