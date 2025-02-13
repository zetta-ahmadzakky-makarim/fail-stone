// *************** Angular Imports ***************
import { Component, OnInit } from '@angular/core';

// *************** Third-Party Library Imports ***************
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // *************** State Variables ***************
  title = 'fail-stone';
  currentLanguage = 'en';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'id']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit(): void {
  }

  // *************** Function For Change Current Language
  changeLanguage(lang: string): void {
    this.currentLanguage = lang;
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }
}
