import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators'

import {Post} from './post.model'

@Injectable({providedIn:'root'})
export class PostsService
{
  private posts: Post[]=[];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts(){
    this.http.get<{message:string, posts:any}>('http://localhost:3000/api/posts')
    .pipe(map((postData)=>{
      return postData.posts.map(post => {
        return {
          title: post.title,
          text: post.text,
          id: post._id
        };
      });
    }))
    .subscribe((transPosts)=>{
      this.posts = transPosts;
      this.postsUpdated.next([...this.posts])
    });
  }

  getPost(id: string){
    return {...this.posts.find(p=> p.id === id)}
  }

  getPostsUpdeteListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, text:string){
    const post: Post = {
      id: null,
      title: title,
      text: text
    }
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
    .subscribe((responseData)=>{
      const id = responseData.postId;
      post.id = id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    })
  }

  updatePost(id: string, title:string, text:string){
    const post: Post = {
      id: id, title: title, text: text
    };
    this.http.put('http://localhost:3000/api/posts/'+id, post)
    .subscribe(response=> console.log(response));
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
