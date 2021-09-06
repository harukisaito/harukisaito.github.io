{
    var colorValues = [
        "rgba(202,183,187,255)",
        "rgba(169,159,160,255)",
        "rgba(174,143,151,255)",
        "rgba(217,196,195,255)",
        "rgba(175,144,139,255)",
        "rgba(199,167,146,255)",
        "rgba(166,109,90,255)",
        "rgba(154,88,76,255)",
    ];
    var colorsValues2 = [
        "rgba(215,202,186,255)",
        "rgba(201,176,145,255)",
        "rgba(194,151,119,255)",
        "rgba(194,149,128,255)",
        "rgba(179,119,93,255)",
        "rgba(158,154,127,255)",
        "rgba(169,162,156,255)",
        "rgba(98,94,95,255)",
        "rgba(90,83,77,255)",
        "rgba(27,26,22,255)"
    ];
    var allColorValues = [
        colorValues,
        colorsValues2
    ];

    var colorDivs = [];
    var colorDivs2 = [];
    var allColorDivs = [
        colorDivs,
        colorDivs2
    ];

    let colorContainer = document.getElementById("color-container");
    
    const addColors = () => {
        for(let j = 0; j < allColorValues.length; j++) {
            let gridContainer = document.createElement('div');
            gridContainer.className = "grid-container";
            colorContainer.appendChild(gridContainer);
            
            for(let i = 0; i < allColorValues[j].length; i++) {
                let colorDiv = document.createElement('div');
                colorDiv.className = "background";
                colorDiv.style.boxShadow = "5px 5px 10px -8px rgba(0, 0, 0, 0.5)";
                gridContainer.appendChild(colorDiv);
    
                allColorDivs[j][i] = colorDiv;
                
                let color = allColorValues[j][i];
                colorDiv.style.backgroundColor = color;
                colorDiv.style.aspectRatio = "1";
            }
        }
    }

    addColors();

    let square = document.getElementById("view-square");
    let rounded = document.getElementById("view-rounded");
    let circle = document.getElementById("view-circle");
    let squareDot = document.getElementById("view-square-dot");
    let roundedDot = document.getElementById("view-rounded-dot");
    let circleDot = document.getElementById("view-circle-dot");
    let previousDot = circle;

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
    let dotColor = getComputedStyle(document.body).
    getPropertyValue('--view-dot-color');

    const viewSquare = () => {
        setActiveDot(squareDot);
        // setBorderRadiusForColorDivs('0px');
        animateBorderRadius('0px');
    }
    
    const viewRounded = () => {
        setActiveDot(roundedDot);
        // setBorderRadiusForColorDivs('40px');
        animateBorderRadius('40px');
    }
    
    const viewCircle = () => {
        setActiveDot(circleDot);
        let radius = (colorDivs[0].getBoundingClientRect().width / 2) + 'px'; 
        // setBorderRadiusForColorDivs(radius);
        animateBorderRadius(radius);
    }
    
    const setActiveDot = (dot) => {
        previousDot.style.backgroundColor = "";
        dot.style.backgroundColor = dotColor; 
        previousDot = dot;
    }
    
    // const setBorderRadiusForColorDivs = (radius) => {
    //     for(let i = 0; i < allColorDivs.length; i++) {
    //         allColorDivs[i].forEach(element => {
    //             element.style.borderRadius = radius;
    //         });
    //     }
    // }

    const getBorderRadius = (element) => {
        let borderRadiusString = element.style.borderRadius;
        return getBorderRadiusFromString(borderRadiusString);
    }

    const getBorderRadiusFromString = (radius) => {
        let borderRadius = radius
            .substring(0, radius.length -2);
        return Number(borderRadius);
    }

    const increaseBorderRadius = (radius) => {
        let stepSize = 1;
        
        let id = null;
        clearInterval(id);
        id = setInterval(frame, 1);
        
        function frame() {
            for(let i = 0; i < allColorDivs.length; i++) {
                allColorDivs[i].forEach(element => {

                    let radiusValue = getBorderRadiusFromString(radius);
                    let currentRadius = getBorderRadius(element);

                    if(currentRadius >= radiusValue) {
                        clearInterval(id);
                        element.style.borderRadius = radius;
                    } else {
                        let borderRadius = getBorderRadius(element);
                        borderRadius = borderRadius + stepSize;
                        borderRadius = borderRadius + 'px';
                        element.style.borderRadius = borderRadius;
                    }
                });
                
            }
        }
    }

    const decreaseBorderRadius = (radius) => {
        let stepSize = 1;
        
        let id = null;
        clearInterval(id);
        id = setInterval(frame, 1);
        
        function frame() {
            for(let i = 0; i < allColorDivs.length; i++) {
                allColorDivs[i].forEach(element => {

                    let radiusValue = getBorderRadiusFromString(radius);
                    let currentRadius = getBorderRadius(element);

                    if(currentRadius <= radiusValue) {
                        clearInterval(id);
                        element.style.borderRadius = radius;
                    } else {
                        let borderRadius = getBorderRadius(element);
                        borderRadius = borderRadius - stepSize;
                        borderRadius = borderRadius + 'px';
                        element.style.borderRadius = borderRadius;
                    }
                });

            }
        }
    }

    function animateBorderRadius(radius) {
        let currentRadius = allColorDivs[0][0].style.borderRadius;
        let previousRadius = getBorderRadiusFromString(currentRadius);
        let nextRadius = getBorderRadiusFromString(radius);
        console.log(previousRadius);
        console.log(nextRadius);

        if(previousRadius > nextRadius) {
            decreaseBorderRadius(radius);
        }
        else {
            increaseBorderRadius(radius);
        }
    }

    viewCircle();

    let tiles = document.getElementById("view-tiles");
    let gridContainers = document.getElementsByClassName("grid-container");

    tiles.addEventListener("click",
        function (e) {
            viewTiles();
            e.preventDefault();
        },
        false
    );

    let containerDivs = [];


    const tileTheColors = () => {
        // for(let i = 0; i < gridContainers.length; i++) {
        //     allColorDivs.forEach(color => {
        //         // color.style.removeProperty("position");
        //         // color.style.removeProperty("display");
        //         // color.style.removeProperty("width");
        //         // color.style.removeProperty("height");
        //         // color.style.removeProperty("left");
        //         gridContainers[i].appendChild(color);
        //     });
        // }

        // containerDivs.forEach(container => {
        //     container.remove();
        // });
    }

    const setColorDivsPos = (colorDivs, i) => {
        setColorDivSize(colorDivs, i);
        
        if(i % 3 == 1) {
            setColorDivPos(colorDivs, i, 0.5);
        }
        if(i % 3 == 2) {
            setColorDivPos(colorDivs, i, 1);
        }
    }

    const setColorDivSize = (colorDivs, i) => {
        let size = colorDivs[i].getBoundingClientRect().width;
        let sizeString = size * 0.5 + 'px';
        colorDivs[i].style.display = "inline-block";
        colorDivs[i].style.width = sizeString;
        colorDivs[i].style.height = sizeString;
    }

    const setColorDivPos = (colorDivs, i, positionFactor) => {
        let size = colorDivs[i].getBoundingClientRect().width;
        let position = size * positionFactor + 'px';
        colorDivs[i].style.position = "absolute";
        colorDivs[i].style.left = position;
    }

    const viewTiles = () => {
        for(let i = 0; i < gridContainers.length; i++) {
            gridContainers[i].style.gridTemplateColumns = "1fr 1fr 1fr";
        }

        // unselectPreviousView(stacked.children);
        selectView(tiles);
        tileTheColors();
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