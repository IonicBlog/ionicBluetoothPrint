import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedPrinter: any = [];
  printerList: any = [];
  devices: any = [];

  constructor(public platform: Platform, private bluetoothSerial: BluetoothSerial) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BluetoothPage');
    this.platform.ready().then(() => {
      this.scan();
      this.testPrinter();
    });
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
      this.testPrinter();

    }, err => {
      console.log("Not able to connect", err);
    });
  }
  success(data) {
    console.log('success:' + data)
  }
  failure(data) {
    console.log('failure:' + data)
  }

  stringToByte(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for(var i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if(c >= 0x010000 && c <= 0x10FFFF) {
        bytes.push(((c >> 18) & 0x07) | 0xF0);
        bytes.push(((c >> 12) & 0x3F) | 0x80);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if(c >= 0x000800 && c <= 0x00FFFF) {
        bytes.push(((c >> 12) & 0x0F) | 0xE0);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if(c >= 0x000080 && c <= 0x0007FF) {
        bytes.push(((c >> 6) & 0x1F) | 0xC0);
        bytes.push((c & 0x3F) | 0x80);
      } else {
        bytes.push(c & 0xFF);
      }
    }
    return bytes;


  }

  testPrinter() {

    //  初始化打印机
    var format = new Uint8Array(2);
    format[0] = 27;
    format[1] = 64;
    this.bluetoothSerial.write(format).then(this.success, this.failure);

      //标准模式
     var format = new Uint8Array(1);
     format[0] = 12; 
     this.bluetoothSerial.write(format).then(this.success, this.failure);

    //居中      
    format = new Uint8Array(3); 
    format[0] = 27;
    format[1] = 97;
    // format[2] = 1;
    format[2] = 49;
    this.bluetoothSerial.write(format).then(this.success, this.failure);

    //放大
    format = new Uint8Array(3);
    format[0] = 29;
    format[1] = 33;
    format[2] = 1;
    this.bluetoothSerial.write(format).then(this.success, this.failure);
    this.bluetoothSerial.send('销售订单\n').then(this.success, this.failure);

    // 还原放大
    format[2] = 0;
    this.bluetoothSerial.write(format).then(this.success, this.failure);

    //还原对齐方式
    format = new Uint8Array(3);
    format[0] = 27;
    format[1] = 97;
    format[2] = 0;
    this.bluetoothSerial.write(format).then(this.success, this.failure);

    //换行
    // format = new Uint8Array(1);
    // format[0] = 10;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);

    this.bluetoothSerial.send('No:201904150954001\n').then(this.success, this.failure);

    //换行
    // format = new Uint8Array(1);
    // format[0] = 10;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);

    // format = new Uint8Array(3);
    // format[0] = 27;
    this.bluetoothSerial.send('Date:' + new Date().toLocaleString()+'\n').then(this.success, this.failure);

    //换行
    // format = new Uint8Array(1);
    // format[0] = 10;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);
    this.bluetoothSerial.send('--------------------------------------------\n').then(this.success, this.failure);
    // //换行
    // format = new Uint8Array(1);
    // format[0] = 10;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);

    this.bluetoothSerial.send('品名\r\t单价\r\t数量\r\t金额\n').then(this.success, this.failure);
    //换行
    // format = new Uint8Array(1);
    // format[0] = 10;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);

    this.bluetoothSerial.send('竹纤维原浆本色抽纸\n').then(this.success, this.failure);
    this.bluetoothSerial.send('\r\t19.8\r\t2箱\r\t33.6\n').then(this.success, this.failure);

    //换行
    // format = new Uint8Array(1);
    // format[0] = 10;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);

    this.bluetoothSerial.send('商品名称\r\t49\r\t2个\r\t98\n').then(this.success, this.failure);

    // //换行
    // format = new Uint8Array(1);
    // format[0] = 10;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);
    this.bluetoothSerial.send('--------------------------------------------\n').then(this.success, this.failure);

    //换行
    // format = new Uint8Array(1);
    // format[0] = 10;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);

    //右对齐      
    // format = new Uint8Array(4);
    // format[0] = 27;
    // format[1] = 97;
    // format[2] = 2;
    // format[3] = 50;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);
    this.bluetoothSerial.send('数量：4\n').then(this.success, this.failure);
    // //换行
    // format = new Uint8Array(1);
    // format[0] = 10;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);
    this.bluetoothSerial.send('金额：131.6\n').then(this.success, this.failure);

    //还原对齐方式
    // format = new Uint8Array(3);
    // format[0] = 27;
    // format[1] = 97;
    // format[2] = 0;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);

    //换行
    // format = new Uint8Array(1);
    // format[0] = 10;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);
    this.bluetoothSerial.send('--------------------------------------------\n').then(this.success, this.failure);

    //换行
    // format = new Uint8Array(1);
    // format[0] = 10;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);
    this.bluetoothSerial.send('备注 ').then(this.success, this.failure);
    // //换行
    // format = new Uint8Array(1);
    // format[0] = 10;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);
    // //换行
    // format = new Uint8Array(1);
    // format[0] = 10;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);
    // //换行
    // format = new Uint8Array(1);
    // format[0] = 10;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);
    // // 切纸
    // format = new Uint8Array(3);
    // format[0] = 29;
    // format[1] = 86;
    // format[2] = 66;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);

  }

  byteToString(byte) {
    if (typeof byte === 'string') {
      return byte;
    }
    var str = '',
      _arr = byte;
    for (var i = 0; i < _arr.length; i++) {
      var one = _arr[i].toString(2),
        v = one.match(/^1+?(?=0)/);
      if (v && one.length == 8) {
        var bytesLength = v[0].length;
        var store = _arr[i].toString(2).slice(7 - bytesLength);
        for (var st = 1; st < bytesLength; st++) {
          store += _arr[st + i].toString(2).slice(2);
        }
        str += String.fromCharCode(parseInt(store, 2));
        i += bytesLength - 1;
      } else {
        str += String.fromCharCode(_arr[i]);
      }
    }
    return str;
  }
  stringToBytes(str) {
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
