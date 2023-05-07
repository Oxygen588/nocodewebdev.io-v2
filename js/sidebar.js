buttons=[
    `<a onclick=" 
    BlockManager.addBlockAsParent(new IfStatementBlock(MakeRandomString(70)))"
    style="width:25vw;margin-top:20px;" href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<h5 style="text-align: center;" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">IF STATEMENT</h5>
<p  style="text-align: center;" class="font-normal text-gray-700 dark:text-gray-400">You can use this to create conditions.</p>
<img style="position:relative;width: 50px; left:33%;" src="./img/algorithm.png"></img>
</a>
`,
`<a onclick=" 
BlockManager.addBlockAsParent(new VariableBlock(MakeRandomString(70)))"
style="width:25vw;margin-top:20px;" href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<h5 style="text-align: center;" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">Variable</h5>
<p  style="text-align: center;" class="font-normal text-gray-700 dark:text-gray-400">A code variable is like a container that holds information for a computer program.</p>
<img style="position:relative;width: 50px; left:33%;" src="./img/algorithm.png"></img>
</a>
`,
`<a onclick=" 
BlockManager.addBlockAsParent(new InputBlock(MakeRandomString(70)))"
style="width:25vw;margin-top:20px;" href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<h5 style="text-align: center;" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">Input</h5>
<p  style="text-align: center;" class="font-normal text-gray-700 dark:text-gray-400">Asks a question and remembers what you type as the answer.</p>
<img style="position:relative;width: 50px; left:33%;" src="./img/algorithm.png"></img>
</a>
`,
`<a onclick=" 
BlockManager.addBlockAsParent(new PrintBlock(MakeRandomString(70)))"
style="width:25vw;margin-top:20px;" href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<h5 style="text-align: center;" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">Print</h5>
<p  style="text-align: center;" class="font-normal text-gray-700 dark:text-gray-400">Writes things on the computer screen so you can see them</p>
<img style="position:relative;width: 50px; left:33%;" src="./img/algorithm.png"></img>
</a>
`,
]

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
    createSidebar(){
        var generatedCod = inputSection
        var options = this.showBlockOptions
        buttons.forEach(function (item, index) {
         
          //  console.log(item)
            var found =false
            
            options.forEach(function (item1, index) {

                if (item.includes(item1)){
                    found = true
                }
            });
            if (found){
            
            generatedCod+=item
            }
        });

          document.getElementById("SideBar").innerHTML = generatedCod;
    }
}