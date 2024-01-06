import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {

  public userForm = new FormGroup({
    id:            new FormControl(0),
    name: new FormControl(''),
    lastName:   new FormControl(''),
    email:        new FormControl(''),
    role:         new FormControl(''),
    jobTitle:       new FormControl(''),
    birthDate:       new FormControl(''),
  });

  constructor(private usersService: UsersService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute){}


  get currentUser(): User{
    const user = this.userForm.value as User;

    return user;
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  onSubmit(): void{

    if(this.userForm.invalid) return;

    this.usersService.addUser(this.currentUser)
      .subscribe(user =>{
        this.toastr.success(`${user.name} add!`);
    });

    // if(this.currentProduct.id){
    //   this.productsService.updateProduct(this.currentProduct)
    //   .subscribe(product =>{

    //   });

    //   return
    // }
  }
}
