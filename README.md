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

## Work
Install dependencies
```
npm i
```

Run Demo application
```
npm run start
```

Build
```
npm run docs:build
```
