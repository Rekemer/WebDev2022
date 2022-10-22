var start = new Date().getTime();  
loadTime = -1;

window.onload = PageLoadTime;  

function PageLoadTime()
{  
    var end = new Date().getTime();  
    loadTime = (end - start) / 1000;
    const loadTimeContainer = document.
    querySelector("footer #loadTime");
    loadTimeContainer.textContent = "LoadTime: " + loadTime.toString()
    + " seconds";
    console.log(document.location);
}








