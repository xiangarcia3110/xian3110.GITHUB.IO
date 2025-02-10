/*** Minimum jQuery-like library ***/
/*** Developed by Ismael Jurado  ***/


// JSON GET Call
async function get(url="",format="json"){
   const options={
      method: "GET",
      headers:{
         "Accept": "application/json"
      }
   };
   const response = await fetch(url,options);
   if(response.status===200)
   { 
      var promise=null;
      switch(format)
      {
         case "json":
            promise=response.json();
            break;
         case "text":
            promise=response.text();
            break;
      }
      return promise;
   }
   else
      return false;
}

// JSON POST Call
async function post(url="",data={},convert="json"){

   const options={
      method: "POST",
      headers:{
         "Content-Type": "application/json",
         "Accept": "application/json"
      },
      body: JSON.stringify(data)
   };
   const response= await fetch(url,options);
   if(response.status===200)
   { 
      var promise=null;
      switch(convert)
      {
         case "json":
            promise=response.json();
            break;
         case "text":
            promise=response.text();
            break;
      }
      return promise;
   }
   else
      return false;
}


// jQuery-like object
class domElement {
   constructor(selector) {
      this.selector = selector || ':root';
      this.elements = null;
      this.element=null;
   }

   init() {
      this.elements=document.querySelectorAll(this.selector);
      if(this.elements.length>0)
         this.element=this.elements[0];
   };
   on(event, callback) {
      if(this.elements.length>0){
         this.elements.forEach(elem => {
            elem.addEventListener(event,callback,false);
         });
      }
         
   };
   off(event, callback) {
      if(this.elements.length>0){
         this.elements.forEach(elem => {
            elem.removeEventListener(event,callback,false);
         });
      }
   };
   val(newVal) {
      if(newVal===undefined)
      {
         return this.element.value;
      }
      else
      {
         if(this.elements.length>0){
            this.elements.forEach(elem => {
               elem.value=newVal;
            });
         }         
      }
   };
   text(text){
      if(text===undefined)
      {
         return this.element.innerText;
      }
      else
      {
         if(this.elements.length>0){
            this.elements.forEach(elem => {
               elem.innerText=text;
            })
         }
      }
   };
   addClass(newClass){
      if(this.elements.length>0){
         this.elements.forEach(elem => {
            elem.classList.add(newClass);
         });
      }
   };
   removeClass(removedClass){
      if(this.elements.length>0){
         this.elements.forEach(elem => {
            elem.classList.remove(removedClass);
         });
      }
   };
   addChild(newElement){
      if(this.elements.length>0){
         this.elements.forEach(elem => {
            elem.appendChild(newElement);
         });
      }
   };
   removeChild(removedElement){
      if(this.elements.length>0){
         this.elements.forEach(elem => {
            elem.removeChild(removedElement);
         });
      }
   };
   removeElement(){
      if(this.elements.length>0){
         this.elements.forEach(elem => {
            elem.remove();
         });
         this.elements=null;
         this.element=null;
      }
   };
   clear(){
      if(this.elements.length>0){
         this.elements.forEach(elem => {
            elem.innerHTML='';
         });
      }
   }
   append(html) {
      if(this.elements.length>0){
         this.elements.forEach(elem => {
            elem.innerHTML=elem.innerHTML + html;
         });
      }
   };
   prepend(html) {
      if(this.elements.length>0){
         this.elements.forEach(elem => {
            elem.innerHTML=html + elem.innerHTML;
         });
      }      
   };
   html(html) {
      if(this.elements.length>0){
         this.elements.forEach(elem => {
            elem.innerHTML=html;
         });
      }            
   };
   attr(item,value){
      if(value===undefined)
      {
         return this.element[item];
      }
      else
      {
         if(this.elements.length>0){
            this.elements.forEach(elem => {
               elem[item]=value;
            });
         }      
      }
   }
   load(url){
      const options={
         method: "GET",
         headers:{
            "Accept": "text/html"
         }
      };
   
      fetch(url,options)
         .then(result => result.text())
         .then(text => {
            // Get script code
            const tagScript='(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)';
            var code=text.match(new RegExp(tagScript, 'im')); 
            if(code!=null)
            {
               code=code[1];
               text=text.replace(new RegExp(tagScript, 'im'),'');               
            }
            var parser = new DOMParser();
            const html=parser.parseFromString(text,'text/html');
            this.clear();
            this.addElem(html.firstChild);
            if(code!=null){
               window.setTimeout(code,0);
            }
         }).catch(err => {
            console.warn('Error',err);
         });

   };
}


$ = function(selector) {
   var el = new domElement(selector);
   el.init();
   return el;
}

function loadImageFromDisk(file,image)
{
   if($(file).attr('files')[0]){
      $(image).attr('src',URL.createObjectURL($(file).attr('files')[0]));
   } 
}

function getFileName(input)
{
   if(input.files.length===1)
   {
      return input.files[0].name;
   }
   return '';
}
