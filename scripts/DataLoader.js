//'https://jsonplaceholder.typicode.com/todos'
var showLoad = true;
loadAnimation = document.querySelector(".lds-roller");

var loadedData = LoadData()
console.log(loadedData)



 
function LoadData()
{   
    var start = new Date().getTime();
    loadTime=0;
    SetAnimation(true)
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
        })
        .then(async (response) => {

            var end = new Date().getTime()  ;  
            actualLoadTime = (end - start);
            console.log(actualLoadTime / 1000)
            await Wait( Math.abs(loadTime - actualLoadTime));
            SetAnimation(false);
            return response;
        })
}
async function Wait(loadTime)
{
    console.log('calling');
    const result = await WaitMilliseconds(loadTime);
    console.log('done');
}
function WaitMilliseconds(milliseconds) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, milliseconds);
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
