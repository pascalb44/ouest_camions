init-publish:
	docker context create ouestcamions --docker "host=ssh://root@168.231.80.181"
	docker context use ouestcamions
publish:
	docker context use ouestcamions
	docker-compose down --rmi all --remove-orphans
	docker system prune -a
	docker login https://ghcr.io
	docker compose -f ./docker-stack.yml up -d
publish-data:
	docker exec $(docker ps --filter "name=ouestcamions-laravel-docker" -q) sh -c "php artisan migrate:fresh --seed"

