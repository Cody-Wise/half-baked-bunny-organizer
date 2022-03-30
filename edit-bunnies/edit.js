import {  
    getFamilies, 
    checkAuth, 
    logout,
    oneBunny,
    updateBunny,
    deleteBunny, 
} from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');
const params = new URLSearchParams(window.location.search);
const deleteButton = document.querySelector('.delete-button');


form.addEventListener('submit', async e => {
    e.preventDefault();
    
    // prevent default
    const data = new FormData(form);

    const name = data.get('bunny-name');
    const familyId = data.get('family-id');

    await updateBunny(params.get('id'), name, familyId);
    form.reset();
    window.location.replace('../families');
});
    
  

window.addEventListener('load', async () => {
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    const nameInput = document.querySelector('input');
    const select = document.querySelector('select');

    const families = await getFamilies();

    for (let family of families){
        const option = document.createElement('option');
        option.value = family.id;
        option.textContent = family.name;
        const currentBunny = await oneBunny(params.get('id'));
        nameInput.value = currentBunny.name;

        if (family.id === currentBunny.family_id) {
            option.selected = true;


        }

        select.append(option);
    }

    // go get the families from supabase


    // for each family

    // create an option tag

    // set the option's value and text content

    // and append the option to the select
});


checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});

deleteButton.addEventListener('click', async () => {

    await deleteBunny(params.get('id'));
    window.location.replace('../families');

    
});
