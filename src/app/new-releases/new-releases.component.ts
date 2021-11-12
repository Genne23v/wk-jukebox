import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { Subscription, SubscriptionLike } from 'rxjs'

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  releases: any;
  subscription!: Subscription;

  constructor(private musicDataService: MusicDataService) {}

  ngOnInit(): void {
    this.subscription = this.musicDataService
      .getNewReleases()
      .subscribe((data) => (this.releases = data.albums.items));
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
