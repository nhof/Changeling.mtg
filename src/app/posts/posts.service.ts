import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';

import {Post} from './post.model';

@Injectable({providedIn:'root'})
export class PostsService
{
  private posts: Post[]=[];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router){}

  getPosts(){
    this.http.get<{message:string, posts:any}>('http://localhost:3000/api/posts')
    .pipe(map((postData)=>{
      return postData.posts.map(post => {
        return {
          title: post.title,
          text: post.text,
          id: post._id,
          imagePath: post.imagePath
        };
      });
    }))
    .subscribe((transPosts)=>{
      this.posts = transPosts;
      this.postsUpdated.next([...this.posts])
    });
  }

  getPost(id: string){
    return this.http.get<{_id: string, title: string, text: string, imagePath: string}>('http://localhost:3000/api/posts/'+id)
  }

  getPostsUpdeteListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, text:string, image: File){
    const postData = new FormData();
    postData.append("title", title);
    postData.append("text", text);
    postData.append("image",image, title)
    this.http
    .post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
    .subscribe((responseData)=>{
      const post: Post = {
        id: responseData.post.id,
        title: title,
        text: text,
        imagePath: responseData.post.imagePath
      };
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    })
  }

  updatePost(id: string, title:string, text:string, image: File | string){
    let postData: Post | FormData;
    if(typeof(image)==="object"){
      postData = new FormData();
      postData.append ("id", id);
      postData.append("title", title);
      postData.append("text", text);
      postData.append("image", image, title);

    }else{
      const postData: Post = {
        id: id,
        title: title,
        text: text,
        imagePath: image
      }
    }
    this.http.put('http://localhost:3000/api/posts/'+id, postData)
    .subscribe(response=>{
      const updatedPosts = [...this.posts];
      const post: Post = {
        id: id,
        title: title,
        text: text,
        imagePath: ""
      }
      const oldPostIndex = updatedPosts.findIndex(p =>p.id === post.id) ;
      updatedPosts [oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts])
      this.router.navigate(["/"]);
    } );
  }

  deletePost(postId: string){
    this.http.delete('http://localhost:3000/api/posts/'+postId)
    .subscribe(()=> {
    const upDatedPosts = this.posts.filter(post => post.id !== postId);
    this.posts = upDatedPosts;
    this.postsUpdated.next([...this.posts]);
    console.log('deleted')
    });
  }
}
