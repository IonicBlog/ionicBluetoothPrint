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

  print(data) {
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

    this.btSerial.write(data).then(dataz => {
      console.log("WRITE SUCCESS", dataz);

      // let mno = this.alertCtrl.create({
      //   title: "打印中,请稍后...",
      //   buttons: ['好的']
      // });
      // mno.present();

      // xyz.unsubscribe();
    }, errx => {
      console.log("WRITE FAILED", errx);
      let mno = this.alertCtrl.create({
        title: "ERROR " + errx,
        buttons: ['Dismiss']
      });
      mno.present();
    });

  }




}