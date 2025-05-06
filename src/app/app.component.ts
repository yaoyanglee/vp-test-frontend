import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {FooterComponent} from "./globals/footer/footer.component";
import {NavbarComponent} from "./globals/navbar/navbar.component";
import {NzDrawerComponent} from "ng-zorro-antd/drawer";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, NavbarComponent, NzDrawerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Synapxe_Trailblazer';
}
