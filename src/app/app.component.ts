import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CampagneService } from './campagne.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [DatePipe],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testTechnique1';
  searchText = "";
  searchBybrand:number =1;
  listBrands: Array<any> = [];
  listOfCampagnes: Array<any> = [];
  campaignForm!: FormGroup;
  listMediasBis: Array<any> = [];
  listMedias: Array<any> = [];

  
  constructor(private campagneService: CampagneService, private formBuilder: FormBuilder,private datePipe: DatePipe
    ){
    this.getCampagnes();
    this.getlistMedias();
  }

  ngOnInit() {
        this.campaignForm = this.formBuilder.group({
            brand: ['', Validators.required],
            campaignName: ['', Validators.required],
            decisionDeadline: ['',Validators.required],

        });
      }
  getCampagnes(){
    this.listOfCampagnes = this.campagneService.getpayloadRmp()[0].requests;
    this.listBrands = this.campagneService.getBrands();
  }

  getlistMedias(){
    this.listMedias = this.campagneService.getmyMedias();
    this.listMediasBis = this.campagneService.getmyMediasBis();
  }

  fitreCompaign(brandId:number){
    this.listOfCampagnes = this.listOfCampagnes.filter(
      (word:any) => word.brand.brandId == brandId
    );

  }

  getChecketMedia(data:any){
    this.listMedias.forEach((element:any) => {
      data.media.forEach((element2:any) => {
        if(element.value==element2.value){
           element.isChecked =true;
        }
      })
    });

    this.listMediasBis.forEach((element3:any) => {
      data.media.forEach((element4:any) => {
        if(element3.value==element4.value){
          element3.isChecked =true;
        }
      })
    });
  }
      showDetailCompagne(data:any){
        this.getChecketMedia(data);
        this.campaignForm.patchValue({
          brand: data.brand.name,
          campaignName:data.campaignName,
          media:data.media,
          decisionDeadline: formatDate(data?.decisionDeadline, 'yyyy-MM-dd', 'en')
        });
      }
}