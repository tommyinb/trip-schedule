export function setTitle(name: string) {
  const text = "Trip Schedule".includes(name)
    ? "Trip Schedule"
    : `${name} - Trip Schedule`;

  document.title = text;

  const title = document.querySelector("title");
  if (title) {
    title.innerText = text;
  }
}
