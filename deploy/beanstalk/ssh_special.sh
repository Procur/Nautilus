#!/bin/sh
/usr/bin/ssh -o StrictHostKeyChecking=no -i /data/keys/deploy_key "$@"
