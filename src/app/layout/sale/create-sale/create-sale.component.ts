import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SaleService } from '../../../core/services/sale.services';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';

declare const $: any

@Component({
    selector: 'app-create-sale',
    templateUrl: './create-sale.component.html',
    styleUrls: ['./create-sale.component.css']
})
export class CreateSaleComponent implements OnInit {
    
    saleID: any;
    buttonText: Boolean;
    unit: any;
    saleDetail: any;

    constructor(
        private toast: ToasterService,
        private saleService: SaleService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            if (this.router.url.includes('update')) {
                this.updateFlowInit(params);
            }
        });
        this.saleFormDropDown();

    }

    /**
     * Update flow init
     * @param params
     */
    updateFlowInit(params: any) {
        if (params.has('id')) {
            this.saleID = params.get('id');
            this.viewsale();
            this.buttonText = true;
        } else {
            this.buttonText = false;
            this.toast.pop('error', 'Opps!', 'Invalid request params');
            this.router.navigate(['/dashboard/sale']);
        }
    }

    viewsale() {
        this.saleService.viewFinalSale(this.saleID).subscribe((response) => {
            this.saleDetail = response;
        });
    }

    saleFormDropDown() {
        this.unit = [
            {
                id: 1,
                value: 'OIL'
            },
            {
                id: 2,
                value: 'Salt & Seed'
            },
            {
                id: 3,
                value: 'Others'
            }
        ];
    }

    saleDropDown($event: any) {
        if ($event.value === "OIL") {
            $('#oil').modal();
        }
        else if ($event.value === "Salt & Seed") {
            $('#salt-seed').modal();
        }
        else if ($event.value === "Others") {
            $('#others').modal();

        }
    }

}
