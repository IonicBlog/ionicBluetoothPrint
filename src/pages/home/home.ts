import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { PrintProvider } from '../../providers/print/print';
import { PrinterListModalPage } from '../printer-list-modal/printer-list-modal';

declare var CordovaXprinter;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedPrinter: any = [];
  printerList: any = [];
  devices: any = [];

  constructor(public navCtrl: NavController, private modalCtrl: ModalController,
    private printProvider: PrintProvider,
    private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BluetoothPage');

  }

  scan() {

    this.printProvider.searchBt().then(datalist => {
      this.printerList = datalist;
    }, err => {
      alert(err);
    })


    CordovaXprinter.scanDevice({}, (data) => {
      this.devices = data;
      console.log(JSON.stringify(data));
    }, err => { console.log(err) })
  }

  selectDevice(item) {
    console.log("连接设备中")
    CordovaXprinter.scanDevice(item, (data) => {
      console.log("连接设备成功" + data)

      // CordovaXprinter.printThreeData(
      //   { left: "xxx", middle: "xxx", right: "xxx" },
      //   (succ) => {
      //     console.log('打印成功' + succ)
      //   }, (err) => {
      //     console.log('打印失败' + err)

      //   });
      CordovaXprinter.writeDevice({
        storeName: 'xx',
        buyerStoreName: 'xx',
        mobile: '188',
        provinceName: '',
        cityName:'',
        districtName:'',
        address:'',
        orderNo: '',
        orderType: '',
        shippingStatus: '',
        orderDetailList: [{
          goodsSn: '',
          goodsNumber: '',
          unit: '',
          goodsPrice: '',
          totalFee: ''
        }],
        totalFee: '',
        discount: '',
        orderAmount:1,
        payCode: '',
        payStatus: '',

      },
        (succ) => {
          console.log('打印成功' + succ)
        }, (err) => {
          console.log('打印失败' + err)
        });
    }, err => { console.log(err) })
  }

  select(item) {
    this.selectedPrinter = item;
    var id = this.selectedPrinter.id;
    if (id == null || id == "" || id == undefined) {
      //nothing happens, you can put an alert here saying no printer selected
    }
    else {
      let foo = this.printProvider.connectBT(id).subscribe(data => {
        console.log("CONNECT SUCCESSFUL", data);
      }, err => {
        console.log("Not able to connect", err);
      });
    }
  }

  testPrinter() {
    var id = this.selectedPrinter.id;
    if (id == null || id == "" || id == undefined) {
      //nothing happens, you can put an alert here saying no printer selected
    }
    else {
      let foo = this.printProvider.testPrint(id);
    }
  }

}
