import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  albums: any;
  artist: any;
  subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private musicDataService: MusicDataService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.subscription = this.musicDataService
      .getArtistById(id)
      .subscribe((data) => (this.artist = data));

    this.subscription.add(this.musicDataService
      .getAlbumsByArtistId(id)
      .subscribe((data) => {
        this.albums = data.items.filter(
          (curValue: any, index: any, self: any) =>
            self.findIndex(
              (t: any) => t.name.toUpperCase() === curValue.name.toUpperCase()
            ) === index
        );
      }));
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
