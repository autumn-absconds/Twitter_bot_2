import generate_New_Caption from './generate_New_Caption.js';
import get_image_discription_js from './get_image_discription_js.js';

let postCaption = '';
let hu = '';
// gnerate caption for image
let imageCaption = '五悠 happy happy happy (insert cat meme song)';
// let imageDescription = 'This is a test description';
let imageLink = 'https://pbs.twimg.com/media/GAUbo_ab0AAAN2U?format=jpg&name=small';

try {
    hu = await get_image_discription_js(imageLink);
} catch (error) {
    console.error('Error:', error);
}

try {
     postCaption = await generate_New_Caption(hu, imageCaption);
} catch (error) { 
    console.error('Error:', error);
}



// generate_New_Caption(imageDescription, imageCaption)
//     .then(result => {
//         console.log('New Caption:', result);
//         postCaption = result; // Store the result in the variable
//     })
//     .catch(error => console.error('Error:', error));


// Call the function and store the result
// get_image_discription_js(imageLink)
//     .then(result => {
//         console.log('Image desx:', result);
//         hu = result; // Store the result in the variable
//     })
//     .catch(error => console.error('Error:', error));



console.log('postCaption  : ', postCaption);
console.log('hu  : ', hu);