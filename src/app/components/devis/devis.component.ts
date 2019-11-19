import { Component, OnInit } from "@angular/core";
import { callApiFree } from "src/app/core/ApiCall";
import { Devis } from "./Devis";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { DialogDeleteComponent } from "src/app/shared/dialog-delete/dialog-delete.component";

@Component({
  selector: "app-devis",
  templateUrl: "./devis.component.html",
  styleUrls: ["./devis.component.css"]
})
export class DevisComponent implements OnInit {
  dcDevis: string[] = ["id", "client", "etat", "action"];

  dsDevis: MatTableDataSource<Devis>;
  devis: Devis[] = [];

  constructor(public dialog: MatDialog) {
    this.dsDevis = new MatTableDataSource<Devis>();
  }

  async ngOnInit() {
    this.devis = await callApiFree("/listDevis", "get");
    this.dsDevis.data = this.devis;
  }

  imprimer(id: number) {
    alert("J'imprime le" + id);
  }

  deleteDevis(id: number): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: "320px"
    });
    dialogRef.afterClosed().subscribe(async e => {
      if (e === true) {
        console.log(await callApiFree(`/deleteDevis/${id}`, "get"));
        this.devis = await callApiFree("/listDevis", "get");
        this.dsDevis.data = this.devis;
      }
    });
  }
}