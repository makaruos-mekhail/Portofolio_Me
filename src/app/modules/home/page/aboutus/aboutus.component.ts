import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent  implements OnInit {
  image?: string;
  productName?: string;

  projectDetails = {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsoZHAOACc4Tpme0cvaxjdRYckM024_fxWBw&s',
    productName: 'makaruos Product'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clipboard: Clipboard,
    private meta: Meta,
    private titleService: Title
  ) {}

  shareLink() {
    const url = new URL(window.location.href);
    url.searchParams.set('image', this.projectDetails.image);
    url.searchParams.set('productName', this.projectDetails.productName);
    this.clipboard.copy(url.toString());
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.image = params['image'] || this.projectDetails.image;
      this.productName = params['productName'] || this.projectDetails.productName;
  
      const validImage = this.image || 'default-image.jpg';
      const validProductName = this.productName || 'Default Product Name';
  
      // تحديث Meta Tags
      this.titleService.setTitle(validProductName);
      this.meta.updateTag({ property: 'og:title', content: validProductName });
      this.meta.updateTag({ property: 'og:description', content: `Check out this product: ${validProductName}` });
      this.meta.updateTag({ property: 'og:image', content: validImage });
      this.meta.updateTag({ property: 'og:url', content: window.location.href });
    });
  }

}
