import Memento from "./Memento";

export default class Category {
	_id;
	_name;
	_lists;
	constructor(id, name) {
		this._id = id;
		this._name = name;
		this._lists = [];
	}

	createMemento() {
		return new Memento([...this._lists]);
	};

	restoreFromMemento(memento) {
		this._lists = memento.getState();
	};
}