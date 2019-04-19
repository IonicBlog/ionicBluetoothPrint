
ionic cordova plugin add ../BluetoothSerial

ionic cordova platform rm android

ionic cordova platform add android@6

ionic cordova build android


adb install /Users/tonge/Repos/ionicBluetoothPrint/platforms/android/build/outputs/apk/debug/android-debug.apk



ionic cordova run android




# What is this?
-This is an ionic 2+ app



# What can this app do?
-Print on mini bluetooth printer with ionic 2+ app.

-Last check, I was able to print on a lot of the standard bluetooth receipt printer

-Works on both ios and android.

-Does not work on ionic serve, you have to compile the app and run it on a device

-Example: For pos system, for parking summons. 



# How to start?
1. Install Ionic and npm

2. Install ionic native bt serial. See this link:
https://ionicframework.com/docs/native/bluetooth-serial/

3. All the stuff are in the home.ts and in the providers/print/print.ts files 

-The files are quite self explanatory, but if you need any help, hit me up on twitter @razmans



# Future TO DO
-Print bit based data

-Print bitmap images



# Contributions
Bitcoin: 1Bd2e8NjjGMTzULcFLQgQVFpAvUu15FJUC

Paypal: http://paypal.me/razmansarit


/Users/eliteenergy/Repos/ionicBluetoothPrint/plugins/cordova-plugin-bluetooth-serial/src/android/com/megster/cordova/BluetoothSerial.java

/Users/eliteenergy/Repos/ionicBluetoothPrint/plugins/cordova-plugin-bluetooth-serial/www/bluetoothSerial.js

以上两个路径代码中都有转码都方法，对比区别