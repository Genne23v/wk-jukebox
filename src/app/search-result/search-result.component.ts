import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  results: any;
  searchQuery: String = '';
  constructor(
    private route: ActivatedRoute,
    private musicDataService: MusicDataService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((query) => {
      this.searchQuery = query.q;
      console.log('query', query.q);
    });
    this.musicDataService.searchArtists(this.searchQuery).subscribe((data) => {
      console.log('data', data);
      this.results = data.artists.items.filter(
        (each: { images: string | any[] }) => each.images.length > 0
      );
    });
  }

  addCommaInNumber(num: number): String{
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
  }
}
