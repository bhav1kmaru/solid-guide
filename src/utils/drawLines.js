export const drawLineBetweenPoints = (x1, y1, x2, y2) => {
    console.log(x1,y1,x2.y2)
    const line = document.createElement("div");
    line.className = "line";
  

    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  

    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
  

    line.style.width = `${distance}px`;
  

    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.height = "2px";
    line.style.position = "absolute";
    line.style.background = "blue";
    line.style.transformOrigin = "0 0";
  

    line.style.transform = `rotate(${angle}deg)`;

    document.body.appendChild(line);
  };
  