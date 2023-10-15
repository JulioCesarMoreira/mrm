@echo off

echo Iniciando docker-compose para mrm-mysql...
docker-compose up -d mrm-mysql

echo Iniciando docker-compose...
docker-compose up -d

echo Executando prisma:migrate...
docker exec -it mrm-backend pnpm -F backend prisma:migrate

echo Concluído!

echo o sistema está disponível em http://localhost:5173/