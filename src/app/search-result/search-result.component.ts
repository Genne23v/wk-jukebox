import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  results: any;
  searchQuery: String = '';
  subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private musicDataService: MusicDataService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe((query) => {
      this.searchQuery = query.q;

      this.musicDataService
        .searchArtists(this.searchQuery)
        .subscribe((data) => {
          this.results = data.artists.items.filter(
            (each: any) => each.images.length > 0
          );
        })
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addCommaInNumber(num: number): String {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
