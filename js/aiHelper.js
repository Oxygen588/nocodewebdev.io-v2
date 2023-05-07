steps = [`


    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700" style="font-size:15px;
    text-align:center;
    width:30%;
    height:25vw;;
    ">
        <div class="px-1 py-1 border-b rounded-t dark:border-gray-600">
            <h3 class="text-base font-semibold text-gray-900  dark:text-gray-600"style="font-size:15px;">
                Select your favorite activities!
            </h3>
        </div>
        <div style="
       

">
 <label style="     width: 50%;
 height: 5%;
 
 position: relative;
 top:0;
 bottom: 0;
 left: 0;
 right: 0;
 
 margin: auto;
 margin-top:20px;
" for="default" class="block mb-2 text-l font-medium text-gray-900 dark:text-gray-900">
What is your favorite game?
</label>

        <select id="fGame" style="margin-top:1px;width:50%;
        width: 50%;
        height: 10%;
        
        position: relative;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        
        margin: auto;
        
        " class="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-l focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
            <option selected>Open this select menu</option>
            <option value="Fortnite">Fortnite</option>
            <option value="Minecraft">Minecraft</option>
            <option value="Roblox">Roblox</option>
            <option value="Among Us">Among Us</option>
        </select>




        <label style="     width: 50%;
        height: 5%;
        
        position: relative;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        
        margin: auto;
       " for="default" class="block mb-2 text-l font-medium text-gray-900 dark:text-gray-900">
       What is your second favorite game?
       </label>
       
               <select id="fsGame" style="margin-top:1px;width:50%;
               width: 50%;
               height: 10%;
               
               position: relative;
               top:0;
               bottom: 0;
               left: 0;
               right: 0;
               
               margin: auto;
               
               " class="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-l focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                   <option selected>Open this select menu</option>
                   <option value="Fortnite">Fortnite</option>
                   <option value="Minecraft">Minecraft</option>
                   <option value="Roblox">Roblox</option>
                   <option value="Among Us">Among Us</option>
               </select>
       






        <label style="     width: 50%;
        height: 5%;
        
        position: relative;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        
        margin: auto;
       " for="default" class="block mb-2 text-l font-medium text-gray-900 dark:text-gray-900">
       What is your favorite sport?
       </label>
       
               <select id="fsport" style="margin-top:1px;width:50%;
               width: 50%;
               height: 10%;
               
               position: relative;
               top:-1px;
               bottom: 0;
               left: 0;
               right: 0;
               
               margin: auto;
               
               " class="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-l focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                   <option selected>Open this select menu</option>
                   <option value="Football">Football</option>
                   <option value="Voley Ball">Voley Ball</option>
                   <option value="BasketBall">BasketBall</option>
                   <option value="Hockey">Hockey</option>
                   <option value="Tennis">Tennis</option>
               </select>

        







        

               <label style="     width: 50%;
               height: 5%;
               
               position: relative;
               top:0;
               bottom: 0;
               left: 0;
               right: 0;
               
               margin: auto;
              " for="default" class="block mb-2 text-l font-medium text-gray-900 dark:text-gray-900">
              What is your favorite Youtuber?
              </label>
              
                      <select 
                      id="fYoutuber"
                      style="margin-top:1px;width:50%;
                      width: 50%;
                      height: 10%;
                      
                      position: relative;
                      top:-1px;
                      bottom: 0;
                      left: 0;
                      right: 0;
                      
                      margin: auto;
                      
                      " class="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-l focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                          <option selected>Open this select menu</option>
                          <option value="PewDiePie">PewDiePie</option>
                          <option value="Markiplier"> Markiplier</option>
                          <option value="DanTDM">DanTDM</option>
                          <option value="SSSniperWolf">SSSniperWolf</option>
                          
                      </select>
               
                      <button
                      
                      style="
                      width:50%;
                      width: 50%;
                      height: 10%;
                      
                      position: relative;
                      top:-1px;
                      bottom: 0;
                      left: 0;
                      right: 0;
                      
                      margin: auto;
                      margin-top:15px;
                      "
                      onclick="AiHelper.setPreferences()"
                      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-black py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      Continue
                    </button>
                      
        </div>
        
    </div>

`]

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  
class aiHelper{
    constructor(){
        
        var value = localStorage.getItem('hasIntrestsBeenInitiated');
        
        console.log(value); // Output: value
        if (value==null){
            console.log("ased")
            localStorage.setItem('hasIntrestsBeenInitiated', 'Setted!');
            $('#initvalues').html(steps[0]);
            document.getElementById("initvalues").innerHTML = steps[0];
        }else{
            document.getElementById("initvallls").remove()
        }
        

        //localStorage.clear();
    }
    setPreferences(){
        localStorage.setItem('fYoutuber', $("#fYoutuber").val());
        localStorage.setItem('fsport', $("#fsport").val());
        localStorage.setItem('fsGame', $("#fsGame").val());
        localStorage.setItem('fGame', $("#fGame").val());
        document.getElementById("initvallls").remove()
    }
    async generateAiResponse(neededToExplain,short,callback){
        
        console.log(localStorage.getItem('fYoutuber'))
        let voice = await localStorage.getItem('fYoutuber')
        let game = ""
        if (getRandomInt(2)==0){
            game = await localStorage.getItem('fsGame')
        }else{
            game = await localStorage.getItem('fGame')
        }
        let sport = await localStorage.getItem('fsport')
        let text = `You are `+voice+` the YouTuber , Explain this to a 11 year old who is interested in `+game+` and `+sport+`:'`+neededToExplain+`'.In your answer you have to give your response in character as well as the response has to be based on the students intrests, with examples from the activities involving doing that intrest.Make it exact on the code given. Devide your answer into html blocks.Use <code></code> to show the code. Make it as explicit as needed for any IQ to understand it. Make short and enjoyable to read as possible. . Your response will be displayed using innerHTML so make it look good!`
        if (short){
            text+=". Maximum of 20 words! Make it short!"
        }
        text = text.replace(/ /g, "%20")
        if (localStorage.getItem(text)!=null){
            callback(localStorage.getItem(text))
            return localStorage.getItem(text)
        }
        async function fetchData(url) {
            return new Promise(function(resolve, reject) {
              var xhr = new XMLHttpRequest();
              xhr.open('GET', url, true);
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                    resolve(xhr.responseText);
                  } else {
                    reject('Error: ' + xhr.status);
                  }
                }
              };
              xhr.send();
            });
          }


          console.log("https://oxi.codes:3000/ai-api/"+text)
          await fetchData("https://oxi.codes:3000/ai-api/"+text)
            .then(async function(response) {
                //console.log('Data:', response);
                console.log("asd")
                let res = (response.split('\n').join('<br>').replace(/\n/g, "<br>"))
                localStorage.setItem(text, res);
                callback(res)
                return await response; // Returning the fetched data
            })
            .catch(function(error) {
                console.error('Error:', error);
            })
            .then(function(data) {
                // Use the fetched data in the main part of your program
                return data
                console.log('Fetched data:', data);
                // Perform further operations with the data
            });
          

    }

    async generateAiResponseNew(neededToExplain,short,callback){
     

        console.log(localStorage.getItem('fYoutuber'))
        let voice = await localStorage.getItem('fYoutuber')
        let game = ""
        if (getRandomInt(2)==0){
            game = await localStorage.getItem('fsGame')
        }else{
            game = await localStorage.getItem('fGame')
        }
        let sport = await localStorage.getItem('fsport')
        let text = `You are `+voice+` the YouTuber , Explain this to a 11 year old who is interested in `+game+` and `+sport+`:'`+neededToExplain+`'.In your answer you have to give your response in character as well as the response has to be based on the students intrests, with examples from the activities involving doing that intrest.Make it exact on the code given. Devide your answer into html blocks.Use <code></code> to show the code. Make it as explicit as needed for any IQ to understand it. Make short and enjoyable to read as possible. . Your response will be displayed using innerHTML so make it look good!`
        if (short){
            text+=". Maximum of 20 words! Make it short!"
        }
        text = text.replace(/ /g, "%20")
        async function fetchData(url) {
            return new Promise(function(resolve, reject) {
              var xhr = new XMLHttpRequest();
              xhr.open('GET', url, true);
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                    resolve(xhr.responseText);
                  } else {
                    reject('Error: ' + xhr.status);
                  }
                }
              };
              xhr.send();
            });
          }


          console.log("https://oxi.codes:3000/ai-api/"+text)
          await fetchData("https://oxi.codes:3000/ai-api/"+text)
            .then(async function(response) {
                //console.log('Data:', response);
                let res = (response.split('\n').join('<br>').replace(/\n/g, "<br>"))
                localStorage.setItem(text, res);
                callback(res)
                return await response; // Returning the fetched data
            })
            .catch(function(error) {
                console.error('Error:', error);
            })
            .then(function(data) {
                // Use the fetched data in the main part of your program
                return data
                console.log('Fetched data:', data);
                // Perform further operations with the data
            });

    }


}

