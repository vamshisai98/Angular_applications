import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  allArticles: Array<any> = [];
  articles: Array<any> = [];
  bookmarks = 0;
  showBookMarks = false;
  webpage: any;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.http.get('./../assets/json/feed.json').subscribe((response: any) => { 
      this.allArticles = response.articles;
      this.articles = this.allArticles.filter(c => c);
     });
  }

  bookmarkMe(article) {
    article.bookmarked = !article.bookmarked;
    this.updateBookmarks();
  }

  updateBookmarks() {
    const filtered = this.allArticles.filter(c => c.bookmarked);
    this.bookmarks = filtered.length;
    if(this.showBookMarks) {
      this.articles = this.allArticles.filter(c => c.bookmarked);
    } else {
      this.articles = this.allArticles.filter(c => c);
    }
  }

  toggleBookMarks() {
    if(!this.showBookMarks) {
      this.articles = this.allArticles.filter(c => c.bookmarked);
      this.showBookMarks = true;
    } else {
      this.articles = this.allArticles.filter(c => c);
      this.showBookMarks = false;
    }
  }
  openWebpage(url){
    this.webpage = this.sanitizer.bypassSecurityTrustResourceUrl(url); 
  }
  closeWebpage() {
    this.webpage = '';
  }

  toggleComments(article) {
    article.start = 0;
    article.end = 2;
  }

}
