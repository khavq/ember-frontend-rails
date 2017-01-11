import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		toggleActive(monster){
			monster.toggleProperty('active');
			monster.save();
		}
	}
});
