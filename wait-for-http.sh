#!/usr/bin/env bash

set -e

TIMEOUT=15
INTERVAL=2
URL=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        -t|--timeout)
            TIMEOUT="$2"
            shift 2
            ;;
        -i|--interval)
            INTERVAL="$2"
            shift 2
            ;;
        *)
            URL="$1"
            shift
            ;;
    esac
done

if [ -z "$URL" ]; then
    echo "No URL specified to wait for."
    exit 1
fi

echo "Waiting for $URL..."

SECONDS=0
while true; do
    if curl -s --head "$URL" | grep "200 OK" > /dev/null; then
        echo "Service is up!"
        break
    fi

    if [ $SECONDS -ge $TIMEOUT ]; then
        echo "Timeout while waiting for $URL"
        exit 1
    fi

    sleep $INTERVAL
done

exec "$@"
