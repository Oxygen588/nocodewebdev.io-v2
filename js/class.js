function Randomnumber(min, max) {
    return Math.random() * (max - min) + min;
}
function MakeRandomString(length) {
    var result           = 'A';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


var targetOption = {
  anchor: "LeftMiddle",
  maxConnections: 2,
  isSource: true,
  isTarget: true,
  reattach: true,
  endpoint: "Dot",
  connector: [ "Bezier", { curviness: 2 } ],
  setDragAllowedWhenFull: true
};
jsPlumb.importDefaults({
  ConnectionsDetachable: true,
  ReattachConnections: true,
  maxConnections: 2,
  Container: "page_connections"
});
var LeftsourceOption = {
  tolerance: "touch",
  anchor: "LeftMiddle",
  maxConnections: 2,
  isSource: true,
  isTarget: false,
  reattach: true,
  endpoint: "Dot",
  connector: [ "Flowchart", { curviness: 5 } ],
  setDragAllowedWhenFull: true
};
var RightsourceOption = {
  tolerance: "touch",
  anchor: "RightMiddle",
  maxConnections: 2,
  isSource: true,
  isTarget: true,
  reattach: true,
  endpoint: "Dot",
  connector: [ "Flowchart", { curviness: 5 } ],
  setDragAllowedWhenFull: true
};
function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.hiddenX,
    top: rect.top + window.hiddenY
  };
}


class BlocksManager{
  ParentBlocks = {}
  Blocks = {}
  CurrentClick = ""
  constructor(){

  }

  ManageConnectionCreation(id){

        if(this.CurrentClick!="" && id!=this.CurrentClick&& BlockManager.getBlockFromId(id).GetConnectFrom()==""&&BlockManager.getBlockFromId(id).GetBlocksConnectedTo().length==0){
          BlockManager.getBlockFromId(id).SetDotId(jsPlumb.addEndpoint(id, LeftsourceOption));
          jsPlumb.connect({
            source: BlockManager.getBlockFromId(id).GetDotId(),
            target: BlockManager.getBlockFromId(this.CurrentClick).GetDotId()
          });
          BlockManager.getBlockFromId(id).SetBlockLevel(BlockManager.getBlockFromId(this.CurrentClick).GetBlockLevel()+1)
          BlockManager.MakeBlockNonParent(BlockManager.getBlockFromId(id))
          BlockManager.getBlockFromId(id).SetConnectFrom(this.CurrentClick)
          BlockManager.getBlockFromId(this.CurrentClick).Connect2Block(id)
          document.getElementById(this.CurrentClick+">").style.transform = 'translate3d(0, 0, 0)';
          document.getElementById(this.CurrentClick+"<").style.transform = 'translate3d(0, 0, 0)';
          this.CurrentClick = ""
        }else if(this.CurrentClick == id){
          var block = BlockManager.getBlockFromId(this.CurrentClick)
          jsPlumb.deleteEndpoint(block.GetDotId())
          //console.log("asd")
          document.getElementById(id+">").style.transform = 'translate3d(0, 0, 0)';
          document.getElementById(id+"<").style.transform = 'translate3d(0, 0, 0)';
          this.CurrentClick = ""
        }else if (BlockManager.getBlockFromId(id).CanConnectFrom()){

          document.getElementById(id+">").style.transform = 'translate3d(-80px, 0, 0)';
          document.getElementById(id+"<").style.transform = 'translate3d(80px, 0, 0)';
          


          BlockManager.getBlockFromId(id).SetDotId(jsPlumb.addEndpoint(id, RightsourceOption));
          this.CurrentClick = id
        }
      

  } 



  addBlockAsParent(block){
    this.ParentBlocks[block.getBlockId()] = block;
    this.ManageDeleteButton(block.getBlockId())
    this.ManageConnectionButtons(block.getBlockId())
  }
  MakeBlockNonParent(block){
    this.Blocks[block.getBlockId()] = block
    delete this.ParentBlocks[block.getBlockId()]
  }
  getBlockFromId(BlockId){
    if (this.Blocks[BlockId]!==undefined){
      return this.Blocks[BlockId]
    }else if(this.ParentBlocks[BlockId]!==undefined){
      return this.ParentBlocks[BlockId]
    }
    return false
  }

  RemoveBlock(block){
    delete this.ParentBlocks[block.getBlockId()]
    delete this.Blocks[block.getBlockId()]
  }
  RemoveBlockFromId(blockid){
    delete this.ParentBlocks[blockid]
    delete this.Blocks[blockid]
  }
  RemoveParentBlockFromId(blockid){
    delete this.ParentBlocks[blockid]
  }

