var RecipeCardWrappers=document.getElementsByClassName('RecipeCardWrapper');//get all divs whose class is RecipeCardWrapper, i.e. all div boxes where the author's work is placed
function filterCategory(e){// 
    var author=e.id.split('-')[0];//string intercepted by "-" into an array to get the name, for example kla-author as long as kla, and the data-author property bound on the author's work div behind to do a comparison
    for(var item of RecipeCardWrappers){//for of loop array objects, i.e. div boxes where each item places the author's work
        if(item.dataset.author.toLowerCase()==author){ //click on the event to get the author's name is lowercase, that is, the above mentioned is kla, and the name of each author's work box binding is uppercase, so the uppercase will be converted to lowercase by the toLowerCase() function to do the comparison
            item.style.display="block" //css property display
        }else{
            item.style.display="none"//css attribute hidden
        }
    }
}

