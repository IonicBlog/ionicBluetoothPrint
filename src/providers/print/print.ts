import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@Injectable()
export class PrintProvider {

  constructor(private btSerial: BluetoothSerial, private alertCtrl: AlertController) {

  }

  searchBt() {
    return this.btSerial.list();
  }

  connectBT(address) {
    return this.btSerial.connect(address);
  }

  testPrint(address) {
    // let printData = `销售单 \n
    // 单据编号：201904150954001\n
    // 日期：2019年04月15日 09:54:21 \n
    // -----------------------------------------------\n
    // 品名\r\t数量\r\t单价\r\t金额\r\t单位 \n
    // 商品1\r\t2\r\t20\r\t40\r\t个 \n
    // 商品2\r\t2\r\t20\r\t40\r\t个 \n
    // 商品3\r\t2\r\t20\r\t40\r\t个 \n
    // -----------------------------------------------\n
    // 合计\r\t 数量：6\r\t 金额\r\t 120.0元 \n
    // -----------------------------------------------\n
    // 备注： \n\n\n
    // `;
    //  let printData =[186, 220, 222];

    // let printData = new Uint8Array(4);
    // printData[0] = 0x41;
    // printData[1] = 0x42;
    // printData[2] = 0x43;
    // printData[3] = 0x44;

    var printData = `你好 \n 你好 \n 你好 \n`
    var finalReceipt = `“Welcome to” + ‘\x20’ + companyName + ‘\x0a’ + “Date:” + ‘\x20’ + this.datetime
+ ‘\x0a’ + “Cashier:” + ‘\x20’ + cashierName + ‘\x0a’ + ‘\x0a’ + receiptItems + ‘\x0a’ + “Subtotal:” + ‘\x20’ + “$” + this.totalPayment + ‘\x0a’
+ “GST:” + ‘\x20’ + “$” + gst + ‘\x0a’ + “Service Charge:” + ‘\x20’ + “$” + svc + ‘\x0a’
+ “Total:”+ ‘\x20’ + “$” + val + ‘\x0a’ + “Amount Received:” + ‘\x20’ + “$” + this.amountReceived + ‘\x0a’ + “Change:”
+ ‘\x20’ + “$” + this.change + ‘\x0a’ + “Payment Type:” + ‘\x20’ + this.paymentType + ‘\x0a’ + footer + ‘\x0a’+ ‘\x0a’`
    let xyz = this.connectBT(address).subscribe(data => {
      this.btSerial.write(finalReceipt).then(dataz => {
        console.log("WRITE SUCCESS", dataz);

        let mno = this.alertCtrl.create({
          title: "打印中,请稍后...",
          buttons: ['好的']
        });
        mno.present();

        xyz.unsubscribe();
      }, errx => {
        console.log("WRITE FAILED", errx);
        let mno = this.alertCtrl.create({
          title: "ERROR " + errx,
          buttons: ['Dismiss']
        });
        mno.present();
      });
    }, err => {
      console.log("CONNECTION ERROR", err);
      let mno = this.alertCtrl.create({
        title: "ERROR " + err,
        buttons: ['Dismiss']
      });
      mno.present();
    });

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