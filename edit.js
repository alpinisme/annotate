/* elements defined in index.html */

const textarea = document.getElementById("add-content");
const addAnnotationBtn = document.getElementById("save-annotation-btn");
const addAnnotation = document.getElementById("save-annotation");
const addContentBtn = document.getElementById("add-content-btn");
const contentBox = document.getElementById("content");
const annotationBox = document.getElementById("save-annotation-container");

/* stateful functions */

const uniqueIdMaker = (kind) => { 
    const index = 0; 
    return () => kind + index.toString();
}

const makeAnnotationId = uniqueIdMaker("ann");

/* functions */

function replaceContent() {
    const content = textarea.value;
    const paragraphs = content.split("\n");
    paragraphs.forEach(para => { 
        const words = para.split(" ");
        const el = document.createElement("p");
        words.forEach(word => {
            const span = document.createElement("span");
            span.classList.add("clickable-word");

            const punctuation = word.match(/\W+$/);
            let marks = '';
            
            if (punctuation) {
                marks = punctuation[0];
                const wordBody = word.slice(0, -marks.length);
                span.textContent = wordBody || '';
            } else {
                span.textContent = word;
            }
    
            el.append(span);
            el.append(document.createTextNode(marks + " "));
        })

        contentBox.append(el);

    })
}

function selectWord(event) {
    if (event.target.classList.contains("clickable-word")) {
        event.target.classList.toggle("active");
    }
}

function saveAnnotation() {
    const activeList =  document.querySelectorAll(".active")
    if (activeList.length === 0) {
        return;
    }
    const id = makeAnnotationId();
    activeList.forEach(el => {
        el.classList.remove("active");
        el.classList.add(id);
    })
    const annotation = document.createElement("p");
    annotation.textContent = addAnnotation.value;
    annotation.id = id;
    annotation.classList.add("annotation");
    annotationBox.append(annotation);
}

function highlightAssociatedWords(event) {
    const highlightClass = "highlighted";
    document.querySelectorAll("." + highlightClass).forEach(element => {
        console.log("before: ", element.classList);
        element.classList.remove(highlightClass);
        console.log("after: ", element.classList);
    });
    if (event.target.classList.contains("annotation")) {
        document.querySelectorAll("." + event.target.id).forEach(element => {
            element.classList.add(highlightClass);
        });
    }
}

/* event listeners */

addContentBtn.addEventListener("click", replaceContent);
document.addEventListener("click", selectWord);
addAnnotationBtn.addEventListener("click", saveAnnotation);
document.addEventListener("click", highlightAssociatedWords);