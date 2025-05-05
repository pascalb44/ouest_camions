<?php

return [

    'paths' => ['api/*', 'admin/*', 'sanctum/csrf-cookie'],
    
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:3000',            // Local (fonctionne pour ton développement)
        'http://168.231.80.181',            // IP de ton site
        'http://srv807237.hstgr.cloud:8000' // Site en ligne
    ],


    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
