import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { LocalstorageService } from '../services/localstorage.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Tagify,TagifyService } from '@yaireo/tagify';
import { NgxTagsInputModule } from 'ngx-tags-input';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  tagify: Tagify


  completeUserInfo: any = this._localstorageService.completeUserInfo;
  allProducts: any;
  currentSelectedProduct: any;
  currentEditProdIdx: number;
  curSelProdFeature: any;
  prodShowMode: string;
  isReqProdAvail: any;
  editProdModelMode: boolean = true;

  constructor(private _localstorageService: LocalstorageService, private bsmodalservice: BsModalService, private toastr:ToastrService) { 
  	


  	/*fetch products from json file if any user is login*/
  	if(this.completeUserInfo.isLogin == true) {

  		/* check correct product is available in localstore*/
  		this.prodShowMode = window.localStorage.getItem('prodShowMode')
  		this.isReqProdAvail = this.checkProdAvailable(this.completeUserInfo.userType,this.completeUserInfo.userName, this.prodShowMode);
  		/* ends here ~ check correct product is available in localstore */

  		/* if data (or correct data) is not available in localstorage */
  		if(this.isReqProdAvail == false) {
  			this._localstorageService.fetchJsonFile('products.json',
  			((data)=>{
					window.localStorage.setItem('prodShowMode', this.completeUserInfo.userType);
	  				if(this.completeUserInfo.userType == 'vendor') {
	  					let filterProd =  data.filter((productListJsonRes)=>{
		  					return productListJsonRes.listed_by == this.completeUserInfo.userName
		  				})
		  				this.allProducts = filterProd;
	  				} else {
	  				 	this.allProducts= data;
	  				}

	  				/* set all products into localstorage */
	  				this.updateLocalStorageProd(this.allProducts)
	  				/* ends here ~ set all products into localstorage */
	  			})
	  		)
  		}
  		/* ends here ~ if data (or correct data) is not available in localstorage */
  	}
  	/*ends here ~ fetch products from json file if any user is login*/
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {

  }

  /*function for edit product*/
  editProduct(index, editProductModalTmpl) {
  	this.editProdModelMode = true;
  	this.modalRef = this.bsmodalservice.show(editProductModalTmpl);
  	this.currentSelectedProduct =  this.allProducts[index];
  	this.currentEditProdIdx = index;
  	this.curSelProdFeature = this.allProducts[index].features;
  }
  /*ends here ~ function for edit product*/

  /*function for update product*/
  updateProd(selProdName,selProdDesc,selProdQty,selProdPrc) {
	console.log(selProdName,selProdDesc,selProdQty,selProdPrc)
	this.allProducts[this.currentEditProdIdx].name = selProdName;
	this.allProducts[this.currentEditProdIdx].desc = selProdDesc;
	this.allProducts[this.currentEditProdIdx].Qty = selProdQty;
	this.allProducts[this.currentEditProdIdx].prod_prc = selProdPrc;
	this.allProducts[this.currentEditProdIdx].features = this.curSelProdFeature;
	this.modalRef.hide();
  	this.updateLocalStorageProd(this.allProducts);
  	this.toastr.success('Product is Updated','Successfully!')

  }
  /*ends here ~ function for update product*/

  /* function for delete product */
  delProd() {
  	this.allProducts.splice(this.currentEditProdIdx,1);
	this.modalRef.hide();
	this.updateLocalStorageProd(this.allProducts);
  	this.toastr.success('Product is Deleted','Successfully!')

  }
  /* ends here ~ function for delete product */

  /*function for update localstore products*/
  updateLocalStorageProd(prodDataPar) {
  	window.localStorage.setItem('allProdData', JSON.stringify(prodDataPar));
  }
  /*ends here ~ function for update localstore products*/

  /* function for check product list in localstorage */
  checkProdAvailable(userType, userEmail, prodShowMode) {
  	this.allProducts =  JSON.parse(window.localStorage.getItem('allProdData'))
  	if((userType == 'vendor') && (this.allProducts == 0 || this.allProducts == undefined || this.allProducts == '' ||prodShowMode != userType || userEmail != this.allProducts[0].listed_by)) {
  		return false;
  		alert('sd')
  	} else if((userType == 'customer') && (this.allProducts == 0 || this.allProducts == undefined || this.allProducts == '' ||prodShowMode != userType)) {
  		return false;
  	}
  }
  /* ends here ~ function for check product list in localstorage */

  /*function for open add product modal*/
  addProductModal(editProductModalTmpl) {
  	this.editProdModelMode = false;
  	this.currentSelectedProduct = {'name':'','desc':'','Qty':'','prod_prc':'','prod_img':'assets/img/laptopProd.png','features':''};
  	this.curSelProdFeature = []
  	this.modalRef = this.bsmodalservice.show(editProductModalTmpl);
  }
  /*ends here ~ function for open add product modal*/

  /*function for add & save product data*/
  addProduct(selProdName,selProdDesc,selProdQty,selProdPrc) {
	this.currentSelectedProduct.name = selProdName;
	this.currentSelectedProduct.desc = selProdDesc;
	this.currentSelectedProduct.Qty = selProdQty;
	this.currentSelectedProduct.prod_prc = selProdPrc;
	this.currentSelectedProduct.features = this.curSelProdFeature;
	this.allProducts.push(this.currentSelectedProduct);
	this.modalRef.hide();
  	this.updateLocalStorageProd(this.allProducts);
  	this.toastr.success('Successfully! New Product is Add to Your Listing')

  }
  /*ends here ~ function for add & save product data*/

  /* function for buy products */
  buyProduct(index) {
  	 this.allProducts[index].Qty -=1;
  	 this.toastr.success(this.allProducts[index].name,'Purchased Product!')
  	 this.updateLocalStorageProd(this.allProducts);
  }
  /* ends here ~ function for buy products */

  /* function for view product details */
  viewProdDetails(index, viewProductModalTmpl) {
  	this.modalRef = this.bsmodalservice.show(viewProductModalTmpl);
  	this.currentSelectedProduct =  this.allProducts[index];
  }
  /* ends here ~ function for view product details */

}
