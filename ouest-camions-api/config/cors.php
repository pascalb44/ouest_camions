<?php

return [

    'paths' => ['api/*', 'admin/*', 'sanctum/csrf-cookie'],
    
    'allowed_methods' => ['*'],

//   'allowed_origins' => ['http://localhost:3000'], //local = ok
// 'allowed_origins' => ['http://168.231.80.181'],   //site =  non

// 'allowed_origins' => ['http://srv807237.hstgr.cloud:8000'], //site



    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
