import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit {
  albums: any;
  artist: any;

  constructor(
    private route: ActivatedRoute,
    private musicDataService: MusicDataService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.musicDataService
      .getArtistById(id)
      .subscribe((data) => (this.artist = data));

    this.musicDataService.getAlbumsByArtistId(id).subscribe((data) => {
      this.albums = data.items.filter(
        (curValue: { name: string }, index: number, self: any[]) =>
          self.findIndex(
            (t: { name: string }) =>
              t.name.toUpperCase() === curValue.name.toUpperCase()
          ) === index
      );
    });
  }
}
