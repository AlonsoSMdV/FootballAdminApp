import { Component, forwardRef, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonPopover, InfiniteScrollCustomEvent, IonInput } from '@ionic/angular';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { League } from 'src/app/core/models/leagues.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { LeagueService } from 'src/app/core/services/impl/league.service';

@Component({
  selector: 'app-league-selectable',
  templateUrl: './league-selectable.component.html',
  styleUrls: ['./league-selectable.component.scss'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LeagueSelectableComponent),
    multi: true
  }]
})
export class LeagueSelectableComponent  implements OnInit {

  leagueSelected:League | null = null;
  disabled:boolean = true;
  private _leagues:BehaviorSubject<League[]> = new BehaviorSubject<League[]>([]);
  public leagues$ = this._leagues.asObservable();

  propagateChange = (obj: any) => {}

  @ViewChild('popover', { read: IonPopover }) popover: IonPopover | undefined;

  page:number = 1;
  pageSize:number = 25;
  pages:number = 0;
  constructor(
    public leagueSvc:LeagueService
  ) { 
  }
  ngOnDestroy(): void {
    this.popover?.dismiss();
  }
  
  onLoadLeagues(){
    this.loadLeagues();
  }

  

  private async loadLeagues(){
    this.page = 1;
    this.leagueSvc.getAll(this.page, this.pageSize).subscribe({
      next:response=>{
        this._leagues.next([...response.data]);
        this.page++;
        this.pages = response.pages;
      },
      error:err=>{}
    }) 
  }


  loadMoreLeagues(notify:HTMLIonInfiniteScrollElement | null = null) {
    if(this.page<=this.pages){
      this.leagueSvc.getAll(this.page, this.pageSize).subscribe({
        next:(response:Paginated<League>)=>{
          this._leagues.next([...this._leagues.value, ...response.data]);
          this.page++;
          notify?.complete();
        }
      });
    }
    else{
      notify?.complete();
    }
  }
  
  onMoreLeagues(ev:InfiniteScrollCustomEvent){
    this.loadMoreLeagues(ev.target);
  }

  private async selectLeague(id:string|undefined, propagate:boolean=false){
    if(id){
      this.leagueSelected  = await lastValueFrom(this.leagueSvc.getById(id));
    }
    else
      this.leagueSelected = null;
    if(propagate && this.leagueSelected)
      this.propagateChange(this.leagueSelected.id);
  }
  
  writeValue(obj: any): void {
    this.selectLeague(obj);
      
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit() {}


  onGroupClicked(popover:IonPopover, group:League){
    this.selectLeague(group.id, true);
    popover.dismiss();
  }

  clearSearch(input:IonInput){
    input.value = "";
  }

  deselect(popover:IonPopover|null=null){
    this.selectLeague(undefined, true);
    if(popover)
      popover.dismiss();
  }
}
