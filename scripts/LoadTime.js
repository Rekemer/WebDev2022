var start = new Date().getTime();  
loadTime = -1;
const myMap = new Map();
window.onload = PageLoadTime;  
myMap.set("LanguagePage.html","Почему я говорю на человеческом или как я познакомился с первый космическим языком?")
myMap.set("Table.html","Друзья рыжего кота")
myMap.set("","Сайт рыжего кота")
siteName = ConvertPathToString(document.location.pathname);

const pageNameContainer = document.
    querySelector(".mainHeader").children[1];
pageNameContainer.children[0].textContent = siteName;









function PageLoadTime()
{  
    var end = new Date().getTime();  
    loadTime = (end - start) / 1000;
    const loadTimeContainer = document.
    querySelector("footer #loadTime");
    loadTimeContainer.textContent = "LoadTime: " + loadTime.toString()
    + " seconds";
}



function ConvertPathToString(path)
{
    var splittedPath = path.split('/');
    var pageName = splittedPath[splittedPath.length-1];
    return myMap.get(pageName);
}








