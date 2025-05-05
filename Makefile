init-publish:
	docker context create pokedex-site --docker "host=ssh://root@168.231.80.181"
	docker context use pokedex-site
publish:
	docker context use pokedex-site
	docker-compose down --rmi all --remove-orphans
	docker system prune -a
	docker login https://ghcr.io
	docker compose -f ./docker-stack.yml up -d
publish-data:
	docker exec $(docker ps --filter "name=pokedex-laravel-docker" -q) sh -c "php artisan migrate:fresh --seed"