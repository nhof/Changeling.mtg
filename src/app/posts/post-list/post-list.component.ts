import {Component, OnDestroy, OnInit} from '@angular/core';
import { PostsService } from '../posts.service';
import {Post} from '../post.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls:  ['./post-list.component.scss']
})


export class PostListComponent implements OnInit, OnDestroy{
  posts: Post[] =[];
  isLoading = false;
  private postsSub: Subscription;

  constructor(public postsService: PostsService){}
  ngOnInit(){
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostsUpdeteListener()
    .subscribe((posts: Post[])=>{
      this.isLoading = false;
      this.posts = posts});
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

  onDelete(postId: string){
    this.postsService.deletePost(postId);
  }
}
