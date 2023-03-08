import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendService } from '../shared/backend.service';
import { Member } from '../shared/member';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent  implements OnInit {
  id: string = '';
  member: Member = { firstname: '', lastname: '', email: '', ipaddress: '', _id: ''};
  form = new FormGroup({
        firstnameControl : new FormControl<string>(''),
        lastnameControl: new FormControl<string>(''),
        emailControl: new FormControl<string>(''),
        ipaddressControl: new FormControl<string>(''),
  });

  constructor(
    private route: ActivatedRoute,
    private bs: BackendService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.readOne(this.id);

  }

  readOne(id: string): void {
      this.bs.getOne(id).subscribe(
      {
        next: (response) => {
                this.member = response;
                console.log('member', this.member);
                this.form.patchValue({
                  firstnameControl: this.member?.firstname,
                  lastnameControl: this.member?.lastname,
                  emailControl: this.member?.email,
                  ipaddressControl: this.member?.ipaddress
                })
                return this.member;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getOne() completed')
      });

  }

  update(): void {
    const values = this.form.value;
    this.member.firstname = values.firstnameControl!;
    this.member.lastname = values.lastnameControl!;
    this.member.email = values.emailControl!;
    this.member.ipaddress = values.ipaddressControl!;
    this.bs.update(this.id, this.member)
      .subscribe({
        next: (response) => {
          console.log(response);
          console.log(response._id);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => console.log('update() completed')
      }
      );
    this.router.navigateByUrl('/table');
  }
  // in der update()-Funktion werden zunächst alle Werte des Formulars ausgelesen und in this.member gespeichert
  // dann wird die update()-Funktion des BackendService aufgerufen und ihr die this.id sowie this.member übergeben
  // Nachdem der Datensatz in der Datenbank aktualisiert wurde, wird wieder die table-Komponente aufgerufen (mithilfe von navigateByUrl()-Fkt. des Router Services)
  cancel(): void {
    this.location.back();
  }

}

// nutzen erneut die subscribe()-Funktion des Observable, das durch die Funktion getOne(id) des BackendService erzeugt wird

// FormControl für ein einzelnes Steuerelement (z.B. ein input oder ein radioButton)
// FormGroup für eine zusammenhängende Menge von Steuerlementen (einem Formular).
// wir haben uns eine Referenzvariable form vom typ FormGroup erstellt, Variable zeigt auf Formular
// Formular besteht aus FormControl Elementen (Zeile 16-19), mit String typisiert
// Zeilen 39-44 werden den Eingabefeldern Werte zugewiesen
// Diese Werte werden member entnommen, welches durch die getOne(id)-Funktion des BackendService befüllt wurde
// patchValue() - kann allen oder bestimmten (einzelnen) FormControl-Elementen einen Wert (value) zuweisen.
// das ? hinter der member-Variablen bei den Wertzuweisungen ist ein safe navigation operator
// safe navigation operator vermeidet, dass versucht wird auf einen Wert zuzugreifen, der noch gar nicht existiert

