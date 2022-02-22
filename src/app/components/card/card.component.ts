import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Game } from "../games/games.component";
import { ActivatedRoute, Router } from "@angular/router";
import { GamesService } from "src/app/services/games.service";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent implements OnInit {
  @Input() dataInput: Game = {
    name: "",
    description: "",
    platform: "",
    img: "",
  };
  @Input() indexInput: number = 0;
  @Output() selectGame: EventEmitter<any>;

  id: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gamesService: GamesService
  ) {
    this.selectGame = new EventEmitter();
  }

  ngOnInit(): void {
    this.route.params.subscribe((paramsId: any) => {
      this.id = paramsId["id"];
    });
  }

  borrar(arg:any): void {
    this.gamesService.deleteGame(arg).subscribe((resp:any) =>{
      console.log(resp);
      document.location.reload();
    })  
  }

  buyGame() {
    console.log(this.indexInput);
    this.selectGame.emit(this.indexInput);
  }

  detailGame(index: any) {
    this.router.navigate(["/game", index]);
  }
}
