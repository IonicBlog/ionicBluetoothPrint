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
  success(data) {
    console.log('success:' + data)
  }
  failure(data) {
    console.log('failure:' + data)
  }
  testPrinter(tag) {
    if (tag == 0) {
      //居中      
      var format = new Uint8Array(4);
      format[0] = 27;
      format[1] = 97;
      format[2] = 1;
      format[3] = 49;
      this.bluetoothSerial.write(format).then(this.success, this.failure);

      //放大
      format = new Uint8Array(3);
      format[0] = 29;
      format[1] = 33;
      format[2] = 1;
      this.bluetoothSerial.write(format).then(this.success, this.failure);
      this.bluetoothSerial.send('销售单').then(this.success, this.failure);

      //还原放大
      format[2] = 0;
      this.bluetoothSerial.write(format).then(this.success, this.failure);

      //还原对齐方式
      format = new Uint8Array(3);
      format[0] = 27;
      format[1] = 97;
      format[2] = 0;
      this.bluetoothSerial.write(format).then(this.success, this.failure);

      let printData = `
    单据编号：201904150954001\n
    日期：2019年04月15日 09:54:21 \n
    --------------------------------------------\n
    品名\r\t数量\r\t单价\r\t金额\r\t单位 \n
    商品1商品1商品1商品1商品1\r\t2\r\t20\r\t40\r\t个 \n
    商品2\r\t2\r\t20\r\t40\r\t个 \n
    --------------------------------------------\n
    合计\r\t 数量：6\r\t 金额\r\t120.0元 \n
    --------------------------------------------\n
    备注： \n\n
    `;
      this.bluetoothSerial.send(printData).then(this.success, this.failure);
    }

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
