{
    var colors = [
        "rgba(202,183,187,255)",
        "rgba(169,159,160,255)",
        "rgba(174,143,151,255)",
        "rgba(217,196,195,255)",
        "rgba(175,144,139,255)",
        "rgba(199,167,146,255)",
        "rgba(166,109,90,255)",
        "rgba(154,88,76,255)",
    ];

    var colorDivs = [];
    
    const addColors = (count) => {
        let container = document.getElementById("grid-container");
        
        for(let i = 0; i < count; i++) {
            let div = document.createElement('div');
            container.appendChild(div);

            colorDivs[i] = div;
            
            let color = colors[i];
            div.style.backgroundColor = color;
            div.style.aspectRatio = "1";
        }
    }

    addColors(colors.length);

    let square = document.getElementById("view-square");
    let rounded = document.getElementById("view-rounded");
    let circle = document.getElementById("view-circle");
    let previous = circle;

    square.addEventListener("click",
        function (e) {
            viewSquare();
            e.preventDefault();
        },
        false
    );
    rounded.addEventListener("click",
        function (e) {
            viewRounded();
            e.preventDefault();
        },
        false
    );
    circle.addEventListener("click",
        function (e) {
            viewCircle();
            e.preventDefault();
        },
        false
    );

    let bgColor = getComputedStyle(document.body).
        getPropertyValue('--view-border-color');

    const viewSquare = () => {
        setBorderRadiusForDivs('0px');
        setView(square);
    }
    
    const viewRounded = () => {
        setBorderRadiusForDivs('20px');
        setView(rounded);
    }
    
    const viewCircle = () => {
        let radius = colorDivs[0].getBoundingClientRect().width + 'px'; 
        setBorderRadiusForDivs(radius);
        setView(circle);
    }
    
    const setBorderRadiusForDivs = (radius) => {
        colorDivs.forEach(element => {
            element.style.borderRadius = radius;
        });
    }

    const setView = (view) => {
        previous.style.backgroundColor = "";
        view.style.backgroundColor = bgColor;
        previous = view;
    }

    viewCircle();

    let tiles = document.getElementById("view-tiles");
    let stacked = document.getElementById("view-stacked");
    let gridContainer = document.getElementById("grid-container");

    tiles.addEventListener("click",
        function (e) {
            viewTiles();
            e.preventDefault();
        },
        false
    );

    stacked.addEventListener("click",
        function (e) {
            viewStacked();
            e.preventDefault();
        },
        false
    );

    

    let containerDivs = [];

    const stackTheColors = () => {
        let index = 0;
        let containerDiv;
        for(let i = 0; i < colorDivs.length; i++) {
            if(i % 3 == 0) {
                containerDiv = document.createElement('div');
                containerDiv.style.position = "relative";
                containerDivs[index] = containerDiv;
                index++
                
                gridContainer.appendChild(containerDiv);
            }
            containerDiv.appendChild(colorDivs[i]);

            setColorDivsPos(i);
        }
    }

    const tileTheColors = () => {
        for(let i = 0; i < colorDivs.length; i++) {
            colorDivs[i].style.removeProperty("position");
            colorDivs[i].style.removeProperty("display");
            colorDivs[i].style.removeProperty("width");
            colorDivs[i].style.removeProperty("height");
            colorDivs[i].style.removeProperty("left");
        }
        
        for(let i = 0; i < containerDivs.length; i++) {
            for(let j = 0; j < containerDivs[i].children.length; j++) {
                gridContainer.appendChild(containerDivs[i].children[j]);
            }
            containerDivs[i].remove();
        }
    }

    const setColorDivsPos = (i) => {
        setColorDivSize(i);
        
        if(i % 3 == 1) {
            setColorDivPos(i, 0.5);
        }
        if(i % 3 == 2) {
            setColorDivPos(i, 1);
        }
    }

    const setColorDivSize = (i) => {
        let size = colorDivs[i].getBoundingClientRect().width;
        let sizeString = size * 0.5 + 'px';
        colorDivs[i].style.display = "inline-block";
        colorDivs[i].style.width = sizeString;
        colorDivs[i].style.height = sizeString;
    }

    const setColorDivPos = (i, positionFactor) => {
        let size = colorDivs[i].getBoundingClientRect().width;
        let position = size * positionFactor + 'px';
        colorDivs[i].style.position = "absolute";
        colorDivs[i].style.left = position;
    }

    const viewTiles = () => {
        gridContainer.style.gridTemplateColumns = "1fr 1fr 1fr";

        unselectPreviousView(stacked.children);
        selectView(tiles);
        tileTheColors();
    }
        
    const viewStacked = () => {
        gridContainer.style.gridTemplateColumns = "1fr 1fr";
        
        unselectPreviousView(tiles.children);
        selectView(stacked);
        stackTheColors();
    }

    const selectView = (array) => {
        for(let i = 0; i < array.children.length; i++) {
            array.children[i].style.backgroundColor = bgColor;
        }
    }

    const unselectPreviousView = (array) => {
        for (let i = 0; i < array.length; i++) {
            let element = array[i];
            element.style.backgroundColor = "";
        }
    }

    viewTiles();
}   