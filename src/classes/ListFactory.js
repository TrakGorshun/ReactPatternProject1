
class List {
	constructor(title, description) {
		this.title = title;
		this.description = description;
	}
}

class TaskList extends List {
	constructor(title, description, plan) {
		super(title, description);
		this.plan = plan;
		this.rows = [];
	}
}

class ShoppingList extends List {
	constructor(title, description, shopping) {
		super(title, description);
		this.priority = shopping;
		this.rows = [];
	}
}

class ListFactory {
	createTaskList(title, description, plan) {
		return new TaskList(title, description, plan);
	}

	createShoppingList(title, description, shopping) {
		return new ShoppingList(title, description, shopping);
	}
}

export default new ListFactory();
export { List, TaskList, ShoppingList };
