import { Component, forwardRef, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonPopover, InfiniteScrollCustomEvent, IonInput } from '@ionic/angular';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Team } from 'src/app/core/models/teams.model';
import { TeamService } from 'src/app/core/services/impl/team.service';

@Component({
  selector: 'app-team-selectable',
  templateUrl: './team-selectable.component.html',
  styleUrls: ['./team-selectable.component.scss'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TeamSelectableComponent),
    multi: true
  }]
})
export class TeamSelectableComponent  implements OnInit {

  teamSelected:Team | null = null;
  disabled:boolean = true;
  private _teams:BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);
  public teams$ = this._teams.asObservable();

  propagateChange = (obj: any) => {}

  @ViewChild('popover', { read: IonPopover }) popover: IonPopover | undefined;

  page:number = 1;
  pageSize:number = 25;
  pages:number = 0;
  constructor(
    public teamSvc:TeamService
  ) { 
  }
  ngOnDestroy(): void {
    this.popover?.dismiss();
  }
  
  onLoadTeams(){
    this.loadTeams();
  }

  

  private async loadTeams(){
    this.page = 1;
    this.teamSvc.getAll(this.page, this.pageSize).subscribe({
      next:response=>{
        this._teams.next([...response.data]);
        this.page++;
        this.pages = response.pages;
      },
      error:err=>{}
    }) 
  }


  loadMoreTeams(notify:HTMLIonInfiniteScrollElement | null = null) {
    if(this.page<=this.pages){
      this.teamSvc.getAll(this.page, this.pageSize).subscribe({
        next:(response:Paginated<Team>)=>{
          this._teams.next([...this._teams.value, ...response.data]);
          this.page++;
          notify?.complete();
        }
      });
    }
    else{
      notify?.complete();
    }
  }
  
  onMoreTeams(ev:InfiniteScrollCustomEvent){
    this.loadMoreTeams(ev.target);
  }

  private async selectTeam(id:string|undefined, propagate:boolean=false){
    if(id){
      this.teamSelected  = await lastValueFrom(this.teamSvc.getById(id));
    }
    else
      this.teamSelected = null;
    if(propagate && this.teamSelected)
      this.propagateChange(this.teamSelected.id);
  }
  
  writeValue(obj: any): void {
    this.selectTeam(obj);
      
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


  onGroupClicked(popover:IonPopover, group:Team){
    this.selectTeam(group.id, true);
    popover.dismiss();
  }

  clearSearch(input:IonInput){
    input.value = "";
  }

  deselect(popover:IonPopover|null=null){
    this.selectTeam(undefined, true);
    if(popover)
      popover.dismiss();
  }
}
