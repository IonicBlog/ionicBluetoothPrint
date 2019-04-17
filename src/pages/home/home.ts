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
  success() {

  }
  failure() {

  }
  testPrinter(tag) {

    if (tag == 0) {
      this.bluetoothSerial.write('hello world hello world').then(this.success, this.failure);
    } else if (tag == 1) {
      this.bluetoothSerial.write([186, 220, 222]).then(this.success, this.failure);
    } else if (tag == 2) {
      var data = new Uint8Array(4);
      data[0] = 0x41;
      data[1] = 0x42;
      data[2] = 0x43;
      data[3] = 0x44;
      this.bluetoothSerial.write(data).then(this.success, this.failure);
    } else if (tag == 3) {
      this.bluetoothSerial.write(data.buffer).then(this.success, this.failure);
    } else if (tag == 4) {
      var printData = new Uint8Array(3);
      printData[0] = 0x1B;
      printData[1] = 0x52;
      printData[2] = 0x0F;
      this.bluetoothSerial.write(printData).then(this.success, this.failure);
    } else if (tag == 5) {
      this.bluetoothSerial.write('中文测试中文测试中文测试').then(this.success, this.failure);
    }

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
