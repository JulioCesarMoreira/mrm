#!/usr/bin/env bash

set -e

SSH_ENDPOINT='54.189.151.32'
SSH_USER='ec2-user'
DOCKER_IP='172.17.0.1'

chmod 600 ~/.ssh/mrm-rds-tunnel.pem

ssh -4 -N -L $DOCKER_IP:3306:mrm-mysql-dev.cluster-ccprilvyxwrp.us-west-2.rds.amazonaws.com:3306 $SSH_USER@$SSH_ENDPOINT -i ~/.ssh/mrm-rds-tunnel.pem
