import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-navbarhome',
  templateUrl: './navbarhome.component.html',
  styleUrls: ['./navbarhome.component.css']
})
export class NavbarhomeComponent implements OnInit {
  fullName: any;
  

  constructor(private toastr: ToastrService, private router: Router,private dataService: DataService) {
  
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (typeof sessionStorage !== 'undefined') {
        this.fullName = sessionStorage.getItem('fullName');
      }
    }, 1000);
  }

  logout(){
    this.dataService.logout();
    this.toastr.success("Logout Successfull","SUCCESS");
  }

  

}
