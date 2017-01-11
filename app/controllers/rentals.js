import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		toggleActive(monster){
			monster.toggleProperty('active');
			monster.save();
		},
		filterByCity(param) {
			if (param !== '') {
				return this.get('store').query('rental', {city: param});
			} else {
				return this.get('store').findAll('rental');
			}
		}
	}
});
