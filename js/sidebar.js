buttons={}
buttons["Ifstatement"]=buttonFormat("Ifstatement")
buttons["Variable"]=buttonFormat("Variable")
buttons["Input"]=buttonFormat("Input")
buttons["Print"]=buttonFormat("Print")
buttons["Loop"]=buttonFormat("Loop")

function buttonFormat(Name){
  return`<a onclick=" 
  BlockManager.addBlockAsParent(new `+Name+`Block(MakeRandomString(70)))"
  style="width:28vw;margin-top:10px;" href="#" class="block max-w-m p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
  <h5 style="text-align: center;" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black"> `+Name+` </h5>
  <p  style="text-align: center;" class="font-normal text-gray-700 dark:text-gray-400" id="`+Name+`-side"></p>
  </a>
  
  <button onclick="Sidebar.generate('`+Name+`')" id="`+Name+`-side1"  style="position:relative;top:-14px;left:1vw"class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
  
  
  </button>
  `
}


//AiHelper.generateAiResponse("code If statement")
inputSection = `


    `
    setTimeout(() => {

    $("#sideBarSearch").on( "change", function() {
        console.log("1233")
        Sidebar.FilterChange($("#sideBarSearch").val())
      } );
    }, "1000");
class SideBar{
    Filter = ""
    showBlockOptions=[]
    constructor(){
        
    }
    FilterChange(filter){
        var generatedCod = inputSection
        var options = this.showBlockOptions
        for (let k in buttons) {
            let item = buttons[k]
         
            //console.log(item)
            var found =false
            
            options.forEach(function (item1, index) {
                

                if (item.includes(item1)&&(item.includes(filter))){
                    console.log(index)
                    found = true
                }
            });
            if (found){
            
            generatedCod+=item
            }
        }

          document.getElementById("SideBar").innerHTML = generatedCod;
    }
    addBlockOption(name){
       this.showBlockOptions.push(name)
       //console.log(this.showBlockOptions)
    }
    isButtonAllowed(buttonName){
        
        this.showBlockOptions.forEach(function (item, index) {
           // console.log("asd")
            return buttonName.includes(item)
        });
        
    }

    async createSidebar(){
        var generatedCod = inputSection
        var options = this.showBlockOptions
        for (let k in buttons) {
         let item = buttons[k]
          //  console.log(item)
            var found =true
            
            options.forEach(async function (item1, index) {

                if (item.includes(item1)){
                    found = true
                    console.log(k+"-side")
                    
             //       AiHelper.generateAiResponse(k+" in python",true,async function(cntr) {
             //       console.log(await cntr)
             //       buttons[k] = buttons[k].replace(document.getElementById(k+"-side").innerHTML ,await cntr)
                    
             //       document.getElementById(k+"-side").innerHTML = await cntr;
             //       });
                
                }
            });
            if (found){
            
            generatedCod+=item
            }
        }

          document.getElementById("SideBar").innerHTML = generatedCod;
    }
    async regenerate(buttonIdentifier){
        document.getElementById(buttonIdentifier+"-side").innerHTML = `We are generating your explenation!`;
        document.getElementById(buttonIdentifier+"-side1").innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
`;
document.getElementById(buttonIdentifier+"-side1").onclick = function() { Sidebar.regenerate(buttonIdentifier) }
        AiHelper.generateAiResponseNew(buttonIdentifier+" in python",true,async function(cntr) {
            console.log(await cntr)
            buttons[buttonIdentifier] = buttons[buttonIdentifier].replace(document.getElementById(buttonIdentifier+"-side").innerHTML ,await cntr)
            document.getElementById(buttonIdentifier+"-side").innerHTML = await cntr;
            });
    }

    async generate(buttonIdentifier){
        document.getElementById(buttonIdentifier+"-side").innerHTML = `We are generating your explenation!`;
        document.getElementById(buttonIdentifier+"-side1").innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
`;
document.getElementById(buttonIdentifier+"-side1").onclick = function() { Sidebar.regenerate(buttonIdentifier) }
        AiHelper.generateAiResponse(buttonIdentifier+" in python",true,async function(cntr) {
            console.log(await cntr)
            buttons[buttonIdentifier] = buttons[buttonIdentifier].replace(document.getElementById(buttonIdentifier+"-side").innerHTML ,await cntr)
            document.getElementById(buttonIdentifier+"-side").innerHTML = await cntr;
        });
    }
}
