this.JST={"src/templates/building_block.html":function(obj){obj||(obj={});var __t,__p='',__e=_.escape;with(obj){__p+='<div class="column">\n  <div class="building-block-item">\n    <a href="http://zurb.com/building-blocks/'+
((__t=(slug))==null?'':__t)+'">\n    <div>\n      <h4 class="building-block-item-header">'+
((__t=(name))==null?'':__t)+'</h4>\n      <img src="'+
((__t=(image_url))==null?'':__t)+'"/>\n    </div>\n  </div>\n</div>\n';}
return __p},"src/templates/delicious_posts.html":function(obj){obj||(obj={});var __t,__p='',__e=_.escape;with(obj){__p+='<!-- Delicious Link Template -->\n<li>\n  <a href="'+
((__t=(u))==null?'':__t)+'">\n    <span class="date">'+
((__t=(formattedDate))==null?'':__t)+'</span>\n    <span class="title">'+
((__t=(d))==null?'':__t)+'</span>\n    <span class="description">'+
((__t=(n))==null?'':__t)+'</span>\n  </a>\n</li>\n';}
return __p},"src/templates/forum_post.html":function(obj){obj||(obj={});var __t,__p='',__e=_.escape,__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}
with(obj){__p+='<!--topic 1-->\n\n<br>\n<br>\n\n<div class="row">\n  <div class="medium-9 medium-centered columns">\n    <div class="row post impressions new hide-for-small-only small-up-2 large-up-div post-count-spacing">\n      ';if(comments_count>0){;__p+='\n         <div class="column">\n            <div class="post-count new already-checked test">\n               <a href="'+
((__t=(url))==null?'':__t)+'">\n                 <div class="post-count-container new already-checked">\n                    <span class="reply-count new-post already-checked">NEW</span>\n                 </div>\n                 <div class="total-post-count new total-repdives">\n                    ';if(comments_count==1){;__p+='\n                    '+
((__t=(comments_count))==null?'':__t)+' Reply\n                    ';}else{;__p+='\n                    '+
((__t=(comments_count))==null?'':__t)+' Replies\n                    ';};__p+='\n                 </div>\n               </a>\n            </div>\n         </div>\n         ';}else{;__p+='\n        <div class="column">\n          <div class="post-count new-general">\n            <a href="'+
((__t=(url))==null?'':__t)+'">\n              <div class="post-count-container new-general">\n                <span class="reply-count new-general">NEW</span>\n              </div>\n            </a>\n          </div>\n          <a href="'+
((__t=(url))==null?'':__t)+'"></a>\n        </div>\n         ';};__p+='\n\n         <div class="column desc">\n           <div class="post-description">\n               <h5 class="content-title">\n                  <a href="'+
((__t=(url))==null?'':__t)+'">'+
((__t=(title||"Untitled"))==null?'':__t)+'</a>\n               </h5>\n               <p class="author-name">\n                   By\n                   <span class="author">\n                      <strong>\n                        '+
((__t=(author_name))==null?'':__t)+'\n                        ';if(typeof(latest_comment_author_name)!="undefined"){;__p+=',';};__p+='\n                      </strong>\n                   </span>\n                   ';if(typeof(latest_comment_author_name)!="undefined"){;__p+='\n                   <span class="by">last Reply by</span>\n                   <span class="when">\n                      <span class="author">\n                         <strong>'+
((__t=(latest_comment_author_name))==null?'':__t)+'</strong>\n                      </span>\n                      '+
((__t=(latest_comment_created_at_time_ago))==null?'':__t)+' ago\n                   </span>\n                   ';}else{;__p+='\n                   <span class="when">'+
((__t=(created_at_time_ago))==null?'':__t)+' ago</span>\n                   ';};__p+='\n               </p>\n\n               <div class="post-description copy">\n                   <p>'+
((__t=(body))==null?'':__t)+'</p>\n               </div>\n            </div>\n         </div>\n      <hr>\n    </div>\n    <!-- end topic 1 large -->\n\n    <!-- start  topic 1 small -->\n    <div class="row post impressions new show-for-small-only post-count-spacing small-up-2 large-up-2">\n\n            ';if(comments_count>0){;__p+='\n              <div class="column">\n                <div class="post-count new already-checked">\n                   <a href="'+
((__t=(url))==null?'':__t)+'">\n                     <div class="post-count-container new already-checked">\n                        <span class="reply-count new-post already-checked">NEW</span>\n                     </div>\n                     ';if(comments_count>0){;__p+='\n                       <div class="total-post-count new total-repdives">\n                          ';if(comments_count==1){;__p+='\n                          '+
((__t=(comments_count))==null?'':__t)+' Reply\n                          ';}else{;__p+='\n                          '+
((__t=(comments_count))==null?'':__t)+' Repdives\n                          ';};__p+='\n                       </div>\n                     ';};__p+='\n                   </a>\n                </div>\n              </div>\n            ';}else{;__p+='\n              <div class="column">\n                <div class="post-count new-general">\n                  <a href="'+
((__t=(url))==null?'':__t)+'">\n                    <div class="post-count-container new-general">\n                      <span class="reply-count new-general">NEW</span>\n                    </div>\n                  </a>\n                </div>\n                <a href="'+
((__t=(url))==null?'':__t)+'"></a>\n              </div>\n            ';};__p+='\n            <div class="column">\n                <h5 class="content-title">\n                   <a href="'+
((__t=(url))==null?'':__t)+'">'+
((__t=(title||"Untitled"))==null?'':__t)+'</a>\n                </h5>\n                <p class="author-name">\n                   By\n                   <span class="author">\n                      <strong>\n                        '+
((__t=(author_name))==null?'':__t)+'\n                        ';if(typeof(latest_comment_author_name)!="undefined"){;__p+=',';};__p+='\n                      </strong>\n                   </span>\n                   ';if(typeof(latest_comment_author_name)!="undefined"){;__p+='\n                   <span class="by">last Reply by</span>\n                   <span class="when">\n                      <span class="author">\n                         <strong>'+
((__t=(latest_comment_author_name))==null?'':__t)+'</strong>\n                      </span>\n                      '+
((__t=(latest_comment_created_at_time_ago))==null?'':__t)+' ago\n                   </span>\n                   ';}else{;__p+='\n                   <span class="when">'+
((__t=(created_at_time_ago))==null?'':__t)+' ago</span>\n                   ';};__p+='\n                </p>\n            </div>\n          <div class="post-description">\n           <div class="post-description copy">\n             <p></p>\n           </div>\n          </div>\n          <hr>\n    </div>\n  </div>\n</div>\n<!--end topic 1 small-->\n';}
return __p},"src/templates/foundation_posts.html":function(obj){obj||(obj={});var __t,__p='',__e=_.escape;with(obj){__p+='<div class="row archive-posts bump-25 post-box">\n  <div class="large-10 large-centered columns">\n    <h1 class="title text-center">\n      <a href="'+
((__t=(seo_url))==null?'':__t)+'">'+
((__t=(title))==null?'':__t)+'</a>\n    </h1>\n  </div>\n</div>\n\n<div class="row archive-posts bump-25 post-box">\n  <div class="large-8 large-centered columns">\n    <div class="comment-author-line">\n      <p class="centered-text">\n        <span itemprop="author">'+
((__t=(user))==null?'':__t)+'</span> wrote this.\n        <span itemprop="discussionUrl">It has <a href="'+
((__t=(seo_url))==null?'':__t)+'">'+
((__t=(reactions))==null?'':__t)+' Reactions</a></span>\n      </p>\n    </div>\n    <hr>\n\n    <div class="description">\n      <p class="post-details">\n        '+
((__t=(description))==null?'':__t)+'\n        ...<span class="continue"><a href="'+
((__t=(seo_url))==null?'':__t)+'">Keep reading</a></span>\n      </p>\n    </div>\n  </div>\n</div>\n\n<div class="row dashed-break">\n  <div class="large-10 columns large-centered">\n    <br>\n    <hr class="dashed">\n    <br>\n  </div>\n</div>\n';}
return __p},"src/templates/lesson.html":function(obj){obj||(obj={});var __t,__p='',__e=_.escape;with(obj){__p+='<li>\n  <div class="lesson-item">\n    <a href="http://zurb.com/university/lessons/'+
((__t=(slug))==null?'':__t)+'">\n      <img src="'+
((__t=(preview_image))==null?'':__t)+'"/>\n      <h5 class="lesson-item-header">'+
((__t=(title))==null?'':__t)+'</h5>\n    </a>\n  </div>\n</li>\n';}
return __p}};