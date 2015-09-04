//se crea un componente de React
App = React.createClass({

  // Este mixin hace que el metodo getMeteorData funcione
  mixins: [ReactMeteorData],

  // Carga los items de la collection y los pone en this.data.tasks
  getMeteorData() {

    return {
      //organiza los elementos desde el mas nuevo el -1 lo indica
      tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
    }

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


 
  //metodo que renderiza
  render() {

    return (

      <div className="container">

        <header>

          <h1>Todo List</h1>
          
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