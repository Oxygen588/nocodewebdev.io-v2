
function includeHTML(elemendAttribute) {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute(elemendAttribute);
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute(elemendAttribute);
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}


function createDisplayDiv(RandomStringId,description,title){
  return `<div id="`+RandomStringId+"3"+`">

      <td><a style="position: relative;width:200px;height:78px;font-family:Oracle Sans Condensed;"class="list-group-item list-group-item-action py-2 ripple active text" >${title}
        <span class="dot"id="`+RandomStringId+"1"+`" style="top;30px;"> 
        <div style="width:30px;position:relative;left:80%;top:40%;height:45px;">
      <div style="
      position:absolute;
      left:-80px;
      top:-7px;
      transition: 0.5s;
      " id="`+RandomStringId+">"+`"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
      </svg>
      </div>

      <div id="`+(RandomStringId+"dell")+`"style="position:relative;left:40%;top:-35px;z-index:100;cursor: pointer;  transition: 0.70s;
      -webkit-transition: 0.70s;
      -moz-transition: 0.70s;
      -ms-transition: 0.70s;
      -o-transition: 0.70s;
      width:25px;
      height:25px">
      
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.3" stroke="currentColor" >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
 
      <style>
      #`+(RandomStringId+"dell")+`:hover{
        transition: 0.70s;
        -webkit-transition: 0.70s;
        -moz-transition: 0.70s;
        -ms-transition: 0.70s;
        -o-transition: 0.70s;
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        transform: rotate(180deg);
      }
      </style>
      
      </div>
      <div style="
      position:absolute;
      left:-65px;
      top:-7px;
      transition: 0.5s;
      "
      " id="`+RandomStringId+"<"+`"
      >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
</svg>

      </div>

</div>

        </span>
           <div
        id="`+RandomStringId+"CodeString"+`"
        style="style:absolute;top:13px;font-family: 'RX100';font-size:18px;bold:100;width:175px;height:30px;overflow:scroll !important;overflow-y: scroll !important;white-space: nowrap;"
        
        >
${description}
</div>
        </a></td>

  
        <button 
        onclick="
        
        document.getElementById('`+RandomStringId+"EDITMENU"+`').style.display = 'block';


        "
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" style="width:200px;text-align: center;outline: none; ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>

        <span >Edit</span>
      </button>



    
    </div>



             `
}
function switchVarManagerDet(mId){
  console.log(mId)
  document.getElementById(mId+"Manager").innerHTML = `<input  placeholder="Type here your variable." id="`+mId+`" type="text" class="w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">`
  document.getElementById(mId+"Button").innerHTML = "Select from existing variables."
}
function switchVarManagerDet1(mId){
  variables = BlockManager.getAllVariables();

  options =""
  for (let i = 0; i < variables.length; i++) {
    options+= "<option value='"+variables[i][0]+ "'>"+variables[i][0]+ " - Current container holder:"+variables[i][0]+"</option>"
  }
  console.log(mId+"Manager")
  document.getElementById(mId+"Manager").innerHTML =`
  <select id="${mId}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
 ${options}
  </select>
`
document.getElementById(mId+"Button").innerHTML = "Create new variable."
document.getElementById(mId+"Button").onclick = function() {switchVarManagerDet(mId)};

}
function createVariableinput(RandomStringId,varid){
 return  `
  <label for="large-input" class="block mb-2 text-m font-medium text-gray-900 " >What is the first thing you want to compare? Choose a word, number, or variable.</label>
  <div id="`+(RandomStringId+varid+'Manager')+`">
    <input  placeholder="Type here your variable." id="`+(RandomStringId+varid)+`" type="text" class="w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  </div>
  <button onClick="switchVarManagerDet1('${RandomStringId+varid}')"                  id = "`+(RandomStringId+varid+"Button")+`" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="button">
  See variables.
</button>
 
  `
}