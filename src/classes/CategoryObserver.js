class CategoryObserver {
	_observers = [];
	constructor() {
		if (CategoryObserver.instance) {
			return CategoryObserver.instance;
		}
		CategoryObserver.instance = this;
	}

	subscribe(observer) {
		this._observers.push(observer);
	}

	notify(category) {
		this._observers.forEach(observer => observer.update(category));
	}

	unsubscribe(observer) {
		this._observers = this._observers.filter(subscriber => subscriber !== observer);
	}
}

const categoryObserver = new CategoryObserver();

export default categoryObserver;