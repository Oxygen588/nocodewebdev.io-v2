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
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}


class BlocksManager{
  ParentBlocks = {}
  Blocks = {}

  CurrentClick = ""
  constructor(){

  }

  GenerateAiHelp(id){

    document.getElementById(id+"-ai-generated-help-button").onclick = function() { BlockManager.ReGenerateAiHelp(id) }
    //BlockManager.getBlockFromId(id)
    //BlockManager.getBlockFromId(id)
    console.log(id+"-ai-generated-help-button")
    document.getElementById(id+"-ai-generated-help-button").innerHTML = "We are generating your Explenation. "
        AiHelper.generateAiResponse(BlockManager.getBlockFromId(id).GetPythonCode().split("<!&*>")[0],true,async function(cntr) {
            document.getElementById(id+"-ai-generated-help").innerHTML =  "<br>"+await cntr;
            document.getElementById(id+"-ai-generated-help-button").innerHTML = "Re-generate Explenation. "
        });
  }
  ReGenerateAiHelp(id){


    //BlockManager.getBlockFromId(id)
    console.log(id+"-ai-generated-help-button")
    document.getElementById(id+"-ai-generated-help-button").innerHTML = "We are generatin your Explenation. "
        AiHelper.generateAiResponseNew(BlockManager.getBlockFromId(id).GetPythonCode().split("<!&*>")[0],true,async function(cntr) {
            document.getElementById(id+"-ai-generated-help").innerHTML =  "<br>"+await cntr;
            document.getElementById(id+"-ai-generated-help-button").innerHTML = "Re-generate Explenation. "
        });
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

  getAllVariables(){
    let variables = []
    for (const [key, value] of Object.entries(this.ParentBlocks)) {
      let value =  this.ParentBlocks[key]
      if (value.isVar()) {
        variables.push(value.getVarDetails())
      }
    }
    for (const [key, value] of Object.entries(this.Blocks)) {
      if (value.isVar()){
        variables.push(value.getVarDetails())
      }
    }
    return variables
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
  isVar(){
    return false
  }
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
  class IfstatementBlock extends Block{
    constructHtml(RandomStringId){
      //console.log(RandomStringId)
      var tag = document.createElement(RandomStringId);
      tag.id = RandomStringId
      tag.style.position = 'absolute';
      tag.style.width = "200px";
      document.getElementById('body').appendChild(tag);
      tag.innerHTML =createDisplayDiv(RandomStringId,"if var1==var2:","IF STATEMENT")
             $( "#"+RandomStringId).draggable();



      
      var tag = document.createElement(RandomStringId+"EDITMENU");
      tag.id = RandomStringId+"EDITMENU"
      tag.style.position = 'absolute';
      tag.style.width = "200px";
      document.getElementById('body').appendChild(tag);
      tag.innerHTML =`
      <div class="list-group-item list-group-item-action py-2 ripple active text" 
      style="
      top: 20%;
      left: 44%;
      width: 50em;
      height: auto;
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
                  ${createVariableinput(RandomStringId,"var1")}
          
                  <div>
            
                </div>
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
  ${createVariableinput(RandomStringId,"var2")}</div>


 
<div class="font-medium text-gray-600 dark:text-blue-500 hover:underline" id="`+RandomStringId+`-ai-generated-help"></div>
<button id="`+(RandomStringId+"-ai-generated-help-button")+`" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onclick="BlockManager.GenerateAiHelp('`+RandomStringId+`')">I need explenation!</button>


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


    
    setUpUpdates(){
      let RandomStringId = this.RandomStringId
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
    isVar(){
      return true
    }
    constructHtml(RandomStringId){
      //console.log(RandomStringId)
      var tag = document.createElement(RandomStringId);
      tag.id = RandomStringId
      tag.style.position = 'absolute';
      tag.style.width = "200px";
      document.getElementById('body').appendChild(tag);
      tag.innerHTML =createDisplayDiv(RandomStringId,"varName = var","VARIALBE")
             $( "#"+RandomStringId).draggable();



      
      var tag = document.createElement(RandomStringId+"EDITMENU");
      tag.id = RandomStringId+"EDITMENU"
      tag.style.position = 'absolute';
      tag.style.width = "200px";
      document.getElementById('body').appendChild(tag);
      tag.innerHTML =`
      <div class="list-group-item list-group-item-action py-2 ripple active text" 
      style="
      top: 20%;
      left: 44%;
      width: 50em;
      height: auto;
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
      ${createVariableinput(RandomStringId,"var1")}</div>

   



  <div class="mb-6" style="outline:none;">
  <label for="large-input" class="block mb-2 text-m font-medium text-gray-900 " >
  What information do you want to put inside the container?</label>
  ${createVariableinput(RandomStringId,"var2")}</div>




<div class="font-medium text-gray-600 dark:text-blue-500 hover:underline" id="`+RandomStringId+`-ai-generated-help"></div>
<button id="`+(RandomStringId+"-ai-generated-help-button")+`" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onclick="BlockManager.GenerateAiHelp('`+RandomStringId+`')">I need explenation!</button>

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




    setUpUpdates(){
      let RandomStringId = this.RandomStringId
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
    }

    GetPythonCode(){
      return $("#"+this.RandomStringId+"var1").val()+"="+$("#"+this.RandomStringId+"var2").val()+":\n<!&*>"+this.StringId+"<!&*>"
      
    }
    getVarDetails(){
      return [$("#"+this.RandomStringId+"var1").val(),$("#"+this.RandomStringId+"var2").val()]
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
    isVar(){
      return true
    }
    getVarDetails(){
      return [$("#"+this.RandomStringId+"var1").val(),$("#"+this.RandomStringId+"var2").val()]
    }
    constructHtml(RandomStringId){
      //console.log(RandomStringId)
      var tag = document.createElement(RandomStringId);
      tag.id = RandomStringId
      tag.style.position = 'absolute';
      tag.style.width = "200px";
      document.getElementById('body').appendChild(tag);
      tag.innerHTML =createDisplayDiv(RandomStringId,"var = input('question')","INPUT")
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
      top: 20%;
      left: 44%;
      width: 50em;
      height: auto;
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
      ${createVariableinput(RandomStringId,"var1")} </div>

   



  <div class="mb-6" style="outline:none;">

  <div class="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600" 
  style="width:100%;"
  >
  
  <label for="large-input" class="block mb-2 text-m font-medium text-gray-400"style="height:15px;" >
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

           </div>
  </div>
  <label for="large-input" class="block mb-2 text-m font-medium text-gray-900 " >
  What is the question do you want to ask the user on input?</label>
  ${createVariableinput(RandomStringId,"var2")}




<div class="font-medium text-gray-600 dark:text-blue-500 hover:underline" id="`+RandomStringId+`-ai-generated-help"></div>
<button style="margin-top:20px;" id="`+(RandomStringId+"-ai-generated-help-button")+`" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onclick="BlockManager.GenerateAiHelp('`+RandomStringId+`')">I need explenation!</button>

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
          document.getElementById(RandomStringId+"CodeString").innerHTML=$("#"+RandomStringId+"var2").val()
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
          document.getElementById(RandomStringId+"CodeString").innerHTML=$("#"+RandomStringId+"var2").val()
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

    setUpUpdates(){
      let RandomStringId = this.RandomStringId
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


      } );        $("#"+RandomStringId+"var1").on( "change", function() {
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
    }

    GetPythonCode(){
      if ($("#"+this.RandomStringId+"isnumber").val()){
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
      tag.innerHTML = createDisplayDiv(RandomStringId,"print()","PRINT")
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
      top: 20%;
      left: 44%;
      width: 50em;
      height: auto;
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
      ${createVariableinput(RandomStringId,"var1")}</div>

   

  <div class="font-medium text-gray-600 dark:text-blue-500 hover:underline" id="`+RandomStringId+`-ai-generated-help"></div>
  <button id="`+(RandomStringId+"-ai-generated-help-button")+`" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onclick="BlockManager.GenerateAiHelp('`+RandomStringId+`')">I need explenation!</button>
  




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
    setUpUpdates(){
      let RandomStringId = this.RandomStringId
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





  










  class LoopBlock extends Block{
    constructHtml(RandomStringId){
      //console.log(RandomStringId)
      var tag = document.createElement(RandomStringId);
      tag.id = RandomStringId
      tag.style.position = 'absolute';
      tag.style.width = "200px";
      document.getElementById('body').appendChild(tag);
      tag.innerHTML =createDisplayDiv(RandomStringId,"while condition:","LOOP")
             $( "#"+RandomStringId).draggable();



      
      var tag = document.createElement(RandomStringId+"EDITMENU");
      tag.id = RandomStringId+"EDITMENU"
      tag.style.position = 'absolute';
      tag.style.width = "200px";
      document.getElementById('body').appendChild(tag);
      tag.innerHTML =`
      <div class="list-group-item list-group-item-action py-2 ripple active text" 
      style="
      top: 20%;
      left: 44%;
      width: 50em;
      height: auto;
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
      Loop
      </div>

  

      <label  class="block mb-2 text-m font-medium text-gray-900 ">Type of loop.</label>
      <select id="`+(RandomStringId+"operatorType")+`" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option value="">Chouse type.</option>
      <option value="Conditional">Conditional</option>
      <option value="Vbased">Variable Based</option>
      <option value="Ah">Allways happening</option>
      </select>

      

      <div id="`+(RandomStringId+"Editor-operatorVB")+`" style="display:none;">
      <div class="mb-6" style="outline:none;">
      <label for="large-input" class="block mb-2 text-m font-medium text-gray-900 " >What is the first thing you want to compare? Choose a word, number, or variable.</label>
      ${createVariableinput(RandomStringId,"varVB")} </div>
      
      </div>

<div id="`+(RandomStringId+"Editor-operator")+`" style="display:none;">


<div class="mb-6" style="outline:none;">
<label for="large-input" class="block mb-2 text-m font-medium text-gray-900 " >What is the first thing you want to compare? Choose a word, number, or variable.</label>
${createVariableinput(RandomStringId,"var1")}</div>


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
  ${createVariableinput(RandomStringId,"var2")}
  </div>

  </div>
<div class="font-medium text-gray-600 dark:text-blue-500 hover:underline" id="`+RandomStringId+`-ai-generated-help"></div>
<button id="`+(RandomStringId+"-ai-generated-help-button")+`" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onclick="BlockManager.GenerateAiHelp('`+RandomStringId+`')">I need explenation!</button>


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
        $("#"+RandomStringId+"operatorType").on( "change", function() {
          let oPtype = $("#"+RandomStringId+"operatorType").val()
          switch (oPtype){
            case "Conditional":
              document.getElementById(RandomStringId+"Editor-operator").style.display = 'Block';
              document.getElementById(RandomStringId+"Editor-operatorVB").style.display = 'none';
              document.getElementById(RandomStringId+"CodeString").innerHTML= "while "+$("#"+RandomStringId+"var1").val()+$("#"+RandomStringId+"operator").val()+$("#"+RandomStringId+"var2").val()+":"
  
              break
            case "Vbased":
              document.getElementById(RandomStringId+"Editor-operator").style.display = 'none';
              document.getElementById(RandomStringId+"Editor-operatorVB").style.display = 'Block';
              document.getElementById(RandomStringId+"CodeString").innerHTML= "while "+$("#"+RandomStringId+"varVB").val()+":"
  
              break
            case "Ah":
              document.getElementById(RandomStringId+"Editor-operator").style.display = 'none';
              document.getElementById(RandomStringId+"Editor-operatorVB").style.display = 'none';
              document.getElementById(RandomStringId+"CodeString").innerHTML= "while true:"
              break
          }
          
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
        this.setUpUpdates()
    }, "1000");

    }

    setUpUpdates(){
      let RandomStringId = this.RandomStringId
      $("#"+RandomStringId+"varVB").on( "change", function() {
        document.getElementById(RandomStringId+"CodeString").innerHTML= "while "+$("#"+RandomStringId+"varVB").val()+":"
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
        document.getElementById(RandomStringId+"CodeString").innerHTML= "while "+$("#"+RandomStringId+"var1").val()+$("#"+RandomStringId+"operator").val()+$("#"+RandomStringId+"var2").val()+":"
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
        document.getElementById(RandomStringId+"CodeString").innerHTML= "while "+$("#"+RandomStringId+"var1").val()+$("#"+RandomStringId+"operator").val()+$("#"+RandomStringId+"var2").val()+":"
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
    }

    GetPythonCode(){
      let RandomStringId = this.RandomStringId
      let oPtype = $("#"+this.RandomStringId+"operatorType").val()
          switch (oPtype){
            case "Conditional":
             return "while "+$("#"+RandomStringId+"var1").val()+$("#"+RandomStringId+"operator").val()+$("#"+RandomStringId+"var2").val()+":"+"\n<!&*>"+this.RandomStringId+"<!&*>"
              break
            case "Vbased":

              return "while "+$("#"+RandomStringId+"varVB").val()+":"+"\n<!&*>"+this.RandomStringId+"<!&*>"
              break
            case "Ah":
              return "while True:"+":\n<!&*>"+this.RandomStringId+"<!&*>"
              break
          }
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







  

  
  window.addEventListener("DOMContentLoaded", (event) => {
    BlockManager = new BlocksManager();
    //test = new IfStatementBlock(MakeRandomString(70));
   // BlockManager.addBlockAsParent(test)

    Sidebar = new SideBar()


 
    Sidebar.addBlockOption("Loop")
    Sidebar.addBlockOption("LOOP")
    Sidebar.addBlockOption("If-statement")
    Sidebar.addBlockOption("Variable");
    Sidebar.addBlockOption("Input")
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



