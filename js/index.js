'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ---------- Import Bootstrap Components ----------
var Button = ReactBootstrap.Button;
var ButtonGroup = ReactBootstrap.ButtonGroup;
var ControlLabel = ReactBootstrap.ControlLabel;
var FormControl = ReactBootstrap.FormControl;
var FormGroup = ReactBootstrap.FormGroup;
var InputGroup = ReactBootstrap.InputGroup;
var Jumbotron = ReactBootstrap.Jumbotron;
var PageHeader = ReactBootstrap.PageHeader;
var Modal = ReactBootstrap.Modal;
var Panel = ReactBootstrap.Panel;
var PanelGroup = ReactBootstrap.PanelGroup;
var Table = ReactBootstrap.Table;
var update = React.addons.update;

// ---------- Constant variables ----------
var STATUS = {
	close: 'close',
	addRecipe: 'Add recipe',
	editRecipe: 'Edit recipe'
};

// Get recipes from my browser's local storage:
var recipes = typeof localStorage["_username_recipes"] !== 'undefined' ? JSON.parse(localStorage.getItem("_username_recipes")) : [{ 'id': 1, 'name': 'Test', 'ingredients': [{ 'id': 1, 'name': 'test1' }, { 'id': 2, 'name': 'test2' }] }, { 'id': 2, 'name': 'Test1', 'ingredients': [{ 'id': 1, 'name': 'test1' }, { 'id': 2, 'name': 'test2' }] }];

var RecipeRow = function (_React$Component) {
	_inherits(RecipeRow, _React$Component);

	function RecipeRow() {
		_classCallCheck(this, RecipeRow);

		return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	}

	RecipeRow.prototype.render = function render() {
		return React.createElement(
			'tr',
			null,
			React.createElement(
				'td',
				null,
				this.props.ingredient.id
			),
			React.createElement(
				'td',
				null,
				this.props.ingredient.name
			)
		);
	};

	return RecipeRow;
}(React.Component);

var ActionButtons = function (_React$Component2) {
	_inherits(ActionButtons, _React$Component2);

	function ActionButtons(props) {
		_classCallCheck(this, ActionButtons);

		var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

		_this2.deleteRecipe = _this2.deleteRecipe.bind(_this2);
		_this2.editRecipe = _this2.editRecipe.bind(_this2);
		return _this2;
	}

	ActionButtons.prototype.deleteRecipe = function deleteRecipe(e) {
		e.stopPropagation();
		this.props.deleteRecipe(this.props.recipeId);
	};

	ActionButtons.prototype.editRecipe = function editRecipe(e) {
		e.stopPropagation();
		this.props.editRecipe(this.props.recipeId);
	};

	ActionButtons.prototype.render = function render() {
		return React.createElement(
			ButtonGroup,
			null,
			React.createElement(
				Button,
				{ bsStyle: 'warning', bsSize: 'small', onClick: this.editRecipe },
				React.createElement('i', { className: 'fa fa-pencil', 'aria-hidden': 'true' }),
				React.createElement(
					'span',
					null,
					' Edit'
				)
			),
			React.createElement(
				Button,
				{ bsStyle: 'danger', bsSize: 'small', onClick: this.deleteRecipe },
				React.createElement('i', { className: 'fa fa-times', 'aria-hidden': 'true' }),
				React.createElement(
					'span',
					null,
					' Delete'
				)
			)
		);
	};

	return ActionButtons;
}(React.Component);

var RecipeTable = function (_React$Component3) {
	_inherits(RecipeTable, _React$Component3);

	function RecipeTable(props) {
		_classCallCheck(this, RecipeTable);

		return _possibleConstructorReturn(this, _React$Component3.call(this, props));
	}

	RecipeTable.prototype.render = function render() {
		var panelHeader = React.createElement(
			'div',
			{ className: 'row' },
			React.createElement(
				'div',
				{ className: 'col-xs-9' },
				this.props.recipe.name
			),
			React.createElement(
				'div',
				{ className: 'col-xs-3' },
				React.createElement(ActionButtons, {
					recipeId: this.props.recipe.id,
					deleteRecipe: this.props.deleteRecipe,
					editRecipe: this.props.editRecipe
				})
			)
		);
		var recipeRows = [];
		this.props.recipe.ingredients.forEach(function (ingredient) {
			recipeRows.push(React.createElement(RecipeRow, { ingredient: ingredient, key: ingredient.id }));
		});
		return React.createElement(
			Panel,
			{ bsStyle: 'success', header: panelHeader, collapsible: true },
			React.createElement(
				Table,
				null,
				React.createElement(
					'thead',
					null,
					React.createElement(
						'tr',
						null,
						React.createElement(
							'th',
							null,
							'#'
						),
						React.createElement(
							'th',
							null,
							'Ingredients'
						)
					)
				),
				React.createElement(
					'tbody',
					null,
					recipeRows
				)
			)
		);
	};

	return RecipeTable;
}(React.Component);

