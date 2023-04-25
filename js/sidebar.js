buttons=[
    `<a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<h5 style="text-align: center;" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">IF STATEMENT</h5>
<p  style="text-align: center;" class="font-normal text-gray-700 dark:text-gray-400">You can use this to create conditions.</p>
<img style="position:relative;width: 50px; left:33%;" src="./img/algorithm.png"></img>
</a>
`,
]
class SideBar{
    Filter = ""
    showBlockOptions=[]
    constructor(){
    }
    addBlockOption(name){
        this.showBlockOptions.push(name)
    }
    isButtonAllowed(buttonName){
        
        this.showBlockOptions.forEach(function (item, index) {
            console.log("asd")
            return buttonName.includes(item)
        });
        
    }
    createSidebar(){
        var generatedCod = ""
        buttons.forEach(function (item, index) {
            Sidebar.isButtonAllowed(item)
            if (Sidebar.isButtonAllowed(item)){
            console.log(item)
            generatedCod+=item
            }
        });

          document.getElementById("SideBar").innerHTML = generatedCod+"123";
    }
}