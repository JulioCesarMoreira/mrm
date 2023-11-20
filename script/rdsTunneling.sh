#!/usr/bin/env bash

set -e

SSH_ENDPOINT='34.216.175.99'
SSH_USER='ec2-user'
DOCKER_IP='172.17.0.1'

chmod 600 ~/.ssh/mrm-rds-tunnel.pem

ssh -4 -N -L $DOCKER_IP:3306:mrm-mysql-instance-1.ccprilvyxwrp.us-west-2.rds.amazonaws.com:3306 $SSH_USER@$SSH_ENDPOINT -i ~/.ssh/mrm-rds-tunnel.pem
