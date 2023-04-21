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
  constructor(){}

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
          this.CurrentClick = ""
        }else if (BlockManager.getBlockFromId(id).CanConnectFrom()){
          BlockManager.getBlockFromId(id).SetDotId(jsPlumb.addEndpoint(id, RightsourceOption));
          this.CurrentClick = id
        }else if(this.CurrentClick == id){
          this.CurrentClick = ""
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
        
        if (BlockManager.getBlockFromId(block.GetConnectFrom()).CanDeleteDot()){
          console.log(BlockManager.getBlockFromId(block.GetConnectFrom()).GetDotId())
          jsPlumb.deleteEndpoint(BlockManager.getBlockFromId(block.GetConnectFrom()).GetDotId())
        }
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
      //console.log(key, value);
    }
    console.log(NewBlocks)
    for (const [key1, value] of Object.entries(this.ParentBlocks)) {

      console.log(value.GetBlocksConnectedTo())
      value.ReOrderBlocksConnectedTo()
      
      value.GetBlocksConnectedTo().forEach(function (item, index) {
        console.log("*"+key1+"*")
        console.log(BlockManager.getBlockFromId(item).GetBlockLevel())
        console.log(BlockManager.getBlockFromId(item).GenerateLevel())
        GeneratedCod = GeneratedCod.replace("*"+key1+"*", BlockManager.getBlockFromId(item).GenerateLevel()+BlockManager.getBlockFromId(item).GetPythonCode()+"\n"+"*"+key1+"*")
        delete NewBlocks[item]
      })
      //GeneratedCod+=value.GetPythonCode()
    }
    console.log(NewBlocks)
    while ( Object.keys(NewBlocks).length>0){
    for (const [key1, value] of Object.entries(NewBlocks)) {
      console.log(key1)
      
      if (GeneratedCod.includes(value.GetConnectFrom())){
      GeneratedCod = GeneratedCod.replace("*"+value.GetConnectFrom()+"*", BlockManager.getBlockFromId(key1).GenerateLevel()+BlockManager.getBlockFromId(key1).GetPythonCode()+"\n"+"*"+value.GetConnectFrom()+"*")
      delete NewBlocks[key1]
      }
    }
  }

    console.log(GeneratedCod)
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
      console.log(this.StringId)
  
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
      console.log(RandomStringId)
      var tag = document.createElement(RandomStringId);
      tag.id = RandomStringId
      tag.style.position = 'absolute';
      tag.style.width = "200px";
      document.getElementById('aaaasdasdasd').appendChild(tag);
      tag.innerHTML =`<div id="`+RandomStringId+"3"+`">
      <div id="`+(RandomStringId+"dell")+`"style="position:relative;left:90%;top:20px;z-index:100;"><img  height="20" src="img/x-png.png"></img></div>
      <td><a style="position: relative;width:200px;"class="list-group-item list-group-item-action py-2 ripple active text" >IF STATEMENT
        <span class="dot"id="`+RandomStringId+"1"+`"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;  <img width="30"style="left:50%" src="https://images.squarespace-cdn.com/content/v1/5cc9adbd815512424050bffb/1563554742361-0AB7HKIZIBOX1322RJMC/Connect-Logo-print_mark-only-color.png"></img></span>
        </a></td>
        
        <div class="list-group-item list-group-item-action py-2 ripple active text" style="relative;width:200px;">
          <label for="name"></label>
  <input style="width:40px;"type="text" id="`+(RandomStringId+"var1")+`">
    <select name="operator" id="`+(RandomStringId+"operator")+`">
      <option value="==">==</option>
      <option value="<"><</option>
      <option value=">">></option>
      <option value="!=">!=</option>
      <option value="&&=">&&</option>
    </select>
    <label for="name"></label>
  <input style="width:40px;"type="text" id="`+(RandomStringId+"var2")+`">
    </div>
    </div>
             `
             $( "#"+RandomStringId).draggable();
           
             
    }

    GetPythonCode(){
      return "if "+$("#"+this.RandomStringId+"var1").val()+$("#"+this.RandomStringId+"operator").val()+$("#"+this.RandomStringId+"var2").val()+":\n*"+this.StringId+"*"
      
    }
    
    CanConnectFrom(){
      return true
    }
  
    constructor(randomString){
      super(randomString);
      console.log(randomString)
      this.RandomStringId =randomString;
      this.constructHtml(this.RandomStringId);
      $( "#"+this.RandomStringId).draggable();
    }
  }
  
  
  class VariableBlock extends Block{
    constructHtml(RandomStringId){
      var tag = document.createElement(RandomStringId);
      tag.id = RandomStringId
      tag.style.position = 'absolute';
      document.getElementById('aaaasdasdasd').appendChild(tag);
      tag.innerHTML =`<div id="`+RandomStringId+"3"+`">
      <div id="`+(RandomStringId+"dell")+`"style="position:relative;left:90%;top:20px;z-index:100;"><img height="20" src="img/x-png.png"></img></div>
      <td><a style="position: relative;width:200px;font-size:15px;"class="list-group-item list-group-item-action py-2 ripple active text" >SET/UPDATE VARIABLE
        <span class="dot"id="`+RandomStringId+"1"+`"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;  <img width="30"style="left:50%" src="https://images.squarespace-cdn.com/content/v1/5cc9adbd815512424050bffb/1563554742361-0AB7HKIZIBOX1322RJMC/Connect-Logo-print_mark-only-color.png"></img></span>
        </a></td>
        <div class="list-group-item list-group-item-action py-2 ripple active text" style="relative;width:200px;">
          <label for="name"></label>
          <label style="font-size:10px;" for="name">Variable name</label></br>
         
  <input style="width:40px;"type="text" id="`+(RandomStringId+"varname")+`">
  &nbsp;
    <label for="name">=</label>
    &nbsp; 
  
  <input style="width:40px;"type="text" id="`+(RandomStringId+"var")+`">
  <label style="font-size:10px;" for="name">Value</label></br>
    </div></div></div>`
             $( "#"+RandomStringId).draggable();

             
    }

    GetPythonCode(){
      return $("#"+this.RandomStringId+"varname").val()+"="+$("#"+this.RandomStringId+"var").val()
      
    }
    
    CanConnectFrom(){
      return false
    }
    constructor(randomString){
      super(randomString);
      console.log(randomString)
      this.RandomStringId =randomString;
      this.constructHtml(this.RandomStringId);
      $( "#"+this.RandomStringId).draggable();
    }
  }
  
  window.addEventListener("DOMContentLoaded", (event) => {
    BlockManager = new BlocksManager();
    test = new IfStatementBlock(MakeRandomString(70));
    test1 = new VariableBlock(MakeRandomString(70));
    BlockManager.addBlockAsParent(test)
    test11 = new VariableBlock(MakeRandomString(70));
    BlockManager.addBlockAsParent(test11)
    test2 = new IfStatementBlock(MakeRandomString(70));
    BlockManager.addBlockAsParent(test2)
    BlockManager.addBlockAsParent(test1)

    test = new IfStatementBlock(MakeRandomString(70));
    test1 = new VariableBlock(MakeRandomString(70));
    BlockManager.addBlockAsParent(test)
    test11 = new VariableBlock(MakeRandomString(70));
    BlockManager.addBlockAsParent(test11)
    test2 = new IfStatementBlock(MakeRandomString(70));
    BlockManager.addBlockAsParent(test2)
    BlockManager.addBlockAsParent(test1)
    addEventListener('mousemove', (event) => {jsPlumb.repaintEverything();});
});
