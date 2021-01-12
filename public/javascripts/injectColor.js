function injectSVG(event) {
  const image = event.target;
  const color = image.getAttribute("color");

  fetch(image.src)
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      const parser = new DOMParser();
      const svg = parser
        .parseFromString(data, "image/svg+xml")
        .querySelector("svg");
      if (image.id) svg.id = image.id;
      if (image.className) svg.classList = image.classList;
      svg.style.fill = color;
      image.parentNode.replaceChild(svg, image);
    })
    .catch((error) => {
      console.error(error);
    });
}