  ManageDeleteButton(id){
    jQuery("#"+id+"dell").click(function() {
      jQuery(id).remove()
      var block = BlockManager.getBlockFromId(id)
      if (block.GetDotId() !=""){
        jsPlumb.deleteEndpoint(block.GetDotId())
        if (BlockManager.getBlockFromId(block.GetConnectFrom()) !=""){
        BlockManager.getBlockFromId(block.GetConnectFrom()).DisconnectFromThisBlock(id)
        
        //if (BlockManager.getBlockFromId(block.GetConnectFrom()).CanDeleteDot()){
          //console.log(BlockManager.getBlockFromId(block.GetConnectFrom()).GetDotId())
          jsPlumb.deleteEndpoint(BlockManager.getBlockFromId(block.GetConnectFrom()).GetDotId())
        //}
      }
      }
      BlockManager.RemoveBlockFromId(id)
      
    });
  }
  ManageConnectionButtons(id){
    jQuery("#"+id+"1").click(function() {
      BlockManager.ManageConnectionCreation(id)
    });
  }
  ReOrderParentsByHeight(){
    var newBlockToReturn = {}
    var ListOfAlreadyInNewBlockToReturn = []

    while(Object.keys(this.ParentBlocks).length!=ListOfAlreadyInNewBlockToReturn.length){
      var last =999999
      var lastKey = ""
      var lastValue = ""
    for (const [key1, value] of Object.entries(this.ParentBlocks)) {
      if (ListOfAlreadyInNewBlockToReturn.includes(key1) == false){
        if (last>getOffset(document.querySelector("#"+value.getBlockId())).top){
          last = getOffset(document.querySelector("#"+value.getBlockId())).top
          lastKey = key1
          lastValue = value
        }
      }
    }
    newBlockToReturn[lastKey] = lastValue
    ListOfAlreadyInNewBlockToReturn.push(lastKey)
    }
    return newBlockToReturn

  }


  ReOrderParentsByHeight(){
    var newBlockToReturn = {}
    var ListOfAlreadyInNewBlockToReturn = []

    while(Object.keys(this.ParentBlocks).length!=ListOfAlreadyInNewBlockToReturn.length){
      var last =999999
      var lastKey = ""
      var lastValue = ""
    for (const [key1, value] of Object.entries(this.ParentBlocks)) {
      if (ListOfAlreadyInNewBlockToReturn.includes(key1) == false){
        if (last>getOffset(document.querySelector("#"+value.getBlockId())).top){
          last = getOffset(document.querySelector("#"+value.getBlockId())).top
          lastKey = key1
          lastValue = value
        }
      }
    }
    newBlockToReturn[lastKey] = lastValue
    ListOfAlreadyInNewBlockToReturn.push(lastKey)
    }
    return newBlockToReturn

  }

  ReOrderBlocksByHeight(){
    var newBlockToReturn = {}
    var ListOfAlreadyInNewBlockToReturn = []

    while(Object.keys(this.Blocks).length!=ListOfAlreadyInNewBlockToReturn.length){
      var last =999999
      var lastKey = ""
      var lastValue = ""
    for (const [key1, value] of Object.entries(this.Blocks)) {
      if (ListOfAlreadyInNewBlockToReturn.includes(key1) == false){
        if (last>getOffset(document.querySelector("#"+value.getBlockId())).top){
          last = getOffset(document.querySelector("#"+value.getBlockId())).top
          lastKey = key1
          lastValue = value
        }
      }
    }
    newBlockToReturn[lastKey] = lastValue
    ListOfAlreadyInNewBlockToReturn.push(lastKey)
    }
    return newBlockToReturn

  }

  CreateCode(){
    var GeneratedCod = ""
    var NewBlocks = jQuery.extend({}, this.ReOrderBlocksByHeight());
    this.ParentBlocks = this.ReOrderParentsByHeight();
    this.Blocks = this.ReOrderBlocksByHeight()
    for (const [key, value] of Object.entries(this.ParentBlocks)) {
      GeneratedCod+="\n"+value.GetPythonCode()
      ////console.log(key, value);
    }
    //console.log(NewBlocks)
    for (const [key1, value] of Object.entries(this.ParentBlocks)) {

      //console.log(value.GetBlocksConnectedTo())
      value.ReOrderBlocksConnectedTo()
      
      value.GetBlocksConnectedTo().forEach(function (item, index) {
        //console.log("<!&*>"+key1+"<!&*>")
        //console.log(BlockManager.getBlockFromId(item).GetBlockLevel())
        //console.log(BlockManager.getBlockFromId(item).GenerateLevel())
        GeneratedCod = GeneratedCod.replace("<!&*>"+key1+"<!&*>", BlockManager.getBlockFromId(item).GenerateLevel()+BlockManager.getBlockFromId(item).GetPythonCode()+"\n"+"<!&*>"+key1+"<!&*>")
        delete NewBlocks[item]
      })
      //GeneratedCod+=value.GetPythonCode()
    }
    //console.log(NewBlocks)
    while ( Object.keys(NewBlocks).length>0){
    for (const [key1, value] of Object.entries(NewBlocks)) {
      //console.log(key1)
      
      if (GeneratedCod.includes(value.GetConnectFrom())){
      GeneratedCod = GeneratedCod.replace("<!&*>"+value.GetConnectFrom()+"<!&*>", BlockManager.getBlockFromId(key1).GenerateLevel()+BlockManager.getBlockFromId(key1).GetPythonCode()+"\n"+"<!&*>"+value.GetConnectFrom()+"<!&*>")
      delete NewBlocks[key1]
      }
    }
  }
  for (const [key1, value] of Object.entries(this.Blocks)) {
    GeneratedCod = GeneratedCod.replace("<!&*>"+key1+"<!&*>","")
  }
  for (const [key1, value] of Object.entries(this.ParentBlocks)) {
    GeneratedCod = GeneratedCod.replace("<!&*>"+key1+"<!&*>","")
  }
  editor.setValue(GeneratedCod);
  }

}





