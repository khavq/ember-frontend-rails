import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(InfinityRoute, {
	model() {
		// return this.store.findAll('rental');
		return this.infinityModel("rental", {perPage: 5, startingPage: 1});
	}
});
