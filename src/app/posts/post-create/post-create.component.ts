import {Component, OnInit,OnDestroy} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostsService } from '../posts.service';
import {Post} from '../post.model';
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
selector: 'app-post-create',
templateUrl: './post-create.component.html',
styleUrls: ['./post-create.component.scss']
})

export class PostCreateComponent implements OnInit, OnDestroy{
  post: Post;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;

  private mode = 'create';
  private postId: string;
  private authStatusSub: Subscription;
  constructor(public postsService: PostsService, public route:ActivatedRoute, private authService: AuthService){}

  ngOnInit(){
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus =>{
        this.isLoading = false;
      }
    )
    this.form = new FormGroup({
    title: new FormControl(null, {
      validators: [Validators.required, Validators.minLength(3)]
    }),
    text: new FormControl(null, {
      validators: [Validators.required]
    }),
    image: new FormControl(null, {
      validators:[Validators.required], asyncValidators:[mimeType]
    })
  });
  this.route.paramMap.subscribe((paramMap: ParamMap)=>{
    if(paramMap.has('postId')){
      this.mode = 'edit';
      this.postId = paramMap.get('postId');
      this.isLoading = true;
      this.postsService.getPost(this.postId).subscribe(postData =>{
        this.post = {
          id: postData._id,
          title: postData.title,
          text: postData.text,
          imagePath: postData.imagePath,
          creator: postData.creator};
        this.isLoading = false;
        this.form.setValue({
          title: this.post.title,
          text: this.post.text,
          image: this.post.imagePath
          })
        });
      } else{
      this.mode = 'create';
      this.postId = null;
      }
    })
  };

onImagePick(event: Event){
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({image:file});
  this.form.get('image').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () =>{
    this.imagePreview = reader.result as string;
  }
  reader.readAsDataURL(file);
}

onSavePost(){
  if(this.form.invalid){
    return;
  }
  this.isLoading = true;
  if(this.mode === 'create'){
    this.postsService.addPost(this.form.value.title, this.form.value.text, this.form.value.image);
  } else{
    this.postsService.updatePost(
      this.postId,
      this.form.value.title,
      this.form.value.text,
      this.form.value.image
      );
  }
  this.form.reset();
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
