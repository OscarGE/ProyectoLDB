import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { ProviderService } from '../../../../services/provider_service/provider.service';

@Component({
  selector: 'app-see-suppliers',
  templateUrl: './see-suppliers.component.html',
  styleUrls: ['./see-suppliers.component.css']
})
export class SeeSuppliersComponent implements OnInit {
  idProvider:any;//Variable que almacena el id del proveedor 
  providesGet: any=[];
  typeList:any=[];
  contactList:any=[];
  constructor(private router: Router, private  route: ActivatedRoute, private providerService: ProviderService) { }

  ngOnInit(): void {
    this.idProvider = this.route.snapshot.paramMap.get('id');
    this.providerService.getProvider(this.idProvider)
    .subscribe({
        next: (v) =>  { 
          this.providesGet=v
          this.typeList=this.providesGet.type.split(",")
          this.contactList=this.providesGet.contact.split(",")
        },
        error: (e) => {console.log(e)},
        complete: () => console.info('complete')
      })
  }

}
