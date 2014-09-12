#!/bin/sh
echo "Begin Insall ..."

fpm_path=/usr/local/bin/fpm
fib_modules=/usr/local/lib/fib_modules/.modules/fpm
if [ ! -d $fib_modules ]; then
	sudo mkdir -pv $fib_modules
else 
	sudo rm -rf $fib_modules
	sudo mkdir -pv $fib_modules
fi

if [ -L $fpm_path ]; then
	sudo rm $fpm_path
fi
sudo cp -rf ../* $fib_modules
sudo ln -s "$fib_modules"/bin/index.js $fpm_path 

echo "...Install Finish"
