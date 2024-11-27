import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
// ***COMPONENT METADATA***
// Component Decorator: defines componetns behavior and metadata
@Component({
  // Selector: name used in HTML to render component
  selector: 'app-details',
  // Standalone: Indicates that this component does not rely on an Angular module for definition, making it self-contained.
  standalone: true,
  // Imports: specifies external modules used in this component
  imports: [CommonModule, ReactiveFormsModule],
  // Template: Inline HTML template that defines UI structure
  template: `
  <article>
        <!-- Display the housing location photo -->
    <img class ="listing-photo" [src]="housingLocation?.photo">

        <!-- Display housing location name and address -->
    <section class="listing-description">
    <h2 class="listing-heading">{{housingLocation?.name}}</h2>
    <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}
</section>

    <!-- List of housing features -->
    <section class="listing-features">
  <h2 class="section-heading">About this housing location</h2>
  <ul>
    <li>Units available: {{housingLocation?.availableUnits}}</li>
    <li>Does this location have wifi: {{housingLocation?.wifi}}</li> 
    <li>Does this location have laundry: {{housingLocation?.laundry}}</li> 
</ul>
  </section>

      <!-- Apply section with a button -->
<section class="listing-apply">
  <h2 class="section-heading">Apply now to live here</h2>
  <form [formGroup]="applyForm"  (submit)="submitApplication()">
    <label for="first-name">First Name</label>  
    <input id="first-name" type="text" formControlName="firstName">

    <label id="last-name">Last Name</label>
    <input id="last-name" type="text" formControlName="lastName">


    <label for="email">Email</label>
    <input id="email" type="email" formControlName="email">
    <button class="primary" type="submit">Apply now!</button>
</form>
</section>
</article> 
`,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  // ***DEPENDENCIES***
  // ActivatedRoute: Access route parameters (e.g., the 'id' of the housing location) via Angular's ActivatedRoute service.
  route: ActivatedRoute = inject(ActivatedRoute);
  // HousingService: Access housing-related methods and data via the HousingService.
  housingService = inject(HousingService);
  // HousingLocation: A TypeScript interface or model representing the structure of a housing location object
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }

}
