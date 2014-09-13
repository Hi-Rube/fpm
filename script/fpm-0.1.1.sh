#!/bin/sh
if [ ! -d /tmp/fpm  ] 
then
mkdir /tmp/fpm
else
rm -rf /tmp/fpm
mkdir /tmp/fpm
fi
curl -o /tmp/fpm/fpm.tar.gz http://storage.fpmjs.org/fpm-0.1.1.tar.gz
tar -zxf /tmp/fpm/fpm.tar.gz -C /tmp/fpm
sh /tmp/fpm/fpm/script/install.sh

