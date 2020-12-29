export default {
  getRandomColor: () =>
    "#" +
    ("0000000" + Math.floor(Math.random() * 16777215).toString(16)).substr(-6),
};
