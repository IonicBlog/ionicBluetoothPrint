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

  testPrinter() {

    //  初始化打印机
    var format = new Uint8Array(2);
    format[0] = 27;
    format[1] = 64;
    this.bluetoothSerial.write(format).then(this.success, this.failure);

    //标准模式
    format = new Uint8Array(1);
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
    this.bluetoothSerial.send('Date:' + new Date().toLocaleString() + '\n').then(this.success, this.failure);

    //换行
    // format = new Uint8Array(1);
    // format[0] = 10;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);
    this.bluetoothSerial.send('-----------------------------------------------\n').then(this.success, this.failure);

    this.bluetoothSerial.send('品名\r\t\r\t\r\t单价\r\t数量\r\t金额\n').then(this.success, this.failure);

    // format[0] = 17;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);
    // this.bluetoothSerial.send('单价').then(this.success, this.failure);
    // format[0] = 25;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);
    // this.bluetoothSerial.send('数量').then(this.success, this.failure);
    // format[0] = 33;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);
    // this.bluetoothSerial.send('金额').then(this.success, this.failure);


    //测试代码
    var format = new Uint8Array(0);
    format[0] = 25;
    this.bluetoothSerial.write(format).then(this.success, this.failure);
    this.bluetoothSerial.write('Product').then(this.success, this.failure);

    // format = new Uint8Array(4);
    // format[0] = 27;
    // format[1] = 92;
    // format[2] = 50;
    // format[3] = 100;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);
    // this.bluetoothSerial.write('维达湿纸巾\n').then(this.success, this.failure);


    // this.bluetoothSerial.send('\r\t9.9\r\t1包\r\t9.9\n').then(this.success, this.failure);

    // this.bluetoothSerial.send('竹纤维原浆本色抽纸').then(this.success, this.failure);
    // this.bluetoothSerial.send('\r\t19.8\r\t2箱\r\t33.6\n').then(this.success, this.failure);


    // this.bluetoothSerial.send('维达美牌纸面巾 130抽/包 (3层) 原生木浆 \n').then(this.success, this.failure);
    // this.bluetoothSerial.send('\r\t49\r\t1箱\r\t49\n').then(this.success, this.failure);

    //换行
    format = new Uint8Array(1);
    format[0] = 10;
    this.bluetoothSerial.write(format).then(this.success, this.failure);
    this.bluetoothSerial.send('-----------------------------------------------\n').then(this.success, this.failure);

    //换行
    // format = new Uint8Array(1);
    // format[0] = 10;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);

    // // 右对齐      
    // format = new Uint8Array(3);
    // format[0] = 27;
    // format[1] = 97;
    // format[2] = 50;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);
    // this.bluetoothSerial.send('数量：4\n').then(this.success, this.failure);
    // // //换行
    // // format = new Uint8Array(1);
    // // format[0] = 10;
    // // this.bluetoothSerial.write(format).then(this.success, this.failure);
    // this.bluetoothSerial.send('金额：131.6\n').then(this.success, this.failure);

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
    // this.bluetoothSerial.send('--------------------------------------------\n').then(this.success, this.failure);

    //换行
    // format = new Uint8Array(1);
    // format[0] = 10;
    // this.bluetoothSerial.write(format).then(this.success, this.failure);
    // this.bluetoothSerial.send('备注 ').then(this.success, this.failure);
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
    var ret = new Uint8Array(str.length);
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10FFFF) {
        ret[i] = (((c >> 18) & 0x07) | 0xF0);
        ret[i] = (((c >> 12) & 0x3F) | 0x80);
        ret[i] = (((c >> 6) & 0x3F) | 0x80);
        ret[i] = ((c & 0x3F) | 0x80);
      } else if (c >= 0x000800 && c <= 0x00FFFF) {
        ret[i] = (((c >> 12) & 0x0F) | 0xE0);
        ret[i] = (((c >> 6) & 0x3F) | 0x80);
        ret[i] = ((c & 0x3F) | 0x80);
      } else if (c >= 0x000080 && c <= 0x0007FF) {
        ret[i] = (((c >> 6) & 0x1F) | 0xC0);
        ret[i] = ((c & 0x3F) | 0x80);
      } else {
        ret[i] = (c & 0xFF);
      }
    }
    return ret.buffer;
  }
  public Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
      c = array[i++];
      switch (c >> 4) {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c);
          break;
        case 12: case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++];
          out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
          break;
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++];
          char3 = array[i++];
          out += String.fromCharCode(((c & 0x0F) << 12) |
            ((char2 & 0x3F) << 6) |
            ((char3 & 0x3F) << 0));
          break;
      }
    }
    return out;
  }



  public stringToUint8Array(string, options = { stream: false }) {
    if (options.stream) {
      throw new Error(`Failed to encode: the 'stream' option is unsupported.`);
    }

    let pos = 0;
    const len = string.length;
    const out = [];

    let at = 0;  // output position
    let tlen = Math.max(32, len + (len >> 1) + 7);  // 1.5x size
    let target = new Uint8Array((tlen >> 3) << 3);  // ... but at 8 byte offset

    while (pos < len) {
      let value = string.charCodeAt(pos++);
      if (value >= 0xd800 && value <= 0xdbff) {
        // high surrogate
        if (pos < len) {
          const extra = string.charCodeAt(pos);
          if ((extra & 0xfc00) === 0xdc00) {
            ++pos;
            value = ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000;
          }
        }
        if (value >= 0xd800 && value <= 0xdbff) {
          continue;  // drop lone surrogate
        }
      }

      // expand the buffer if we couldn't write 4 bytes
      if (at + 4 > target.length) {
        tlen += 8;  // minimum extra
        tlen *= (1.0 + (pos / string.length) * 2);  // take 2x the remaining
        tlen = (tlen >> 3) << 3;  // 8 byte offset

        const update = new Uint8Array(tlen);
        update.set(target);
        target = update;
      }

      if ((value & 0xffffff80) === 0) {  // 1-byte
        target[at++] = value;  // ASCII
        continue;
      } else if ((value & 0xfffff800) === 0) {  // 2-byte
        target[at++] = ((value >> 6) & 0x1f) | 0xc0;
      } else if ((value & 0xffff0000) === 0) {  // 3-byte
        target[at++] = ((value >> 12) & 0x0f) | 0xe0;
        target[at++] = ((value >> 6) & 0x3f) | 0x80;
      } else if ((value & 0xffe00000) === 0) {  // 4-byte
        target[at++] = ((value >> 18) & 0x07) | 0xf0;
        target[at++] = ((value >> 12) & 0x3f) | 0x80;
        target[at++] = ((value >> 6) & 0x3f) | 0x80;
      } else {
        // FIXME: do we care
        continue;
      }

      target[at++] = (value & 0x3f) | 0x80;
    }

    return target.slice(0, at);
  }

}
