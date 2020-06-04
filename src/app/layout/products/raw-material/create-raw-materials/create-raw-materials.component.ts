import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import { RawMaterialService } from '../../../../core/services/materials.services';

@Component({
  selector: 'app-create-raw-materials',
  templateUrl: './create-raw-materials.component.html',
  styleUrls: ['./create-raw-materials.component.css']
})
export class CreateRawMaterialsComponent implements OnInit {

  materialForm: FormGroup;
  userID: any;
  materialID: any;
  materialDetail: any;
  buttonText: Boolean;

  constructor(
    private fb: FormBuilder,
    private toast: ToasterService,
    private rawMaterialService: RawMaterialService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if ((this.router.url).includes('update')) {
        this.updateFlowInit(params);
      }
    });
    this.userID = JSON.parse(localStorage.getItem('profileDetail'));
    this.initForm();
  }



  /**
   * Update flow init
   * @param params
   */
  updateFlowInit(params: any) {
    if (params.has('id')) {
      this.materialID = params.get('id');
      this.viewMaterial();
      this.buttonText = true;
    } else {
      this.buttonText = false;
      this.toast.pop('error', 'Opps!', 'Invalid request params');
      this.router.navigate(['/dashboard/class']);
    }
  }

  viewMaterial() {
    this.rawMaterialService.viewMaterial(this.materialID).subscribe((response) => {
      this.materialDetail = response;
      this.preFilledForm(this.materialDetail);
    });
  }

  initForm() {
    this.materialForm = this.fb.group({
      id: this.materialID ? this.materialID : '', // to handle update flow only for class.
      productName: ['', [Validators.required]],
      Quantity: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const data = this.materialForm.value;
    data.user = this.userID.user_id;
    if (data.id > 0) {
      this.rawMaterialService.updateMaterial(data, data.id).subscribe((response: any) => {
        this.toast.pop('success', 'Success!', 'Raw Material has been Updated.');
        this.callCompleted();
      });
    } else {
      this.rawMaterialService.storeMaterial(data).subscribe((response: any) => {
        this.toast.pop('success', 'Success!', 'Raw Material has been Created.');
        this.callCompleted();
      });
    }
  }


  callCompleted() {
    this.materialForm.reset();
    this.router.navigate(['/products/raw']);
  }

  preFilledForm(raw: any) {
    this.materialForm.get('productName').setValue(raw.productName);
    this.materialForm.get('Quantity').setValue(raw.Quantity);
  }


  get productName() {
    return this.materialForm.get('productName');
  }
  get Quantity() {
    return this.materialForm.get('Quantity');
  }
}
