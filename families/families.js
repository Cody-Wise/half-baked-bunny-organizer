import { checkAuth, getFamilies, logout, updateFamily } from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

// function allowDrop(ev) {
//     ev.preventDefault();
// }
  
// function drag(ev) {
//     ev.dataTransfer.setData('text', ev.target.id);
// }
  
// function drop(ev) {
//     ev.preventDefault();
//     const data = ev.dataTransfer.getData('text');
//     ev.target.appendChild(document.getElementById(data));
// }

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayFamilies(families) {
    
    // fetch families from supabase
    // await getFamilies();
    // clear out the familiesEl
    familiesEl.textContent = '';
    
    
    for (let family of families) {
        // create three elements for each family, one for the whole family, one to hold the name, and one to hold the bunnies
        const familyEl = document.createElement('div');
        familyEl.id = family.id;
        const nameEl = document.createElement('h3');
        const bunniesEl = document.createElement('div');

        
        
        familyEl.classList.add('family');
        bunniesEl.classList.add('bunnies');
        nameEl.textContent = family.name;
        for (let bunny of family.fuzzy_bunnies){
            const bunnyEl = document.createElement('div');
            bunnyEl.id = bunny.id;
            bunnyEl.setAttribute('draggable', true);
            bunnyEl.setAttribute('ondragstart', "event.dataTransfer.setData('text/plain',null)");
            bunnyEl.classList.add('bunny');
            bunnyEl.textContent = bunny.name;

            bunnyEl.addEventListener('click', async () => {
                // await deleteBunny(bunny.id);

                location.replace(`../edit-bunnies/?id=${bunny.id}`);
                const updatedFamilies = await getFamilies();
                await displayFamilies(updatedFamilies);

                

                
            });

            bunniesEl.append(bunnyEl);


          

        }

        familyEl.append(nameEl, bunniesEl);

        familiesEl.append(familyEl);
        console.log(familiesEl);

        
    }
    let dragged;
    document.addEventListener('drag', function() {
        



    }, false);
    document.addEventListener('dragstart', (event) => {
        dragged = event.target;
        console.log(event);

        event.dataTransfer.setData('text', event.target.id);

    });
    document.addEventListener('dragend', (e) => {
        e.preventDefault();
    });

    document.addEventListener('dragover', function(event) {
        // prevent default to allow drop
        event.preventDefault();
    }, false);


    document.addEventListener('drop', async function(event) {
        // prevent default action (open as link for some elements)
        console.log(event);
        event.preventDefault();
        // move dragged elem to the selected drop target
        if (event.target.className === 'family') {
            event.target.style.background = '';
            dragged.parentNode.removeChild(dragged);
            event.target.appendChild(dragged);
        }
        const elementPlace = event.path.length - 7;
        const bunnyId = event.dataTransfer.getData('text');
        const familyId = event.path[elementPlace].id;

        

        console.log(familyId);

        
        await updateFamily(bunnyId, familyId);


        console.log(bunnyId);
    }, false);

   

    


    // updateBunny(id, name, family_id)

    // append the bunniesEl and nameEl to the familyEl

    // append the familyEl to the familiesEl
}

window.addEventListener('load', async () => {
    const families = await getFamilies();

    displayFamilies(families);
});