class Block{
    BlockLevel = 0
    BlocksConnectedTo = []
    StringId;
    DotId = ""
    ConnectFrom = ""
    GetBlockLevel(){
      return this.BlockLevel
    }
    GenerateLevel(){
      let Level = ""
      for (let step = 0; step <= this.BlockLevel; step++) {
        Level+="  "
      }
      return Level
    }
    SetBlockLevel(Level){
      this.BlockLevel=Level
    }
    GetDotId(){
      return this.DotId
    }
    SetDotId(dotId){
      this.DotId = dotId 
    }
    GetBlocksConnectedTo(){
      return this.BlocksConnectedTo
    }
    ReOrderBlocksConnectedTo(){
      var ListOfAlreadyInNewBlockToReturn = []
  
      while(this.BlocksConnectedTo.length!=ListOfAlreadyInNewBlockToReturn.length){
        var last =999999
        var lastKey = ""
        var lastValue = ""
        this.BlocksConnectedTo.forEach(function (item, index) {
        if (ListOfAlreadyInNewBlockToReturn.includes(item) == false){
          if (last>getOffset(document.querySelector("#"+BlockManager.getBlockFromId(item).getBlockId())).top){
            last = getOffset(document.querySelector("#"+BlockManager.getBlockFromId(item).getBlockId())).top
            lastKey = item
          }
        }
      })
      ListOfAlreadyInNewBlockToReturn.push(lastKey)
      }
      this.BlocksConnectedTo = ListOfAlreadyInNewBlockToReturn;
      return true
  
    }
    CanDeleteDot(){
      if (this.BlocksConnectedTo.length==0){
        return true
      }
      return false
    }
    Connect2Block(id){
      this.BlocksConnectedTo.push(id);
    }
    GetConnectFrom(){
      return this.ConnectFrom
    }
    SetConnectFrom(Id){
      this.ConnectFrom = Id
    }
    DisconnectFromThisBlock(id){
      this.BlocksConnectedTo.splice(this.BlocksConnectedTo.indexOf(id), 1);
    }
    OnDelete(){
      //console.log(this.StringId)
  
    }
    getBlockId(){
      return this.StringId
    }

