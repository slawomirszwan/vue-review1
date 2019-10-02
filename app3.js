
var Display = {
    template: `
<div>
    <p>You chose XXX</p>
</div>
`
};
//=================================
var Inputfield = {
    props: ['label'],
    data: function() {
        return {
            labelTxt: 'dddd'
        }
    },
    template: `
<div>
  <label>{{ labelTxt }}</label>
</div>
`
};

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
const POMODORO_STATES = {
    WORK: 'work',
    REST: 'rest'
};

const STATES = {
    STARTED: 'started',
    STOPPED: 'stopped',
    PAUSED: 'paused'
};

const WORKING_TIME_LENGTH_IN_MINUTES = 2;
const RESTING_TIME_LENGTH_IN_MINUTES = 1;

var Pomodoro = {
    data: function() {
        return {
            state: STATES.STOPPED,
            minute: WORKING_TIME_LENGTH_IN_MINUTES,
            second: 0,
            pomodoroState: POMODORO_STATES.WORK,
            timestamp: 0
        }
    },
    computed: {
        title: function () {
            return this.pomodoroState === POMODORO_STATES.WORK ? 'Work!' :
                'Rest!'
        },
        min: function () {
            if (this.minute < 10) {
                return '0' + this.minute;
            }
            return this.minute;
        },
        sec: function () {
            if (this.second < 10) {
                return '0' + this.second;
            }
            return this.second;
        }
    },
    methods: {
        start: function() {
            this.state = STATES.STARTED;
            this._tick();
            this.interval = setInterval(this._tick, 1000);
        },
        pause: function () {
            this.state = STATES.PAUSED;
            clearInterval(this.interval);
        },
        stop: function () {
            this.state = STATES.STOPPED;
            clearInterval(this.interval);
            this.pomodoroState = POMODORO_STATES.WORK;
            this.minute = WORKING_TIME_LENGTH_IN_MINUTES;
            this.second = 0;
        },
        _tick: function() {
// Je?eli warto?? second jest wi?ksza od 0, zmniejsz j? o 1.
            if (this.second !== 0) {
                this.second--;
                return;
            }
// Je?eli second ma warto?? 0, a minute nie,
// zmniejsz minute o 1 i nadaj second warto?? 59.
            if (this.minute !== 0) {
                this.minute--;
                this.second = 59;
                return;
            }
// Je?eli second i minute s? równe 0,
// prze??cz mi?dzy czasem pracy a odpoczynkiem.
            this.pomodoroState = this.pomodoroState ===
            POMODORO_STATES.WORK ? POMODORO_STATES.REST :
                POMODORO_STATES.WORK;
            if (this.pomodoroState === POMODORO_STATES.WORK) {
                this.minute = WORKING_TIME_LENGTH_IN_MINUTES;
            } else {
                this.minute = RESTING_TIME_LENGTH_IN_MINUTES;
            }
        }
    },
    template: `
<div id="app" class="container">
    <h2>
        <span>Pomodoro</span>
        <button :disabled="state==='started'" @click="start()">
            <i class="glyphicon glyphicon-play">Start</i>
        </button>
        <button :disabled="state!=='started'" @click="pause()">
            <i class="glyphicon glyphicon-pause">Pause</i>
        </button>
        <button :disabled="state!=='started' && state !== 'paused'" @click="stop()">
            <i class="glyphicon glyphicon-stop">Stop</i>
        </button>
    </h2>
    <h3>{{ title }}</h3>
    <div class="well">
        <div class="pomodoro-timer">
            <span>{{ min }}</span>:<span>{{ sec }}</span>
        </div>
    </div>
</div>
    `
};


//wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
var data = {
    items: [
        { text: 'Bananas', checked: true },
        { text: 'Apples', checked: false }],
    title: 'My Shopping List',
    newItem: ''
};

var ItemsComponent = {
    data: function () {
        return data;
    },
    template: `
<ul>
    <li v-for="item in items" :class="{ 'removed': item.checked }">
        <div class="checkbox">
            <label>
                <input type="checkbox" v-model="item.checked"> {{ item.text }}
            </label>
        </div>
    </li>
</ul>`
};

