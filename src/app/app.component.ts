import { Component } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from '@angular/fire/auth'

import {Firestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc} from '@angular/fire/firestore'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public storeData:any
  constructor(public auth:Auth, public firestore:Firestore){
    this.storeData = this.getData();
  }

   signup(email:string, password:string){
    console.log(email, password)
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    
  }

  signin(email:string, password:string){
    console.log(this.auth)
    signInWithEmailAndPassword(this.auth, email, password).then(()=>{
      console.log("done")
    })
  }

  postData(email:string, password:string){
    const dbInstance = collection(this.firestore, 'users')
    addDoc(dbInstance, {email, password}).then(()=>{
      console.log("done")
    })
  }

  getData(){
    const dbInstance = collection(this.firestore, "users")
    getDocs(dbInstance).then(resp=>{
      this.storeData = resp.docs.map(item=>{
        return {...item.data(), id:item.id}
      })
    })
  }

  updateData(id:string){
    const updatigData = doc(this.firestore, 'users', id)
    updateDoc(updatigData, {
      email:"sajjadmazhar"
    }).then(()=>{
      this.getData()
    })

  }

  deleteData(id:string){
    const deletingData = doc(this.firestore, 'users', id)
    deleteDoc(deletingData)
      .then(()=>{
        alert('Data deleted')
        this.getData()
      })
  }
}

