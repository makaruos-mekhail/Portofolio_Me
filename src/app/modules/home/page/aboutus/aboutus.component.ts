import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  image?: string;
  productName?: string;

  constructor(private route: ActivatedRoute,private router: Router,private clipboard: Clipboard) {}


  projectDetails = {
    image: 'assets/image/home/img.png',
    productName: 'makaruos Product'
  };

  // constructor() {}

  shareLink() {
    const url = new URL(window.location.href);
    url.searchParams.set('image', this.projectDetails.image);
    url.searchParams.set('productName', this.projectDetails.productName);
    this.clipboard.copy(url.toString());
  }


  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.image = params['image'];
      this.productName = params['productName'];
    });
  }

}
