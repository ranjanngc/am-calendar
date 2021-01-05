import {LitElement, html, css} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

class AmCalendar extends LitElement{
    static get styles() {
        return css`
        
        .dark{--bg:#000000;--day-bg:#323232;--date-col:#FFAC41;--day-start-col:#FF1E56;}
        .light{--bg:#F4F4F2;--day-bg:#E8E8E8;--date-col:#495464;--day-start-col:#495464;}

        .calendar-wrapper {
            max-width: 360px;
            font: 100% system-ui;
            background:var(--bg);
            color:var(--date-col);
            min-height:248px;
            }
        .calendar {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            }
        .first-day {
            grid-column-start: 3;
            color: var(--day-start-col);
            }
        .day-name{background: var(--day-bg);}
        h1 {
            text-align: center;
            color:var(--date-col);
            }
        ol {
            list-style: none;
            margin: 0;
            padding: 0;
            text-align: center;
            }
        li {padding: 6px;}
        li.d:hover{background:var(--day-start-col);color:var(--bg);cursor:pointer;}
        button{background: var(--date-col);border-radius: 8px; border:none;}
        .grid-header{padding:10px;display: grid;
            grid-template-columns: auto auto;}
        .m, .y {cursor:pointer;}
        .grid-action button{float:right;}
        .grid-months{
            display: grid;
            grid-template-columns: auto auto auto auto;
            
        }
        .grid-months>div{padding: 10px;text-align: center;}
        .grid-months>div:hover{background:var(--day-start-col);color:var(--bg);cursor:pointer;}
        .hide{display:none}
        .fixed{overflow: auto; height:200px;}
        `;
      }
    render(){
        return html `<div class="calendar-wrapper ${this.theme}">
        <div class="grid-header">
            <div>
                <span @click="${this._showMonths}" class="m">${this._months[this._currMonth - 1]}</span> <span @click="${this._showYears}" class="y">${this._currYear}</span>
            </div>
            <div class="grid-action">
                <button @click="${this._nextMonth}"> &gt; </button>
                <button @click="${this._prevMonth}"> &lt; </button> 
            </div>
        </div>
        <ol class="calendar" style="display:${this._isShowMonth || this._isShowYear ? 'none' : ''}">
            ${this._days.map(i => html`<li class="day-name">${i}</li>`)}    
            ${this._GetDayStart(this._currYear, this._currMonth).map(d => html`<li class="d" @click="${()=>this._dateSelected(d)}">${d}</li>`)}
        </ol>
        <div class="grid-months" style="display:${this._isShowMonth ? '' : 'none'}">
            ${this._months.map(m => html`<div @click="${() => this._setMonth(m)}">${m}</div>`)}
        </div>
        <div class="grid-months fixed" style="display:${this._isShowYear ? '' : 'none'}">
            ${[...Array(201).keys()].map(m => html`<div id="${ifDefined(m+this._startYear == this._currYear-15 ? this._currYear : undefined)}" @click="${() => this._setYear(m+this._startYear)}">${m+(this._startYear)}</div>`)}
        </div>
      </div>`;
    }
    _daysInMonth(month, year)
    {
        let d = new Date(year, month, 0);
        return d.getDate();
    }
    _GetDayStart(year, month){
        var startDate   = new Date(year, month-1, 1);
        var tDays       = this._daysInMonth(month, year);
        var dayofweek   = startDate.getDay()-2;

        var days = [];
        for(var i = 0; i <= dayofweek; i++){
            days.push('');
        }
        for(var i = 0; i < tDays; i++){
            days.push(i+1);
        }

        return days;
    }
    _nextMonth(){
        if(this._currMonth == 12){
            this._currMonth = 1;
            this._currYear++;
        }else{
            this._currMonth++;
        }
        this.requestUpdate();
    }
    _prevMonth(){
        if(this._currMonth == 1){
            this._currMonth = 12;
            this._currYear--;
        }else{
            this._currMonth--;
        }
        this.requestUpdate();
    }
    _showMonths(){
        this._isShowYear    = false;
        this._isShowMonth   = !this._isShowMonth;

        this.requestUpdate();
    }
    _showYears(){
        this._isShowMonth   = false;
        this._isShowYear    = !this._isShowYear;
        var self            = this;
        
        this.requestUpdate();
       

        window.setTimeout(function() {
            var currYear = self.shadowRoot.getElementById(self._currYear);
            currYear.scrollIntoView();
        },100);
       
    }
    _setYear(year){
        this._currYear      = year;
        this._isShowYear    = false;
        this.requestUpdate();
    }
    _setMonth(month){
        this._currMonth     = this._months.indexOf(month) + 1;
        this._isShowMonth   = false;

        this.requestUpdate();
    }
    _dateSelected(dt){
        var r = {year: this._currYear, month: this._currMonth, day: dt};

        this._changeEvent.detail.data = r;
        this.dispatchEvent(this._changeEvent);
    }
    static get properties() { 
        return { 
          theme: {type: String},
        };
      }
    constructor() {
        super();
        this.theme          = "light"; 
        this._months        = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this._days          = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        this._startYear     = 1900;
        var dt              = new Date();
        this._currYear      = dt.getFullYear();
        this._currMonth     = dt.getMonth() + 1;
        this._currDate      = 30;
        this._currDay       = "Wed";
        this._isShowMonth   = false;
        this._isShowYear    = false;
        this._changeEvent    = new CustomEvent("am-change", {
            bubbles: true,
            composed: true,
            detail: { data: null }
          });
    }
}

customElements.define('am-calendar', AmCalendar);