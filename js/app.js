/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
var sectionsList;
var navMenu;

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

/**
 * @returns true or false based on this element is visiable on screen or not
 * check this link (https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/)
 * for more information for check if an element is visible in the screen
 * 
 */
function isOnScreen(section) {
    const rect = section.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );

}

/**
 * @description
 * this function set all sections to global variable to use it during manipulation DOM.
 */
function buildMenu() {
    sectionsList = document.querySelectorAll('section');
}

/**
 * @description
 *  this function build the navigation menu item and links
 * and on click on specific item then scroll to it by using specific section ID.
 */
function createDynamicNavList() {

    navMenu = document.querySelector('#navbar__list');

    let navContainer = document.createDocumentFragment();

    for (let i = 0; i < sectionsList.length; i++) {
        // console.log(navList[i]);
        let newNavItem = document.createElement('li');
        let anchor = document.createElement('a');
        anchor.textContent = sectionsList[i].getAttribute('data-nav');

        // Scroll to section on link click
        anchor.setAttribute('href', `#${sectionsList[i].getAttribute('id')}`);
        // scroll to specific section smoothly
        // anchor.addEventListener('click', function(event) {
        //     let rect = sectionsList[i].getBoundingClientRect();
        //     // Scroll to anchor ID using scrollTO event
        //     window.scrollTo(rect.x, rect.y);
        // });
        anchor.classList.add('menu__link');

        if (i == 0) {
            // console.log('jjjj')
            anchor.classList.toggle('active__link');
        }
        newNavItem.appendChild(anchor);
        // newNavItem
        // console.log(newNavItem);
        navContainer.appendChild(newNavItem);
    }
    navMenu.appendChild(navContainer);
}

/**
 * @description
 * this function activate specific section if it is on viewport
 * and  Add class 'your-active-class'  to section when near top of viewport
 * and active__link to activate link of menu item
 */
function addActiveState() {
    for (let i = 0; i < sectionsList.length; i++) {

        document.addEventListener('scroll', function() {

            let onScreen = isOnScreen(sectionsList[i]);

            // Set sections as active if section on screen
            if (onScreen) {
                //1.add active link
                //2.change active section                
                sectionsList[i].classList.add('your-active-class');
                navMenu.querySelectorAll('li')[i].querySelector('a').classList.add('active__link');
            } else {
                // if section is not on screen
                // remove(active section and active link)
                sectionsList[i].classList.remove('your-active-class');
                navMenu.querySelectorAll('li')[i].querySelector('a').classList.remove('active__link');

            }
        });
    };


}
/**
 * @description
 * this is main function which run all tasks *when the DOM is ready* such as create Navigation menu and acivate specific section
 */
function main() {
    // if DOM is ready then run the these tasks
    document.addEventListener('DOMContentLoaded', function() {
            // build menu list
            buildMenu();
            // create dynamic Navgiation menu
            createDynamicNavList();
            // activate section if section on screen
            addActiveState();
        }

    );
}

//run all dynamic tasks
main();