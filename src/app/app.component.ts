// *************** Angular Imports ***************
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fail-stone';
  currentLanguage = 'en';

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'id']),
    translate.setDefaultLang('en'),
    translate.use('en')
  }

  ngOnInit() {
  }

  changeLanguage(lang: string) {
    this.currentLanguage = lang;
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }
}
