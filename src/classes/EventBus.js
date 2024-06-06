class EventBus {
	#listeners;
	constructor() {
		this.#listeners = {};
	}

	subscribe(eventName, listener) {
		if (!this.#listeners[eventName]) {
			this.#listeners[eventName] = [];
		}
		this.#listeners[eventName].push(listener);
	}

	unsubscribe(eventName, listener) {
		if (this.#listeners[eventName]) {
			this.#listeners[eventName] = this.#listeners[eventName].filter(fn => fn !== listener);
		}
	}

	emit(eventName, data) {
		if (this.#listeners[eventName]) {
			this.#listeners[eventName].forEach(listener => {
				listener(data);
			});
		}
	}
}

const eventBus = new EventBus();
export default eventBus;