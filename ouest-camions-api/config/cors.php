<?php

return [

    'paths' => ['api/*', 'admin/*', 'sanctum/csrf-cookie'],
    
    'allowed_methods' => ['*'],

//   'allowed_origins' => ['http://localhost:3000'],
    'allowed_origins' => ['http://168.231.80.181'],

//  'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