var ChangeTitleComponent = {
    data: function () {
        return data;
    },
    template: `
<div class="footer">
    <hr/>
    <em>Change the title of your shopping list here</em>
    <input v-model="title"/>
</div>`
};

var AddItemComponent = {
    data: function () {
        return data;
    },
    methods: {
        addItem: function () {
            var text;
            text = this.newItem.trim();
            if (text) {
                this.items.push({
                    text: text,
                    checked: false
                });
                this.newItem = "";
            }
        }
    },
    template:
`<div class="input-group">
    <input v-model="newItem" @keyup.enter="addItem" placeholder="add shopping list item" type="text" class="form-control">
    <span class="input-group-btn">
        <button @click="addItem" class="btn btn-default" type="button">Add!</button>
    </span>
</div>`
}

var Listazakupow = {
    data: function() {
        return data;
    },
    components: {
        ItemsComponent,
        AddItemComponent,
        ChangeTitleComponent
    },
    template: `
<div class="container">
    <h2>{{ title }}</h2>
    <add-item-component></add-item-component>
    <items-component></items-component>
    <change-title-component></change-title-component>
</div>
`
}
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Vue.directive('square', function (el, binding) {
    el.innerHTML = Math.pow(binding.value, 2);
});

var square = function (el, binding) {
    el.innerHTML = Math.pow(binding.value, 2);
};

var TestDireciteSquare = {
    template:`
<div class="container"">
  <input v-model="item" type="text">
  <div v-square="item"></div>
</div>
    `,
    data: function() {
        return {item: 42};
    },
    directives: {
        square
    }
}


var Skills ={
    template: `
<div class="skills">
    <p>Skills</p>
    <p>{{name}}</p>

    <button @click="changeName" :disabled="btnState">{{ btnName}}</button>

  <form @submit.prevent="addSkill">
    <input type="text" placeholder="Enter a skill you have.." v-model="skill"  name="skill">
    <button type="submit">dodaj Skill</button>
<!--v-validate="'min:5'"-->
    <!--<transition name="alert-in" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">-->
      <!--<p class="alert" v-if="errors.has('skill')">{{ errors.first('skill') }}</p>-->
    <!--</transition>-->
  </form>


     <ul>
        <!--<transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">-->
          <li v-for="(data, index) in skills" :key='index'>
            {{ index }}: {{ data.skill }}
            <!--<i class="fa fa-minus-circle" v-on:click="removeSkill(index)">[delete Skill]</i>-->
            <button type="button" v-on:click="removeSkill(index)">delete Skill</button>
          </li>
        <!--</transition-group>-->
      </ul>

      <p>These are the skills that you possess.</p>

</div>
`,
    name: "Skills",
    data() {
        return {
            name:"curso",
            btnName: "Hello",
            btnState: false,
            skill: '',
            skills: [
                { "skill": "Vue.js"},
                { "skill": "Frontend Developer"}
            ]
        }
    },
    methods: {
        changeName(e) {
            console.log(e);
            this.btnName = "GoodBye";
            this.btnState = true;
        },
        addSkill() {
            //this.$validator.validateAll().then((result) => {
            //    if (result) {
                    this.skills.push({skill: this.skill})
                    this.skill = '';
            //    } else {
            //        console.log('Not valid');
        //}
        //})
        },
        removeSkill(id) {
            this.skills.splice(id,1);
        }
    },

}


var app3 = new Vue({
    el: '#app3',
    data: function(){
        return {
            title: 'Lista zakupów',
            items: [
                {text: 'Learn JavaScript',checked:true},
                {text: 'Learn Vue',checked:false},
                {text: 'Build something awesome',checked:true}
            ],
            newItem: '',
            labelName: 'labelName1'
        }
    },
    components: {
        Display,
        Inputfield,
        Pomodoro,
        Listazakupow,
        TestDireciteSquare,
        Skills
    }
    //computed: function() {
    // | orderBy checked reverse)
    // }

})




