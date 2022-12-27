#!/bin/bash
sudo apt-get install dos2unix
: ${SLEEP_LENGTH:=2}
# wait for db docker to start
wait_for() {
	echo Waiting for $1 to listen on $2...
	while ! nc -z $1 $2; do echo sleeping; sleep $SLEEP_LENGTH; done
}

for var in "$@"
do
	host=${var%:*}
	port=${var#*:}
	wait_for $host $port
done
mkdir -p /app-backend/storage/files
mkdir -p /app-backend/storage/baseforms
mkdir -p /app-backend/storage/convertedforms
chmod -R 777 /app-backend/storage

echo "running node app"
npm run dev