    constructor(Id){
      this.StringId=Id;
      this.OnDelete()
    
    }
  
  }
  class IfStatementBlock extends Block{
    constructHtml(RandomStringId){
      //console.log(RandomStringId)
      var tag = document.createElement(RandomStringId);
      tag.id = RandomStringId
      tag.style.position = 'absolute';
      tag.style.width = "200px";
      document.getElementById('body').appendChild(tag);
      tag.innerHTML =`<div id="`+RandomStringId+"3"+`">
      <div id="`+(RandomStringId+"dell")+`"style="position:relative;left:86%;top:29px;z-index:100;cursor: pointer;  transition: 0.70s;
      -webkit-transition: 0.70s;
      -moz-transition: 0.70s;
      -ms-transition: 0.70s;
      -o-transition: 0.70s;
      width:30px;
      height:30px">
      
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
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
      <td><a style="position: relative;width:200px;height:78px;font-family:Oracle Sans Condensed;"class="list-group-item list-group-item-action py-2 ripple active text" >IF STATEMENT
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
        style="style:absolute;top:13px;font-family: 'RX100';font-size:18px;bold:100;width:175px;height:30px;overflow:hidden !important;overflow-y: hidden !important;white-space: nowrap;"
        
        >
if var(==)var2:
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
             $( "#"+RandomStringId).draggable();



      
      var tag = document.createElement(RandomStringId+"EDITMENU");
      tag.id = RandomStringId+"EDITMENU"
      tag.style.position = 'absolute';
      tag.style.width = "200px";
      document.getElementById('body').appendChild(tag);
      tag.innerHTML =`
      <div class="list-group-item list-group-item-action py-2 ripple active text" 
      style="
      top: 50%;
      left: 44%;
      width: 50em;
      height: 23em;
      margin-top: -9em;
      margin-left: -15em;
      border: 1px solid #666;
      background-color:#e5e5e5;
      position: fixed;
      display:block;
      text-align: center;
      /* From https://css.glass */
background: rgba(255, 255, 255, 0.67);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(7.9px);
-webkit-backdrop-filter: blur(7.9px);
border: 1px solid rgba(255, 255, 255, 0.83);
      
      ">
      
      <div id="`+(RandomStringId+"EDITOR"+"dell")+`"style="position:relative;left:86%;top:29px;z-index:100;cursor: pointer;  transition: 0.70s;
      -webkit-transition: 0.70s;
      -moz-transition: 0.70s;
      -ms-transition: 0.70s;
      -o-transition: 0.70s;
      width:30px;
      height:30px
      position:absolute;
      top:0%;
      left:95%;
      "
      onclick="
      
      document.getElementById('`+RandomStringId+"EDITMENU"+`').style.display = 'none';



      "
      >
     
      
      
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
      </div>

      <div style="
      position:absolute;
      color:black;
      font-family:Oracle Sans Condensed;
      left:10px;
      top:5px;
      text-align: center;
      
      ">
      IF STATEMENT
      </div>

      <div class="mb-6" style="outline:none;">
      <label for="large-input" class="block mb-2 text-m font-medium text-gray-900 " >What is the first thing you want to compare? Choose a word, number, or variable.</label>
      <input  placeholder="Type here your variable." id="`+(RandomStringId+"var1")+`" type="text" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  </div>

   


  <label  class="block mb-2 text-m font-medium text-gray-900 ">How do you want to compare the two things? Choose an option: equal to (==), not equal to (!=), greater than (>), less than (<), greater than or equal to (>=), or less than or equal to (<=).</label>
  <select id="`+(RandomStringId+"operator")+`" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="==">==</option>
  <option value="<"><</option>
  <option value=">">></option>
  <option value="!=">!=</option>
  <option value="&&=">&&</option>
  </select>


  <div class="mb-6" style="outline:none;">
  <label for="large-input" class="block mb-2 text-m font-medium text-gray-900 " >What is the second thing you want to compare? Choose a word, number, or variable.</label>
  <input placeholder="Type here your variable." id="`+(RandomStringId+"var2")+`" type="text" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
</div>



<a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Read more</a>

  </div>

  <style>
  #`+(RandomStringId+"EDITOR"+"dell")+`:hover{
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

  


      `
      tag.style.display="none"
      //tag.style.display = 'none';
      setTimeout(() => {
        $("#"+RandomStringId+"operator").on( "change", function() {
          document.getElementById(RandomStringId+"CodeString").innerHTML= "if "+$("#"+RandomStringId+"var1").val()+$("#"+RandomStringId+"operator").val()+$("#"+RandomStringId+"var2").val()
  
          var div = document.getElementById(RandomStringId+"CodeString");
          var textLength = div.innerHTML.length;
          var divWidth = div.offsetWidth;
          var fontSize = Math.floor(divWidth / textLength);
          if (fontSize < 18) {
            fontSize = 18;
          }
          if (fontSize > 22) {
            fontSize = 22;
          }
          div.sty
          div.style.fontSize = fontSize + "px";
        } );
        $("#"+RandomStringId+"var1").on( "change", function() {
          document.getElementById(RandomStringId+"CodeString").innerHTML= "if "+$("#"+RandomStringId+"var1").val()+$("#"+RandomStringId+"operator").val()+$("#"+RandomStringId+"var2").val()
          var div = document.getElementById(RandomStringId+"CodeString");
          var textLength = div.innerHTML.length;
          var divWidth = div.offsetWidth;
          var fontSize = Math.floor(divWidth / textLength);
          if (fontSize < 18) {
            fontSize = 18;
          }
          if (fontSize > 22) {
            fontSize = 22;
          }
          div.sty
          div.style.fontSize = fontSize + "px";
  
        } );
         $("#"+RandomStringId+"var2").on( "change", function() {
          document.getElementById(RandomStringId+"CodeString").innerHTML= "if "+$("#"+RandomStringId+"var1").val()+$("#"+RandomStringId+"operator").val()+$("#"+RandomStringId+"var2").val()
          var div = document.getElementById(RandomStringId+"CodeString");
          var textLength = div.innerHTML.length;
          var divWidth = div.offsetWidth;
          var fontSize = Math.floor(divWidth / textLength);
          if (fontSize < 18) {
            fontSize = 18;
          }
          if (fontSize > 22) {
            fontSize = 22;
          }
          div.sty
          div.style.fontSize = fontSize + "px";
  
        } );
    }, "1000");

    }

    GetPythonCode(){
      return "if "+$("#"+this.RandomStringId+"var1").val()+$("#"+this.RandomStringId+"operator").val()+$("#"+this.RandomStringId+"var2").val()+":\n<!&*>"+this.StringId+"<!&*>"
      
    }

    change(){
      console.log("asd")
      //s$("#"+this.RandomStringId+"CodeString").value() = GetPythonCode()
      document.getElementById(this.RandomStringId+"CodeString").value= this.GetPythonCode()
    }
    
    CanConnectFrom(){
      return true
    }
  
    constructor(randomString){
      super(randomString);
      //console.log(randomString)
      this.RandomStringId =randomString;
      this.constructHtml(this.RandomStringId);
      $( "#"+this.RandomStringId).draggable();
  
    }
  }
  








  class VariableBlock extends Block{
    constructHtml(RandomStringId){
      //console.log(RandomStringId)
      var tag = document.createElement(RandomStringId);
      tag.id = RandomStringId
      tag.style.position = 'absolute';
      tag.style.width = "200px";
      document.getElementById('body').appendChild(tag);
      tag.innerHTML =`<div id="`+RandomStringId+"3"+`">
      <div id="`+(RandomStringId+"dell")+`"style="position:relative;left:86%;top:29px;z-index:100;cursor: pointer;  transition: 0.70s;
      -webkit-transition: 0.70s;
      -moz-transition: 0.70s;
      -ms-transition: 0.70s;
      -o-transition: 0.70s;
      width:30px;
      height:30px">
      
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
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
      <td><a style="position: relative;width:200px;height:78px;font-family:Oracle Sans Condensed;"class="list-group-item list-group-item-action py-2 ripple active text" >
Variable
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
        style="style:absolute;top:13px;white-space: nowrap;font-family: 'RX100';font-size:18px;bold:100;width:175px;hiddenbar-width: thin;height:30px;overflow:hidden !important;overflow-y: hidden !important;"
        
        >
Var Name = Content
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
             $( "#"+RandomStringId).draggable();



      
      var tag = document.createElement(RandomStringId+"EDITMENU");
      tag.id = RandomStringId+"EDITMENU"
      tag.style.position = 'absolute';
      tag.style.width = "200px";
      document.getElementById('body').appendChild(tag);
      tag.innerHTML =`
      <div class="list-group-item list-group-item-action py-2 ripple active text" 
      style="
      top: 50%;
      left: 44%;
      width: 50em;
      height: 23em;
      margin-top: -9em;
      margin-left: -15em;
      border: 1px solid #666;
      background-color:#e5e5e5;
      position: fixed;
      display:block;
      text-align: center;
      /* From https://css.glass */
background: rgba(255, 255, 255, 0.67);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(7.9px);
-webkit-backdrop-filter: blur(7.9px);
border: 1px solid rgba(255, 255, 255, 0.83);
      
      ">
      
      <div id="`+(RandomStringId+"EDITOR"+"dell")+`"style="position:relative;left:86%;top:29px;z-index:100;cursor: pointer;  transition: 0.70s;
      -webkit-transition: 0.70s;
      -moz-transition: 0.70s;
      -ms-transition: 0.70s;
      -o-transition: 0.70s;
      width:30px;
      height:30px
      position:absolute;
      top:0%;
      left:95%;
      "
      onclick="
      
      document.getElementById('`+RandomStringId+"EDITMENU"+`').style.display = 'none';



      "
      >
     
      
      
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
      </div>

      <div style="
      position:absolute;
      color:black;
      font-family:Oracle Sans Condensed;
      left:10px;
      top:5px;
      text-align: center;
      
      ">
      Variable
      </div>

      <div class="mb-6" style="outline:none;">
      <label for="large-input" class="block mb-2 text-m font-medium text-gray-900 " >
      What do you want to call the container that will hold your information?</label>
      <input  placeholder="Type here your variable." id="`+(RandomStringId+"var1")+`" type="text" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  </div>

   



  <div class="mb-6" style="outline:none;">
  <label for="large-input" class="block mb-2 text-m font-medium text-gray-900 " >
  What information do you want to put inside the container?</label>
  <input placeholder="Type here your variable." id="`+(RandomStringId+"var2")+`" type="text" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
</div>




<a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Read more</a>

  </div>

  <style>
  #`+(RandomStringId+"EDITOR"+"dell")+`:hover{
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

  


      `
      tag.style.display="none"
      //tag.style.display = 'none';
      setTimeout(() => {
        $("#"+RandomStringId+"var1").on( "change", function() {
          document.getElementById(RandomStringId+"CodeString").innerHTML= $("#"+RandomStringId+"var1").val()+"="+$("#"+RandomStringId+"var2").val()
          var div = document.getElementById(RandomStringId+"CodeString");
          var textLength = div.innerHTML.length;
          var divWidth = div.offsetWidth;
          var fontSize = Math.floor(divWidth / textLength);
          if (fontSize < 18) {
            fontSize = 18;
          }
          if (fontSize > 22) {
            fontSize = 22;
          }
          div.sty
          div.style.fontSize = fontSize + "px";
  
  
        } );
         $("#"+RandomStringId+"var2").on( "change", function() {
          document.getElementById(RandomStringId+"CodeString").innerHTML= $("#"+RandomStringId+"var1").val()+"="+$("#"+RandomStringId+"var2").val()
          var div = document.getElementById(RandomStringId+"CodeString");
          var textLength = div.innerHTML.length;
          var divWidth = div.offsetWidth;
          var fontSize = Math.floor(divWidth / textLength);
          if (fontSize < 18) {
            fontSize = 18;
          }
          if (fontSize > 22) {
            fontSize = 22;
          }
          div.sty
          div.style.fontSize = fontSize + "px";
  
  
        } );
    }, "1000");

    }

    GetPythonCode(){
      return $("#"+this.RandomStringId+"var1").val()+"="+$("#"+this.RandomStringId+"var2").val()+":\n<!&*>"+this.StringId+"<!&*>"
      
    }

    change(){
      console.log("asd")
      //s$("#"+this.RandomStringId+"CodeString").value() = GetPythonCode()
      document.getElementById(this.RandomStringId+"CodeString").value= this.GetPythonCode()
    }
    
    CanConnectFrom(){
      return false
    }
  
    constructor(randomString){
      super(randomString);
      //console.log(randomString)
      this.RandomStringId =randomString;
      this.constructHtml(this.RandomStringId);
      $( "#"+this.RandomStringId).draggable();
  
    }
  }















































  class InputBlock extends Block{
    constructHtml(RandomStringId){
      //console.log(RandomStringId)
      var tag = document.createElement(RandomStringId);
      tag.id = RandomStringId
      tag.style.position = 'absolute';
      tag.style.width = "200px";
      document.getElementById('body').appendChild(tag);
      tag.innerHTML =`<div id="`+RandomStringId+"3"+`">
      <div id="`+(RandomStringId+"dell")+`"style="position:relative;left:86%;top:29px;z-index:100;cursor: pointer;  transition: 0.70s;
      -webkit-transition: 0.70s;
      -moz-transition: 0.70s;
      -ms-transition: 0.70s;
      -o-transition: 0.70s;
      width:30px;
      height:30px">
      
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
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
      <td><a style="position: relative;width:200px;height:78px;font-family:Oracle Sans Condensed;"class="list-group-item list-group-item-action py-2 ripple active text" >
Input
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
        style="style:absolute;top:13px;white-space: nowrap;font-family: 'RX100';font-size:18px;bold:100;width:175px;hiddenbar-width: thin;height:30px;overflow:hidden !important;overflow-y: hidden !important;"
        
        >
Var Name = input()
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
             $( "#"+RandomStringId).draggable();



      
      var tag = document.createElement(RandomStringId+"EDITMENU");
      tag.id = RandomStringId+"EDITMENU"
      tag.style.position = 'absolute';
      tag.style.width = "200px";
      document.getElementById('body').appendChild(tag);
      tag.innerHTML =`
      <div class="list-group-item list-group-item-action py-2 ripple active text" 
      style="
      z-index:102;
      top: 50%;
      left: 44%;
      width: 50em;
      height: 23em;
      margin-top: -9em;
      margin-left: -15em;
      border: 1px solid #666;
      background-color:#e5e5e5;
      position: fixed;
      display:block;
      text-align: center;
      /* From https://css.glass */
background: rgba(255, 255, 255, 0.67);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(7.9px);
-webkit-backdrop-filter: blur(7.9px);
border: 1px solid rgba(255, 255, 255, 0.83);
      
      ">
      
      <div id="`+(RandomStringId+"EDITOR"+"dell")+`"style="position:relative;left:86%;top:29px;z-index:100;cursor: pointer;  transition: 0.70s;
      -webkit-transition: 0.70s;
      -moz-transition: 0.70s;
      -ms-transition: 0.70s;
      -o-transition: 0.70s;
      width:30px;
      height:30px
      position:absolute;
      top:0%;
      left:95%;
      "
      onclick="
      
      document.getElementById('`+RandomStringId+"EDITMENU"+`').style.display = 'none';



      "
      >
     
      
      
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
      </div>

      <div style="
      position:absolute;
      color:black;
      font-family:Oracle Sans Condensed;
      left:10px;
      top:5px;
      text-align: center;
      
      ">
      Input
      </div>

      <div class="mb-6" style="outline:none;">
      <label for="large-input" class="block mb-2 text-m font-medium text-gray-900 " >
      What do you want to call the container that will hold your information?</label>
      <input  placeholder="Type here your variable." id="`+(RandomStringId+"var1")+`" type="text" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  </div>

   



  <div class="mb-6" style="outline:none;">
  <label for="large-input" class="block mb-2 text-m font-medium text-gray-900 " >
  What is the question do you want to ask the user on input?</label>
  <div class="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600" 
  style="width:100%;"
  >
  <label for="large-input" class="block mb-2 text-m font-medium text-gray-400" >
  Is your input a number?</label>
          <select id="`+(RandomStringId+"isnumber")+`" 
          style="
          position:relative;
          right:5px;
          outline:none;
          background-color:inherit;
          "
          
          >
          <option value="no">No</option>
          <option value="yes">Yes</option>
          </select>

  <input style="outline:none;" placeholder="Type here your variable." id="`+(RandomStringId+"var2")+`" type="text" class="block w-full p-4 text-gray-900
 bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  </div>
  </div>




<a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Read more</a>

  </div>

  <style>
  #`+(RandomStringId+"EDITOR"+"dell")+`:hover{
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

  


      `
      tag.style.display="none"
      //tag.style.display = 'none';
      setTimeout(() => {
        $("#"+RandomStringId+"var1").on( "change", function() {
          document.getElementById(RandomStringId+"CodeString").innerHTML= $("#"+RandomStringId+"var1").val()+"="+$("#"+RandomStringId+"var2").val()
          var div = document.getElementById(RandomStringId+"CodeString");
          var textLength = div.innerHTML.length;
          var divWidth = div.offsetWidth;
          var fontSize = Math.floor(divWidth / textLength);
          if (fontSize < 18) {
            fontSize = 18;
          }
          if (fontSize > 22) {
            fontSize = 22;
          }
          div.sty
          div.style.fontSize = fontSize + "px";
  
  
        } );
         $("#"+RandomStringId+"var2").on( "change", function() {
          document.getElementById(RandomStringId+"CodeString").innerHTML= $("#"+RandomStringId+"var1").val()+"="+$("#"+RandomStringId+"var2").val()
          var div = document.getElementById(RandomStringId+"CodeString");
          var textLength = div.innerHTML.length;
          var divWidth = div.offsetWidth;
          var fontSize = Math.floor(divWidth / textLength);
          if (fontSize < 18) {
            fontSize = 18;
          }
          if (fontSize > 22) {
            fontSize = 22;
          }
          div.sty
          div.style.fontSize = fontSize + "px";
  
  
        } );
    }, "1000");

    }

    GetPythonCode(){
      if ($("#"+this.RandomStringId+"isnumber").val()=="yes"){
      return $("#"+this.RandomStringId+"var1").val()+"= int(input('"+$("#"+this.RandomStringId+"var2").val()+"'))\n<!&*>"+this.StringId+"<!&*>"
      }else{
        return $("#"+this.RandomStringId+"var1").val()+"= input('"+$("#"+this.RandomStringId+"var2").val()+"')\n<!&*>"+this.StringId+"<!&*>"
      }
      
    }

    change(){
      console.log("asd")
      //s$("#"+this.RandomStringId+"CodeString").value() = GetPythonCode()
      document.getElementById(this.RandomStringId+"CodeString").value= this.GetPythonCode()
    }
    
    CanConnectFrom(){
      return false
    }
  
    constructor(randomString){
      super(randomString);
      //console.log(randomString)
      this.RandomStringId =randomString;
      this.constructHtml(this.RandomStringId);
      $( "#"+this.RandomStringId).draggable();
  
    }
  }













  






























  class PrintBlock extends Block{
    constructHtml(RandomStringId){
      //console.log(RandomStringId)
      var tag = document.createElement(RandomStringId);
      tag.id = RandomStringId
      tag.style.position = 'absolute';
      tag.style.width = "200px";
      document.getElementById('body').appendChild(tag);
      tag.innerHTML =`<div id="`+RandomStringId+"3"+`">
      <div id="`+(RandomStringId+"dell")+`"style="position:relative;left:86%;top:29px;z-index:100;cursor: pointer;  transition: 0.70s;
      -webkit-transition: 0.70s;
      -moz-transition: 0.70s;
      -ms-transition: 0.70s;
      -o-transition: 0.70s;
      width:30px;
      height:30px">
      
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
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
      <td><a style="position: relative;width:200px;height:78px;font-family:Oracle Sans Condensed;"class="list-group-item list-group-item-action py-2 ripple active text" >
Print
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
        style="style:absolute;top:13px;white-space: nowrap;font-family: 'RX100';font-size:18px;bold:100;width:175px;hiddenbar-width: thin;height:30px;overflow:hidden !important;overflow-y: hidden !important;"
        
        >
print(content)
</div>
        </a></td>

  
        <button 
        onclick="
        
        document.getElementById('`+RandomStringId+"EDITMENU"+`').style.display = 'block';


        "
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex ifintems-center" style="width:200px;text-align: center;outline: none; ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>

        <span >Edit</span>
      </button>



    
    </div>



             `
             $( "#"+RandomStringId).draggable();



      
      var tag = document.createElement(RandomStringId+"EDITMENU");
      tag.id = RandomStringId+"EDITMENU"
      tag.style.position = 'absolute';
      tag.style.width = "200px";
      document.getElementById('body').appendChild(tag);
      tag.innerHTML =`
      <div class="list-group-item list-group-item-action py-2 ripple active text" 
      style="
      z-index:102;
      top: 50%;
      left: 44%;
      width: 50em;
      height: 23em;
      margin-top: -9em;
      margin-left: -15em;
      border: 1px solid #666;
      background-color:#e5e5e5;
      position: fixed;
      display:block;
      text-align: center;
      /* From https://css.glass */
background: rgba(255, 255, 255, 0.67);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(7.9px);
-webkit-backdrop-filter: blur(7.9px);
border: 1px solid rgba(255, 255, 255, 0.83);
      
      ">
      
      <div id="`+(RandomStringId+"EDITOR"+"dell")+`"style="position:relative;left:86%;top:29px;z-index:100;cursor: pointer;  transition: 0.70s;
      -webkit-transition: 0.70s;
      -moz-transition: 0.70s;
      -ms-transition: 0.70s;
      -o-transition: 0.70s;
      width:30px;
      height:30px
      position:absolute;
      top:0%;
      left:95%;
      "
      onclick="
      
      document.getElementById('`+RandomStringId+"EDITMENU"+`').style.display = 'none';



      "
      >
     
      
      
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
      </div>

      <div style="
      position:absolute;
      color:black;
      font-family:Oracle Sans Condensed;
      left:10px;
      top:5px;
      text-align: center;
      
      ">
      Print
      </div>

      <div class="mb-6" style="outline:none;">
      <label for="large-input" class="block mb-2 text-m font-medium text-gray-900 " >
      Write what you want to print out.</label>
      <input  placeholder="Type here your variable." id="`+(RandomStringId+"var1")+`" type="text" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  </div>

   






  </div>

  <style>
  #`+(RandomStringId+"EDITOR"+"dell")+`:hover{
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

  


      `
      tag.style.display="none"
      //tag.style.display = 'none';
      setTimeout(() => {

         $("#"+RandomStringId+"var1").on( "change", function() {
          document.getElementById(RandomStringId+"CodeString").innerHTML= "print("+$("#"+RandomStringId+"var1").val()+")"
          var div = document.getElementById(RandomStringId+"CodeString");
          var textLength = div.innerHTML.length;
          var divWidth = div.offsetWidth;
          var fontSize = Math.floor(divWidth / textLength);
          if (fontSize < 18) {
            fontSize = 18;
          }
          if (fontSize > 22) {
            fontSize = 22;
          }
          div.sty
          div.style.fontSize = fontSize + "px";
        } );
    }, "1000");

    }

    GetPythonCode(){
      return "print('"+$("#"+this.RandomStringId+"var1").val()+"')\n<!&*>"+this.StringId+"<!&*>"
      
    }

    change(){
      console.log("asd")
      //s$("#"+this.RandomStringId+"CodeString").value() = GetPythonCode()
      document.getElementById(this.RandomStringId+"CodeString").value= this.GetPythonCode()
    }
    
    CanConnectFrom(){
      return false
    }
  
    constructor(randomString){
      super(randomString);
      //console.log(randomString)
      this.RandomStringId =randomString;
      this.constructHtml(this.RandomStringId);
      $( "#"+this.RandomStringId).draggable();
  
    }
  }















  

  
  window.addEventListener("DOMContentLoaded", (event) => {
    AiHelper = new aiHelper()
    BlockManager = new BlocksManager();
    //test = new IfStatementBlock(MakeRandomString(70));
   // BlockManager.addBlockAsParent(test)
    
    Sidebar = new SideBar()
    Sidebar.addBlockOption("IF STATEMENT")
    Sidebar.addBlockOption("Variable");
    Sidebar.addBlockOption("InputBlock")
    Sidebar.addBlockOption("Print")

    Sidebar.createSidebar()

    $('#body').on('click', function() {
      jsPlumb.repaintEverything();BlockManager.CreateCode();
      
  });
  $("#body")
    .mousedown(function() {
      jsPlumb.repaintEverything();BlockManager.CreateCode();
    })

    $(function() {
      var available = true;
      function resetavailable(){
        available=true
      }
      $("#body")
      .mousemove(function() {
          isDragging = true;
     
          if (available){
          jsPlumb.repaintEverything();BlockManager.CreateCode();
          available=false
          setTimeout(resetavailable, 3);
          }
       })
 
  
 
  });

    //addEventListener('mousemove', (event) => {jsPlumb.repaintEverything();BlockManager.CreateCode();});
});

