// Extensions can run scripts that read and modify the content of a page.These are called content scripts.They live in an isolated world, meaning they can make changes to their JavaScript environment without conflicting with their host page or other extensions' content scripts.

// The extension will first check if the page contains the < article > element.Then, it will count all the words within this element and create a paragraph that displays the total reading time.
const article = document.querySelector('article');
console.log({article})
if (article) {
    const text=article.textContent;
    console.log({text})
    const wordMatchRegExp = /[^\s]+/g; //Regular Expression used to match character combination in string.
    const words=text.matchAll(wordMatchRegExp);//matchAll returns an iterator, convert to array to get word count.
    console.log("words",words);
    const wordCount=[...words].length;
    console.log([...words])
    const readingTime=Math.round(wordCount/200);
    const badge=document.createElement('p');
    badge.classList.add("color-secondary-text","type--caption");
    badge.textContent =`🕒 ${readingTime} min read`;
    const heading= article.querySelector('h1');
    console.log(heading)
    const date=article.querySelector("time")?.parentNode;

    (date ?? heading).insertAdjacentElement("afterend",badge);

    // for mdn docs website
    // heading?.insertAdjacentElement("afterend",badge);

}