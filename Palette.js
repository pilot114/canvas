function Palette(id) {

    this.selected = null;

    let pallete = document.getElementById(id);

    let types = lifersList();

    let ul = document.createElement("ul");
    for (let i in types) {
        let div = document.createElement("div");
        let text = document.createTextNode(types[i]);
        div.appendChild(text);

        let obj = new window[types[i]](0, 0);
        let colorHex = colorToHex(obj.color);
        div.style.backgroundColor = colorHex;
        div.style.color = invertColor(colorHex, true);
        div.style.padding = '3px';
        // li.classList.add('active');

        div.addEventListener("click", function() {
            if (this.style.backgroundColor === 'white') {
                this.style.backgroundColor = colorHex;
                this.style.color = invertColor(colorHex, true);
                this.selected = null;
            } else {
                this.style.backgroundColor = 'white';
                this.style.color = 'black';
                this.selected = obj;
            }
        });

        pallete.appendChild(div);
    }

}