var RecipeModal = function (_React$Component4) {
	_inherits(RecipeModal, _React$Component4);

	function RecipeModal(props) {
		_classCallCheck(this, RecipeModal);

		var _this4 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

		_this4.state = {
			recipeName: '',
			recipeIngredients: ''
		};
		_this4.closeModal = _this4.closeModal.bind(_this4);
		_this4.handleSubmit = _this4.handleSubmit.bind(_this4);
		_this4.handleRecipeNameChange = _this4.handleRecipeNameChange.bind(_this4);
		_this4.handleRecipeIngredientsChange = _this4.handleRecipeIngredientsChange.bind(_this4);
		_this4.setInitialState = _this4.setInitialState.bind(_this4);
		return _this4;
	}

	RecipeModal.prototype.closeModal = function closeModal() {
		this.props.closeModal();
	};

	RecipeModal.prototype.getRecipeById = function getRecipeById(id) {
		return this.props.recipes.filter(function (obj) {
			return obj.id === id;
		})[0];
	};

	RecipeModal.prototype.getRecipeIngredients = function getRecipeIngredients(recipe) {
		return recipe.ingredients.map(function (a) {
			return a.name;
		}).join(',');
	};

	RecipeModal.prototype.setInitialState = function setInitialState() {
		var id = this.props.modalRecipeId;
		if (id !== -1) {
			var recipe = this.getRecipeById(id);
			var recipeName = recipe.name;
			var recipeIngredients = this.getRecipeIngredients(recipe);
		} else {
			var recipeName = '';
			var recipeIngredients = '';
		}

		this.setState({
			recipeName: recipeName,
			recipeIngredients: recipeIngredients
		});
	};

	RecipeModal.prototype.handleSubmit = function handleSubmit() {
		if (this.state.recipeName === '' || this.state.recipeIngredients === '') {
			return;
		}

		if (this.props.modalStatus === STATUS.addRecipe) {
			this.props.handleRecipeAdded(this.state.recipeName, this.state.recipeIngredients);
		} else {
			this.props.handleRecipeEdited(this.props.modalRecipeId, this.state.recipeName, this.state.recipeIngredients);
		}
	};

	RecipeModal.prototype.handleRecipeNameChange = function handleRecipeNameChange(event) {
		this.setState({ recipeName: event.target.value });
	};

	RecipeModal.prototype.handleRecipeIngredientsChange = function handleRecipeIngredientsChange(event) {
		this.setState({ recipeIngredients: event.target.value });
	};

	RecipeModal.prototype.render = function render() {
		return React.createElement(
			Modal,
			{ onEnter: this.setInitialState, onHide: this.closeModal, show: this.props.modalStatus !== STATUS.close },
			React.createElement(
				Modal.Header,
				{ closeButton: true },
				React.createElement(
					Modal.Title,
					null,
					this.props.modalStatus
				)
			),
			React.createElement(
				Modal.Body,
				null,
				React.createElement(
					FormGroup,
					null,
					React.createElement(
						ControlLabel,
						null,
						'Recipe Name: '
					),
					React.createElement(FormControl, { value: this.state.recipeName, onChange: this.handleRecipeNameChange })
				),
				React.createElement(
					FormGroup,
					null,
					React.createElement(
						ControlLabel,
						null,
						'Ingredients: '
					),
					React.createElement(FormControl, { componentClass: 'textarea', className: 'ingredients-input', placeholder: 'Enter ingredinets separated by comma', value: this.state.recipeIngredients, onChange: this.handleRecipeIngredientsChange })
				)
			),
			React.createElement(
				Modal.Footer,
				null,
				React.createElement(
					Button,
					{ bsStyle: 'danger', onClick: this.closeModal },
					'Cancel'
				),
				React.createElement(
					Button,
					{ bsStyle: 'success', onClick: this.handleSubmit },
					'Submit'
				)
			)
		);
	};

	return RecipeModal;
}(React.Component);

