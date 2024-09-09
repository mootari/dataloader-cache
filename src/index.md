# Dataloader Cache

Latest entries:

```js echo
const data = await FileAttachment("data/history.json").json();
display(data);

display(Inputs.table(data, {layout: "auto"}));

display(Plot.plot({
  x: {type: "utc"},
  marginLeft: 100,
  inset: 10,
  grid: true,
  marks: [
    Plot.frame(),
    Plot.line(data, {y: "edits", x: "time", marker: "dot"}),
  ]
}))
```
