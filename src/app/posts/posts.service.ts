import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

import {Post} from './post.model'

@Injectable({providedIn:'root'})
export class PostsService{
  private posts: Post[]=[];
  private postsUpdated = new Subject<Post[]>();

  getPosts(){
    return [...this.posts];
  }

  getPostsUpdeteListener(){
    return this.postsUpdated.asObservable();
  }
  addPost(title: string, text:string){
    const post: Post = {
      title: title,
      text: text,
      date: new Date
    }
    this.posts = [post].concat(this.posts);
    this.postsUpdated.next([...this.posts]);
  }
}
