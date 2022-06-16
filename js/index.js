let pageNumber = 1;

document.addEventListener( "DOMContentLoaded", () =>
{
    createForm();
    getMonster( pageNumber )
    const form = document.querySelector( "#monster-form" );
    form.addEventListener( "submit", ( eventFn ) =>
    {
        eventFn.preventDefault();
        const monsterName = eventFn.target.elements["name"].value;
        const monsterAge = eventFn.target.elements["age"].value;
        const monsterDescr = eventFn.target.elements["description"].value;
        const monsterObject = { name: monsterName, age: monsterAge, description: monsterDescr };
        newMonster(monsterObject);
    } )
     const back = document.querySelector("#back");
    const forward = document.querySelector( "#forward" );
    
    back.addEventListener( "click", ( eventFn ) =>
    {
        pageNumber = pageNumber - 1;
        document.getElementById("monster-container").innerHTML = getMonster(pageNumber)
    } )
    forward.addEventListener( "click", ( eventFn ) =>
    {
        pageNumber = pageNumber + 1;
        document.getElementById("monster-container").innerHTML = getMonster(pageNumber);
    })
    
} )

function getMonster ( pageNumber )
{
    fetch( `http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}` )
        .then( response => response.json() )
        .then( data =>
        {
            Array.from( data ).forEach( ( monster ) =>
            {
            monsterList(monster)
        })
    })
}

function newMonster ( monsterObject )
{
    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        },
      body:JSON.stringify(monsterObject)
    });
    
}

function monsterList ( monsterObject )
{
    const monsterContainer = document.querySelector( "#moster-container" );
    const div = document.createElement( "div" )
    
    div.innerHTML = `<h2>${monsterObject.name}</h2> 
    <h4>${monsterObject.age}</h4> 
    <p>${monsterObject.description}</p>`;

    monsterContainer.appendChild(div)
}
function createForm() {
  const createMonster = document.querySelector("#create-monster");
  const form = document.createElement("form");
  const btn = document.createElement("button");
  const nameInput = document.createElement("input");
  const ageInput = document.createElement("input");
  const descrInput = document.createElement( "input" );
    
  btn.innerText = "Create";
  nameInput.id = "name";
  nameInput.placeholder = "name...";
  ageInput.id = "age";
  ageInput.placeholder = "age...";
  descrInput.id = "description";
  descrInput.placeholder = "description...";
  form.id = "monster-form";
  form.append(nameInput, ageInput, descrInput, btn);
  createMonster.appendChild(form);
}