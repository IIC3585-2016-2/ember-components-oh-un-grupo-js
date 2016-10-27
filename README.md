# Ember Components: Components Lifecycle App

## Ciclo de Vida de los Componentes en Ember

Ember provee *hooks* que se ejecutan en distintas etapas del ciclo de vida de un componente:

| Orden | En render inicial | En re-render | En destrucción
| --- | --- | --- | ---
| 1  | init | didUpdateAttrs | willDestroyElement
| 2  | didReceiveAttrs | didReceiveAttrs | willClearRender
| 3  | willRender | willUpdate | didDestroyElement
| 4  | didInsertElement | willRender | 
| 5  | didRender | didUpdate | 
| 6  |  | didRender | 

En la aplicación encontrada en `ember-components-app/` se ilustra la manera en que se llaman estas funciones del componente.

## Componente `super-component`
Para demostrar la manera y el orden por las que estas funciones de ejecutan se utiliza sólo un scomponente `super-component`.  

### `app/templates/components/super-component.hbs`
En el template se tiene lo siguiente:
```handlebars
<p>name: {{name}}</p>
<p>attrs.data.foo.firstObject.a: {{attrs.data.foo.firstObject.a}}</p>
<p>attrs.data.bar: {{attrs.data.bar}}</p>
```
Es decir, el componente recibe un parámetro `name` directamente desde donde se le llama y un objeto que puede provenir del controller, route handler o modelo del contexto del llamador del componente.

### `app/components/super-component.js`
En la definición de la clase del componente usamos los hooks para imprimir en consola el momento en que se ejecutan, dándonos información sobre el orden en que se ejecutan.
```javascript
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['toggled-component'],

  //HOOKS
  // ..de render inicial
  init() {
  	this._super(...arguments);
    console.log('init ejecutado!');
  },
  
  // ..de render inicial & re-render
  didReceiveAttrs(options) {
    console.log('didReceiveAttrs ejecutado!', options);
  },
  
  ...
  // ..de descarga del componente
  didDestroyElement() {
    console.log('didDestroyElement ejecutado!');
  },
});  
```

### `app/controllers/index.js`
Se cuenta con un controller en donde almacenamos un nombre en un atributo `appName` (que luego se lo pasaremos como parámetro `name` al componente en el template) y un objeto en el atributo `data`, el cual el componente usará para mostrar algunos de sus valores. Adicionalmente definimos una función `loadComponent()` para remover o insertar en el DOM el componente mientras corra la aplicación. 

```javascript
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
```

### `app/templates/index.hbs`
Acá cambiamos atributos del componente para visualizar la ejecución de los *lifecycle hooks* (ver en consola).
```handlebars
<div>
  <h2>{{#link-to 'about'}}Sobre nosotros (cambiar de ruta){{/link-to}}</h2>
  <p>Triggers: <strong>willDestroyElement, willClearRender, didDestroyElement</strong></p>
</div>

<div>
  <h2>Cambio de atributos</h2>
  <p>Nombre Aplicación: {{input type="text" value=appName}}</p>
  <p>Triggers: <strong>didUpdateAttrs, didReceiveAttrs</strong>, willUpdate, willRender, didUpdate, didRender</p>
</div>

<div>
  <h2>Re-render iniciado internamente</h2>
  <p>data.foo.firstObject.a: {{input type="text" value=data.foo.firstObject.a}}</p>
  <p>Triggers: willUpdate, willRender, didUpdate, didRender</p>
</div>

<div>
  <p>data.foo.b: {{input type="text" value=data.bar}}</p>
  <p>Triggers: willUpdate, willRender, didUpdate, didRender</p>
</div>

<hr>

<button {{action 'loadComponent'}}>(Des)Cargar Componente</button>
{{#if flag}}
  {{super-component name=appName data=data}}
{{/if}}
```

Al cargar la aplicación (o refrescar la página) se ejecutan naturalmente los 5 primeros hooks.

Al cambiar de ruta el componente detecta que es hora de removerse del DOM, por lo que se ejecutan los 3 últimos hooks.

De la misma forma se ejecutan los de destrucción y los de renderización alternadamente al envolver el componente en un bloque condicional, lo que hace que se remueva o inserte en el DOM según la acción llamada en evento click del botón.

El componente se re-renderiza por acción del usuario al modificar uno de sus atributos, por lo que todos los hooks de esta etapa de ejecutan al modificar `name`. Razones por las que cada una se llama:
+ `didUpdateAttrs`: un atributo del componente cambió. Llamado antes del re-render.
+ `didRecieveAttrs`: un atributo pasado al componente se actualizó.
+ `willUpdate`: el componente está a punto de actualizarse y re-renderizarse.
+ `willRender`: el componente está a punto de (re-)renderizarse.
+ `didUpdate`: el componente se actualizó y re-renderizó.
+ `didRender`: el componente se (re-)renderizó.

Notar que `didUpdateAttrs` no se llama al re-renderizar el componente internamente vía `.rerender()`, `.set()` o modificando el objeto, lo cual sucede en este caso. Al componente se le pasa un objeto `data` que no es cambiado como atributo pasado al objeto, razón por la que tampoco `didRecieveAttrs` se llama, sino que atributos de este atributo se modifican internamente como propiedad del objeto controller.


# Referencias
+ [Guía oficial: componentes] (https://guides.emberjs.com/v2.8.0/components/defining-a-component/)
+ [Guía oficial: componentes. Sección *The Component Lifecycle*] (https://guides.emberjs.com/v2.8.0/components/the-component-lifecycle/)
+ [Diferencia detallada entre hooks del ciclo de vida de un componente junto con posibles usos de cada uno] (http://emberjs.com/api/classes/Ember.Component.html#events)
+ [Componentes contextuales] (http://emberjs.com/blog/2016/01/15/ember-2-3-released.html#toc_contextual-components)
+ [Cookbook: recetas para tareas típicas] (http://emberwatch.com/recipes/helpers_and_components)
+ [Buen tutorial ✓] (http://yoember.com/)
+ [Comparación de componentes] (http://cbateman.com/blog/web-components-in-angular-ember-and-react/)
+ [Transición a Ember 2] (http://emberjs.com/blog/2015/05/10/run-up-to-two-oh.html)
