"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('ember-frontend/adapters/application', ['exports', 'active-model-adapter'], function (exports, _activeModelAdapter) {
  exports['default'] = _activeModelAdapter['default'].extend();
});
// app/adapters/application.js
define('ember-frontend/app', ['exports', 'ember', 'ember-frontend/resolver', 'ember-load-initializers', 'ember-frontend/config/environment'], function (exports, _ember, _emberFrontendResolver, _emberLoadInitializers, _emberFrontendConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _emberFrontendConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _emberFrontendConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberFrontendResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _emberFrontendConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('ember-frontend/controllers/application', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		actions: {
			toggleActive: function toggleActive(monster) {
				monster.toggleProperty('active');
				monster.save();
			}
		}
	});
});
define('ember-frontend/helpers/app-version', ['exports', 'ember', 'ember-frontend/config/environment'], function (exports, _ember, _emberFrontendConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _emberFrontendConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('ember-frontend/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('ember-frontend/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define("ember-frontend/initializers/active-model-adapter", ["exports", "active-model-adapter", "active-model-adapter/active-model-serializer"], function (exports, _activeModelAdapter, _activeModelAdapterActiveModelSerializer) {
  exports["default"] = {
    name: 'active-model-adapter',
    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      application.register('adapter:-active-model', _activeModelAdapter["default"]);
      application.register('serializer:-active-model', _activeModelAdapterActiveModelSerializer["default"]);
    }
  };
});
define('ember-frontend/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ember-frontend/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _emberFrontendConfigEnvironment) {
  var _config$APP = _emberFrontendConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('ember-frontend/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('ember-frontend/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('ember-frontend/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('ember-frontend/initializers/export-application-global', ['exports', 'ember', 'ember-frontend/config/environment'], function (exports, _ember, _emberFrontendConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_emberFrontendConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _emberFrontendConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_emberFrontendConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ember-frontend/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('ember-frontend/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('ember-frontend/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("ember-frontend/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('ember-frontend/models/monster', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		name: _emberData['default'].attr('string'),
		level: _emberData['default'].attr('number'),
		active: _emberData['default'].attr('boolean')
	});
});
define('ember-frontend/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('ember-frontend/router', ['exports', 'ember', 'ember-frontend/config/environment'], function (exports, _ember, _emberFrontendConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _emberFrontendConfigEnvironment['default'].locationType,
    rootURL: _emberFrontendConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('about');
  });

  exports['default'] = Router;
});
define('ember-frontend/routes/about', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('ember-frontend/routes/application', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			return this.store.findAll('monster');
		}

	});
});
define('ember-frontend/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("ember-frontend/templates/about", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ehwYmjNB", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"jumbo\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"right tomster\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"About Super Rentals\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n    The Super Rentals website is a delightful project created to explore Ember.\\n    By building a property rental site, we can simultaneously imagine traveling\\n    AND building Ember applications.\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-frontend/templates/about.hbs" } });
});
define("ember-frontend/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "rFKYZVyo", "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Hello world\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"monsters-index-list\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"mailto:superrentalsrep@emberjs.com\"],[\"flush-element\"],[\"text\",\"superrentalsrep@emberjs.com\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"li\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"monster \",[\"helper\",[\"if\"],[[\"get\",[\"monster\",\"active\"]],\"dark\"],null]]]],[\"flush-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"monster\",\"name\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"monster\",\"level\"]],false],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"toggleActive\",[\"get\",[\"monster\"]]]],[\"flush-element\"],[\"text\",\"Toggle Active\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"monster\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ember-frontend/templates/application.hbs" } });
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('ember-frontend/config/environment', ['ember'], function(Ember) {
  var prefix = 'ember-frontend';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("ember-frontend/app")["default"].create({"name":"ember-frontend","version":"0.0.0+c503e836"});
}

/* jshint ignore:end */
//# sourceMappingURL=ember-frontend.map
