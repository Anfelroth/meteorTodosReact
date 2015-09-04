//se crea un componente de React
App = React.createClass({

  // Este mixin hace que el metodo getMeteorData funcione
  mixins: [ReactMeteorData],

    //Obtiene el estado inicial del componente que es false
    getInitialState() {
    return {
      hideCompleted: false
    }
  },

  // Carga los items de la collection y los pone en this.data.tasks
  getMeteorData() {
    //let para variables locales que se deben inicializar. en query se guarda el resultado de la consulta
    let query = {};

     // si hidecompleted es cliqueado, se activa el query
    if (this.state.hideCompleted) {
      //consulta que trae los task con checked:false o sea lo que no estan completados
      //$ne en mongodb trae lo que son != diferentes al campo especificado
      query = {checked: {$ne: true}};
    }

    return {
      //organiza los elementos desde el mas nuevo el -1 lo indica
      tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
      //variable que cuenta las incompletas. yo le pase el query para ahorrar codigo
      //en el tuto esta escrito completo
      incompleteCount: Tasks.find(query).count()

    };

  },


  renderTasks() {

    // Obtiene los tasks de this.data.tasks

    return this.data.tasks.map((task) => {
      // Renderiza cada task por su id
      return <Task key={task._id} task={task} />;

    });

  },

  //metodo manejador
    handleSubmit(event) {
    event.preventDefault();
    // Encuentra el campo que tiene el texto con refs lo guarda en text
    var text = React.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({

      text: text,

      createdAt: new Date() // tiempo actual

    });

     // limpia forma
    React.findDOMNode(this.refs.textInput).value = "";

  },

  //metodo que cambia el estado de hideCompleted
  toggleHideCompleted() {
    this.setState({
      //niega el estado con ! es decir lo cambia de false a true
      hideCompleted: ! this.state.hideCompleted
    });

  },

 
  //metodo que renderiza
  render() {

    return (

      <div className="container">

        <header>

          <h1>Todo List ({this.data.incompleteCount})</h1>

         <label className="hide-completed">
            <input
              type="checkbox"
              readOnly={true}
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted} />
                Hide Completed Tasks
          </label>
          
         <form className="new-task" onSubmit={this.handleSubmit} >
            <input
              type="text"
              ref="textInput"   /* ref es la variable que se usa para insertar los datos  */
              placeholder="Type to add new tasks" />

          </form>

        </header>

          <ul>

          {this.renderTasks()}

        </ul>

      </div>

    );

  }

});