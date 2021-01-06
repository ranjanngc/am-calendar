# am-calendar
A very simple calendar web component

## Uses
```html
<am-calendar theme="dark"></am-calendar>
```

![alt text](https://github.com/ranjanngc/am-calendar/blob/main/static/cal-dark.PNG?raw=true)

```html
<am-calendar></am-calendar>
```

![alt text](https://github.com/ranjanngc/am-calendar/blob/main/static/cal-soft.PNG?raw=true)

## Event
`am-change` : The event is dispatched with selected data when clicked on a date cell.

### HTML
```html
<script type="module" language="text/javascript" src="public/am.calendar.js"></script>  

<am-calendar id="calc"></am-calendar>
```
### JS
```js
function handle(ev){
	var dtStr = "year:" + ev.detail.data.year + " month:" + ev.detail.data.month + " day:" + ev.detail.data.day;
  console.log(dtStr);
}

var cal = document.getElementById("calc");
cal.addEventListener("am-change",handle);
```

## Contribution

Start with installing dependencies
```
npm i
```

Try the demo app by running dev server
```
npm run start
```
Contribute, test and build
```
npm run build
```
