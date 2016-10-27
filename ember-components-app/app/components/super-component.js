import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['toggled-component'],

	//HOOKS

  // ..de render inicial & re-render
  didReceiveAttrs(options) {
    console.log('didReceiveAttrs ejecutado!', options);
  },

  // ..de render inicial
  init() {
  	this._super(...arguments);
    console.log('init ejecutado!');
  },

  // ..de render inicial & re-render
  willUpdate(options) {
    console.log('willUpdate ejecutado!', options);
  },

  // ..de re-render
  didUpdateAttrs(options) {
    console.log('didUpdateAttrs ejecutado!', options);
  },

  // ..de render inicial & re-render
  willRender() {
    console.log('willRender ejecutado!');
  },

  // ..de render inicial
  didInsertElement() {
    console.log('didInsertElement ejecutado!');
  },

  // ..de re-render
  didUpdate(options) {
    console.log('didUpdate ejecutado!', options);
	},

  // ..de render inicial & re-render
  didRender() {
    console.log('didRender ejecutado!');
  },

  // ..de descarga del componente
	willDestroyElement() {
		console.log('willDestroyElement ejecutado!');
	},

  // ..de descarga del componente
	willClearRender() {
		console.log('willClearRender ejecutado!');
	},

  // ..de descarga del componente
	didDestroyElement() {
		console.log('didDestroyElement ejecutado!');
	},
});
