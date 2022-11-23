//'https://jsonplaceholder.typicode.com/todos'
var showLoad = false;
const randNumber = GetRandomInt(2);
loadAnimation = document.querySelector(".lds-roller");
main = document.querySelector("main");
SetAnimation(true)
var loadedData = LoadData()

console.log(randNumber)



 
function LoadData()
{   
    var start = new Date().getTime();
    loadTime=0;
   
    if (showLoad)
    {
        loadTime = 2000; 
    }
     
    return fetch('https://jsonplaceholder.typicode.com/todos')
        .then(function (response) {
            return response.json()
        })
        .catch((response) => {
            console.log("error");
            SetErrorWindow();
            SetAnimation(false);
        })
        .then(async (response) => {

            var end = new Date().getTime()  ;  
            actualLoadTime = (end - start);
            console.log(actualLoadTime / 1000)
            await Wait( Math.abs(loadTime - actualLoadTime),response);
           
            return response;
        })
}
async function Wait(loadTime,data)
{
    console.log('calling');
    const result = await WaitMilliseconds(loadTime);
    BuildRepresentation(data);
    SetAnimation(false);
    console.log('done');
}
/* <div class="error centeredHorizontally" >
Error! Reload the page at once!
</div>  */
function SetErrorWindow()
{
    const container = document.createElement('div');
    container.classList.add('error','centeredHorizontally');
    container.textContent =  "Error! Reload the page at once!";
    main.appendChild(container);    

}
function WaitMilliseconds(milliseconds)
{
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, milliseconds);
    });
}

function BuildRepresentation(JSONdata)
{
    
    
    var obj = JSONdata
    var result = Object.entries(JSONdata);
    var func = randNumber == true ? function(entry){
        return entry[1].id < 100;
    }
    :
    function(entry){
       
        return entry[1].id + 100 >=200;
    }
   

    var filteredData = result.filter(function (entry) {
        return func(entry);
    });
    console.log(filteredData)
    const container = document.createElement('div');
    container.classList.add('toDoList');
    main.appendChild(container)    
    filteredData.forEach(element => 
   {
      const isCompleted =element[1].completed;
      var checkBoxString = isCompleted == true ? '<input type="checkbox" id="scales" name="scales" checked>':
      '<input type="checkbox" id="scales" name="scales" unchecked>'
      const checkBoxHTML = checkBoxString;
      const containerElement = document.createElement('div');
      containerElement.classList.add('toDoItem');
      containerElement.innerHTML = checkBoxHTML;
      const description = document.createElement('div');
      
      description.textContent =element[1].id+ ' ' + element[1].title ;
      containerElement.appendChild(description);
      container.appendChild(containerElement);
   });

}

function SetAnimation(state)
{
    if (state)
    {
        loadAnimation.style.display = "Block";
    }
    else
    {

        loadAnimation.style.display = "none";
    }
}

function GetRandomInt(max) {
    var randValue = Math.floor(Math.random() *max)
    maxIter = 500;
    iter = 0
   // while( randValue==0)
   // {   
   //     iter++;
   //     if(iter > maxIter)
   //     {
   //         console.log("infinte while loop");
   //         break;
   //     }
        randValue = Math.floor(Math.random() *max);
  //  }
    return randValue;
  }
