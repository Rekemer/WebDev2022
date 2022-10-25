//TO DO: clear table (reset)
//       download Table on reloading page
main = document.querySelector("main");
resetButton = document.querySelector("input[type=reset]");

const englishDays = ["Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday",
"Sunday"];


const russianDays = ["Понедельник",
"Вторник",
"Среда",
"Четверг",
"Пятница",
"Суббота",
"Воскресенье"];



resetButton.addEventListener('click', (e) => 
{
    CleanTable();
    window.localStorage.clear();
}
)

 
if ( localStorage.getItem("Monday") != undefined || localStorage.getItem("Понедельник") != undefined){
    GenerateTableOnLoad(localStorage);
 }





const buttonString = '<input type="text"  class = "editButton">';
const viewString = '<input type="text"  class = "editButton">';
var edit = false;

// const submitButton =  document.querySelector("input[type=submit]");
// console.log(submitButton);

document.querySelector('form').addEventListener('submit', (e) => {
    const formData = new FormData(e.target);
    const studyDays = formData.get("maxDays");
    const classes = formData.get("maxClasses");
    language = formData.get("TableLanguage");
    e.preventDefault();
    GenerateTable(studyDays,classes,language);
   
    // Now you can use formData.get('foo'), for example.
    // Don't forget e.preventDefault() if you want to stop normal form .submission
  });

function ParseSavedData(stringData)
{
    var arrayData = stringData.split(',');
    return arrayData;
}

function CleanTable()
{
    const table = document.querySelector('.table');
    if (table != null){
        table.remove();
    }
}

function GenerateTableOnLoad(storage)
{
    var language = window.localStorage.getItem("Language");
    console.log(localStorage.getItem("Понедельник"));
    arrayToIterate = language == "Russian" ?  russianDays : englishDays;

    const table = document.createElement('div');
    table.classList.add('table','centeredHorizontally');

    const button  = document.createElement('button');
    button.addEventListener('click', EditTable);
    button.setAttribute('type', 'button');
    button.classList.add('iconButton');
    const image  = document.createElement('img');
    image.setAttribute('src', '../res/edit_icon.png');
    image.setAttribute('width', '24px');
    image.setAttribute('height', '24px');
    image.classList.add('editClick');

    //<img src="../res/edit_icon.png"  class = "editClick" alt="" width="24px" height = "24px"></img>
    table.appendChild(button);
    button.appendChild(image);
    main.appendChild(table);
    
    for (let i = 0; i < arrayToIterate.length; i++)
    {
        //console.log(arrayToIterate[i])
        var data = storage.getItem(arrayToIterate[i]);
        if (data == null) break;
        console.log(data)
        data = ParseSavedData(data);

        
        const tableCell  = document.createElement('div');
        tableCell.classList.add('tableCell');
        day = arrayToIterate[i];
        const tableHeaderCell  = document.createElement('div');
        tableHeaderCell.textContent = day;
        tableHeaderCell.classList.add('tableHeaderCell');
        tableCell.appendChild(tableHeaderCell);
    
        for (let j = 0; j < data.length; j++)
        {
            const lesson  = document.createElement('div');
            lesson.textContent = data[j];
            tableCell.appendChild(lesson);
        }
        table.appendChild(tableCell);   
        
    }
 }

function GenerateTable(studyDays, maxClasses, language)
{
     
    
    const table = document.createElement('div');
    table.classList.add('table','centeredHorizontally');

    const button  = document.createElement('button');
    button.addEventListener('click', EditTable);
    button.setAttribute('type', 'button');
    button.classList.add('iconButton');
    const image  = document.createElement('img');
    image.setAttribute('src', '../res/edit_icon.png');
    image.setAttribute('width', '24px');
    image.setAttribute('height', '24px');
    image.classList.add('editClick');

    //<img src="../res/edit_icon.png"  class = "editClick" alt="" width="24px" height = "24px"></img>
    table.appendChild(button);
    button.appendChild(image);
    main.appendChild(table);

    languageDays = language == "English" ? englishDays : russianDays;
    window.localStorage.setItem("Language",language);
    for (let i = 0; i < studyDays; i++)
    {
        const tableCell  = document.createElement('div');
        tableCell.classList.add('tableCell');
        day = languageDays[i];
        const tableHeaderCell  = document.createElement('div');
        tableHeaderCell.textContent = day;
        tableHeaderCell.classList.add('tableHeaderCell');
        tableCell.appendChild(tableHeaderCell);

        for (let j = 0; j < maxClasses; j++)
        {
            const lesson  = document.createElement('div');
            lesson.textContent = language == "English" ? "class" : "Занятие";
            tableCell.appendChild(lesson);
        }
        table.appendChild(tableCell);
    }
   
   

}


function EditTable()
{
    
    const table = document.querySelector(".table");
    const tableCells = document.querySelectorAll(".tableCell");
    edit = !edit;
    
    var language = window.localStorage.getItem("Language");
    var dummyString = language == "English"? "classes":"Занятия";
    //console.log(buttonString);
    if (edit){
         // edit table
        for (let i = 0; i < tableCells.length; i++) {
            
           
            var children = tableCells[i].children;
            var day =  children[0].textContent;
            var classes = window.localStorage.getItem(day);
            if (classes != null)
            {
                classes = ParseSavedData(classes);
            }
            console.log(classes);
            for (let j = 0; j < children.length; j++)
            {
                
                 if (j == 0 )
                 {
                      continue;
                 }

                 children[j].innerHTML = buttonString;
                 children[j].firstChild.value = classes != null ? classes[j-1] : dummyString;
                 children[j].firstChild.style.width =  children[j].firstChild.value.length + "ch";
                 //console.log(children[j]);
            }
        
       
        }
   
    }
    else
    {
        
        //save table
        for (let i = 0; i < tableCells.length; i++) {
            
            var list = [];
            var children = tableCells[i].children;
            var day;
            for (let j = 0; j < children.length; j++)
            {
                if (j == 0 )
                { 
                    //console.log(tableCells[j]);
               
                    day = children[j].textContent;
                    continue;
                }
                const lesson = children[j].firstChild.value;
                
                children[j].innerHTML = '<div>'+lesson+'</div>';
                list.push(lesson);
               
            }
            //console.log(list);
            console.log(day);
            window.localStorage.setItem(day, list);
        }
        console.log(language);
        window.localStorage.setItem("Language",language);
    }


}