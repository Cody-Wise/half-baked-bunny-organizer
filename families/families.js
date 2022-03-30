import { checkAuth, getFamilies, logout } from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

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
        const nameEl = document.createElement('h3');
        const bunniesEl = document.createElement('div');
        
        console.log(family);
        familyEl.classList.add('family');
        bunniesEl.classList.add('bunnies');
        nameEl.textContent = family.name;
        for (let bunny of family.fuzzy_bunnies){
            const bunnyEl = document.createElement('div');
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

    // append the bunniesEl and nameEl to the familyEl

    // append the familyEl to the familiesEl
}

window.addEventListener('load', async () => {
    const families = await getFamilies();

    displayFamilies(families);
});