var RecipeBox = function (_React$Component5) {
	_inherits(RecipeBox, _React$Component5);

	function RecipeBox(props) {
		_classCallCheck(this, RecipeBox);

		var _this5 = _possibleConstructorReturn(this, _React$Component5.call(this, props));

		_this5.state = {
			modalStatus: STATUS.close,
			modalRecipeId: -1,
			recipes: _this5.props.recipes
		};
		_this5.closeModal = _this5.closeModal.bind(_this5);
		_this5.openModalInAddMode = _this5.openModalInAddMode.bind(_this5);
		_this5.openModalInEditMode = _this5.openModalInEditMode.bind(_this5);
		_this5.handleRecipeAdded = _this5.handleRecipeAdded.bind(_this5);
		_this5.handleRecipeDeleted = _this5.handleRecipeDeleted.bind(_this5);
		_this5.handleRecipeEdited = _this5.handleRecipeEdited.bind(_this5);
		return _this5;
	}

	/* Helper functions */

	RecipeBox.prototype.getLastRecipeId = function getLastRecipeId() {
		var recipes = this.state.recipes;
		if (recipes[recipes.length - 1]) {
			return recipes[recipes.length - 1].id;
		} else {
			return -1;
		}
	};

	RecipeBox.prototype.getRecipeIndex = function getRecipeIndex(id) {
		return this.state.recipes.findIndex(function (recipe) {
			return recipe.id === id;
		});
	};

	RecipeBox.prototype.getRecipeById = function getRecipeById(id) {
		return this.state.recipes.filter(function (obj) {
			return obj.id === id;
		})[0];
	};

	/* Open or close the modal */

	RecipeBox.prototype.closeModal = function closeModal() {
		this.setState({
			modalStatus: STATUS.close
		});
	};

	RecipeBox.prototype.openModalInAddMode = function openModalInAddMode() {
		this.setState({
			modalStatus: STATUS.addRecipe,
			modalRecipeId: -1
		});
	};

	RecipeBox.prototype.openModalInEditMode = function openModalInEditMode(id) {
		this.setState({
			modalStatus: STATUS.editRecipe,
			modalRecipeId: id
		});
	};

	RecipeBox.prototype.handleRecipeAdded = function handleRecipeAdded(recipeName, recipeIngredients) {
		var id = this.getLastRecipeId() + 1;
		var newRecipe = {
			'id': id,
			'name': recipeName,
			'ingredients': []
		};
		var ingredientsArr = recipeIngredients.split(',');
		for (var i = 0; i < ingredientsArr.length; i++) {
			newRecipe.ingredients.push({ 'id': i + 1, 'name': ingredientsArr[i].toString() });
		}
		this.setState(function (prevState, props) {
			return {
				modalStatus: 'close',
				recipes: prevState.recipes.concat(newRecipe)
			};
		});
		localStorage.setItem('_username_recipes', JSON.stringify(this.state.recipes));
	};

	RecipeBox.prototype.handleRecipeDeleted = function handleRecipeDeleted(recipeId) {
		var recipes = this.state.recipes;
		this.setState(function (prevState, props) {
			return {
				recipes: prevState.recipes.filter(function (recipe) {
					return recipe.id !== recipeId;
				})
			};
		});

		localStorage.setItem('_username_recipes', JSON.stringify(recipes.filter(function (recipe) {
			return recipe.id !== recipeId;
		})));
	};

	RecipeBox.prototype.handleRecipeEdited = function handleRecipeEdited(recipeId, recipeName, recipeIngredients) {
		var recipesList = this.state.recipes;
		var recipe = this.getRecipeById(recipeId);
		var index = this.getRecipeIndex(recipeId);
		var ingredientsArr = recipeIngredients.split(',');

		recipe.name = recipeName;
		recipe.ingredients = [];
		for (var i = 0; i < ingredientsArr.length; i++) {
			recipe.ingredients.push({ 'id': i + 1, 'name': ingredientsArr[i].toString() });
		}

		var updatedRecipesList = update(recipesList[index], {
			$set: recipe
		});
		updatedRecipesList = update(recipesList, {
			$splice: [[index, 1, updatedRecipesList]]
		});

		this.setState({
			modalStatus: STATUS.close,
			recipes: updatedRecipesList
		});
		localStorage.setItem('_username_recipes', JSON.stringify(this.state.recipes));
	};

	RecipeBox.prototype.render = function render() {
		var recipeTables = [];
		var handleRecipeDeleted = this.handleRecipeDeleted;
		var openModalInEditMode = this.openModalInEditMode;

		this.state.recipes.forEach(function (recipe) {
			recipeTables.push(React.createElement(RecipeTable, {
				recipe: recipe,
				deleteRecipe: handleRecipeDeleted,
				editRecipe: openModalInEditMode,
				key: recipe.id
			}));
		});
		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					PageHeader,
					{ className: 'title' },
					'Recipe Box'
				),
				React.createElement(
					Jumbotron,
					{ className: 'recipeBox' },
					React.createElement(
						Button,
						{ className: 'addRecipeBtn', bsStyle: 'primary', onClick: this.openModalInAddMode },
						React.createElement('i', { className: 'fa fa-plus', 'aria-hidden': 'true' }),
						React.createElement(
							'span',
							null,
							' Add recipe'
						)
					),
					recipeTables
				)
			),
			React.createElement(RecipeModal, {
				recipes: this.state.recipes,
				modalStatus: this.state.modalStatus,
				modalRecipeId: this.state.modalRecipeId,
				handleRecipeAdded: this.handleRecipeAdded,
				handleRecipeEdited: this.handleRecipeEdited,
				closeModal: this.closeModal
			})
		);
	};

	return RecipeBox;
}(React.Component);

ReactDOM.render(React.createElement(RecipeBox, { recipes: recipes }), document.getElementById('root'));