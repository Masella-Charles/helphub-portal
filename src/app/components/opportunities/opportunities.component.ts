import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrl: './opportunities.component.css'
})
export class OpportunitiesComponent implements OnInit{
  loading: any;
  info: any;
  opportunity: any;


  constructor(private dataService: DataService, private toastr:ToastrService, private router: Router){}


  ngOnInit(): void {
    this.getOpportunitiesByStatus();
    
  }

  getOpportunitiesByStatus() {
    this.loading = true;
    let endpoint = environment.endpoint.opportunities.getByStatus;
    const payload = {
      status: true
    };
    
    this.dataService.postWithPayload(endpoint,payload).subscribe(
      (response: any) => {
        this.loading = false;
        if(this.dataService.isValid(response)){
          if (response.length > 0) {
            this.opportunity = response;
            console.log('opportunity', this.opportunity);
              if (this.opportunity[0].opportunityResponse) {
                // console.log('opportunity', opportunity);
              } else {
                this.info = "Fetch error, Try again later", "ERROR";
              };
          } else {
            this.info = "Record is empty";
          }
        }else{
          this.dataService.logout();
        }
        
      },
      error => {
        this.loading = false;
        this.info = `Fetch error: ${error}`;
        console.error('Fetch error', error);
      }
    );
  }

  getImageUrl(opportunityImages: any[]) {
    if (opportunityImages && opportunityImages.length > 0) {
      // Assuming there's only one image per opportunity; adjust if there can be multiple images
      const base64Image = opportunityImages[0].imageData;
      return `data:image/jpeg;base64,${base64Image}`;
    }
    return 'path/to/default/image.jpg'; // Fallback image if no image is present
  }


  

}

