import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedPrinter: any = [];
  printerList: any = [];
  devices: any = [];

  constructor(private bluetoothSerial: BluetoothSerial) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BluetoothPage');
  }

  scan() {
    this.bluetoothSerial.list().then(datalist => {
      this.printerList = datalist;
    }, err => {
      alert(err);
    })
  }

  select(item) {
    this.selectedPrinter = item;
    var id = this.selectedPrinter.id;
    this.bluetoothSerial.connect(id).subscribe(data => {
      console.log("Connect " + data)
    }, err => {
      console.log("Not able to connect", err);
    });
  }

  testPrinter() {

    function success() {

    }
    function failure() {

    }
    this.bluetoothSerial.write('hello world hello world').then(success, failure);

    this.bluetoothSerial.write([186, 220, 222]).then(success, failure);

    var data = new Uint8Array(4);
    data[0] = 0x41;
    data[1] = 0x42;
    data[2] = 0x43;
    data[3] = 0x44;
    this.bluetoothSerial.write(data).then(success, failure);

    this.bluetoothSerial.write(data.buffer).then(success, failure);

    // //设置中文指令
    var printData = new Uint8Array(3);
    printData[0] = 0x1B;
    printData[1] = 0x52;
    printData[2] = 0x0F;
    this.bluetoothSerial.write(printData).then(success, failure);

    // this.printProvider.print('中文测试');
    // //指令换行
    // printData = new Uint8Array(1);
    // printData[0] = 10;
    // this.printProvider.print(printData);
    // this.printProvider.print("!@#$%^&*()_+")
    // this.printProvider.print("1234567890")
    // this.printProvider.print("\n");
    // this.printProvider.print("abcdefghijklmnopqrstuvwxyz")


    // this.printProvider.print("\n");
  }



  stringToByte(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10FFFF) {
        bytes.push(((c >> 18) & 0x07) | 0xF0);
        bytes.push(((c >> 12) & 0x3F) | 0x80);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000800 && c <= 0x00FFFF) {
        bytes.push(((c >> 12) & 0x0F) | 0xE0);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000080 && c <= 0x0007FF) {
        bytes.push(((c >> 6) & 0x1F) | 0xC0);
        bytes.push((c & 0x3F) | 0x80);
      } else {
        bytes.push(c & 0xFF);
      }
    }
    return bytes;
  }

}
