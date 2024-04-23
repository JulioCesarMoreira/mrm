#!/usr/bin/env bash

set -e

SSH_ENDPOINT=
SSH_USER=
DOCKER_IP=

chmod 600 ~/.ssh/mrm-rds-tunnel.pem

ssh -4 -N -L $DOCKER_IP:3306:mrm-mysql-instance-1.${SECRET}.us-west-2.rds.amazonaws.com:3306 $SSH_USER@$SSH_ENDPOINT -i ~/.ssh/mrm-rds-tunnel.pem
