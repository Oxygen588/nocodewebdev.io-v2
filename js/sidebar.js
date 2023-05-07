buttons={}
buttons["If-statement"]=`<a onclick=" 
    BlockManager.addBlockAsParent(new IfStatementBlock(MakeRandomString(70)))"
    style="width:28vw;margin-top:20px;" href="#" class="block max-w-m p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<h5 style="text-align: center;" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">IF STATEMENT</h5>
<p  style="text-align: center;" class="font-normal text-gray-700 dark:text-gray-400" id="If-statement-side">We are creating your perfect explenation for this block.</p>

</a>
<button onclick="Sidebar.regenerate('If-statement')" style="position:relative;top:-14px;left:1vw"class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
</svg>

</button>
`
buttons["Variable"]=
`<a onclick=" 
BlockManager.addBlockAsParent(new VariableBlock(MakeRandomString(70)))"
style="width:28vw;margin-top:10px;" href="#" class="block max-w-m p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<h5 style="text-align: center;" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">Variable</h5>
<p  style="text-align: center;" class="font-normal text-gray-700 dark:text-gray-400"id="Variable-side">We are creating your perfect explenation for this block.</p>

</a>
<button onclick="Sidebar.regenerate('Variable')" style="position:relative;top:-14px;left:1vw"class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
</svg>

</button>
`
buttons["Input"]=
`<a onclick=" 
BlockManager.addBlockAsParent(new InputBlock(MakeRandomString(70)))"
style="width:28vw;margin-top:10px;" href="#" class="block max-w-m p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<h5 style="text-align: center;" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">Input</h5>
<p  style="text-align: center;" class="font-normal text-gray-700 dark:text-gray-400"id="Input-side">We are creating your perfect explenation for this block.</p>

</a>
<button onclick="Sidebar.regenerate('Input')" style="position:relative;top:-14px;left:1vw"class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
</svg>

</button>
`
buttons["Print"]=
`<a onclick=" 
BlockManager.addBlockAsParent(new PrintBlock(MakeRandomString(70)))"
style="width:28vw;margin-top:10px;" href="#" class="block max-w-m p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<h5 style="text-align: center;" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">Print</h5>
<p  style="text-align: center;" class="font-normal text-gray-700 dark:text-gray-400" id="Print-side">We are creating your perfect explenation for this block.</p>
</a>

<button onclick="Sidebar.regenerate('Print')" style="position:relative;top:-14px;left:1vw"class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
</svg>

</button>
`,

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
        buttons.forEach(function (item, index) {
         
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
        });

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
            var found =false
            
            options.forEach(async function (item1, index) {

                if (item.includes(item1)){
                    found = true
                    console.log(k+"-side")
                    
                    AiHelper.generateAiResponse(k+" in python",true,async function(cntr) {
                    console.log(await cntr)
                    buttons[k] = buttons[k].replace(document.getElementById(k+"-side").innerHTML ,await cntr)
                    
                    document.getElementById(k+"-side").innerHTML = await cntr;
                    });
                
                }
            });
            if (found){
            
            generatedCod+=item
            }
        }

          document.getElementById("SideBar").innerHTML = generatedCod;
    }
    async regenerate(buttonIdentifier){
        document.getElementById(buttonIdentifier+"-side").innerHTML = "We are re-generating your explenation!";
        AiHelper.generateAiResponseNew(buttonIdentifier+" in python",true,async function(cntr) {
            console.log(await cntr)
            buttons[buttonIdentifier] = buttons[buttonIdentifier].replace(document.getElementById(buttonIdentifier+"-side").innerHTML ,await cntr)
            document.getElementById(buttonIdentifier+"-side").innerHTML = await cntr;
            });
    }
}
