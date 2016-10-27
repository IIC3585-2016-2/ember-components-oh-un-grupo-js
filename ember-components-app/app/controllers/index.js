import Ember from 'ember';

export default Ember.Controller.extend({
  appName:'Super Component',
  data: {
    foo: [
    	{a: 1}, 
    	{b: 2}, 
    	{a: 3}
    	],
    bar: "texto de ejemplo"	
	},

	flag: true,

	actions: {
		loadComponent() {
			this.set('flag', !this.get('flag'));
		}
	}

});