import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(
        public authService: AuthService, public router: Router
    ) {
      if (this.router.url === '/') {
        this.router.navigate(['rate-list']);
      }
    }

    ngOnInit(): void {
    }

}
