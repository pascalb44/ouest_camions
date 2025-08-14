<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

// Définir manuellement le basePath
$basePath = dirname(__DIR__);

// Créer une instance d'application AVANT configuration
$app = new Application($basePath);

// Déterminer quel fichier .env charger
$envFile = ($_SERVER['APP_ENV'] ?? $_ENV['APP_ENV'] ?? null) === 'testing'
    ? '.env.testing'
    : '.env';

// Forcer Laravel à charger le bon fichier d'environnement
$app->loadEnvironmentFrom($envFile);

// Continuer avec la configuration Laravel 11
return Application::configure(basePath: $basePath)
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
